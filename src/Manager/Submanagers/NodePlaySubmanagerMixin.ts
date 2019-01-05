import { INodeCollectionSubmanager } from './INodeCollectionSubmanager';
import { IConstructor } from '../../interfaces/IConstructor';
import { IManagerNode } from '../../Node/IManagerNode';
import { shallowFlattenArray } from '../../functions/shallowFlattenArray';
import { nameOrAllKeys } from '../../functions/nameOrAllKeys';
import { doToOneOrMany } from '../../functions/doToOneOrMany';
import { INodePlaySubmanager } from './INodePlaySubmanager';
import { IPlaylistsMap } from '../IPlaylistsMap';
import { getFrozenObject } from '../../functions/getFrozenObject';
import { getPlaylistMessage } from '../getPlaylistMessage';
import { shouldLoopPlaylist } from '../shouldLoopPlaylist';
import { IPlaylist } from '../../Playlist/IPlaylist';
import { getOneOrMany } from '../../functions/getOneOrMany';
import { assert } from '../../assertions/assert';
import { ISoundGroupIdentifier } from '../../interfaces/ISoundGroupIdentifier';
import { IPlaylistOptions } from '../../Playlist/IPlaylistOptions';
import { createPlaylist } from '../../Playlist/createPlaylist';

export function NodePlaySubmanagerMixin<T extends IConstructor<IManagerNode & INodeCollectionSubmanager>>(Base: T) {
  return class NodePlaySubmanagerMixin extends Base implements INodePlaySubmanager {
    public __playlists: IPlaylistsMap = getFrozenObject();
    get playlists() {
      return this.__playlists;
    }
    
    public playGroups(name: string): Promise<Event[]>;
    public playGroups(name: string[]): Promise<Event[]>;
    public playGroups(names: string | string[]): Promise<Event[]> {
      let arr: string[];
      if (typeof names === 'string') {
        arr = [ names, ];
      } else {
        arr = names;
      }

      return new Promise((resolve) => (
        Promise.all(arr.map((name) => this.getGroups(name).playAllSounds()))
          .then((val) => resolve(shallowFlattenArray(val)))
      ));
    }

    public playSounds(name: string, groupName?: string): Promise<Event>;
    public playSounds(names: string[], groupName?: string): Promise<Event[]>;
    public playSounds(names: string | string[], groupName: string = 'default'): Promise<Event> | Promise<Event[]> {
      return this.getGroups(groupName).playSounds(names as string);
    }

    public playAllSounds(groupName?: string): Promise<Event[]> {
      if (groupName) {
        return this.getGroups(groupName).playAllSounds();
      } else {
        return new Promise((resolve) => {
          Promise.all(
            this.getGroups(Object.keys(this.groups)).map((group) => (
              group.playAllSounds()
            ))
          ).then((value) => resolve(shallowFlattenArray(value)));
        });
      }
    }

    public pauseSounds(name: string, groupName?: string): this;
    public pauseSounds(names: string[], groupName?: string): this;
    public pauseSounds(names: string | string[], groupName: string = 'default'): this {
      this.getGroups(groupName).pauseSounds(names as string);
      return this;
    }

    public pauseAllSounds(groupName?: string) {
      const oneOrMany = nameOrAllKeys(groupName, this.groups);
      doToOneOrMany(this.groups, oneOrMany, 'pauseAllSounds');

      return this;
    }

    public stopSounds(name: string, groupName?: string): this;
    public stopSounds(names: string[]): this;
    public stopSounds(names: string | string[], groupName: string = 'default'): this {
      this.getGroups(groupName).stopSounds(names as string);
      return this;
    }

    public stopAllSounds(groupName?: string) {
      const oneOrMany = nameOrAllKeys(groupName, this.groups);
      doToOneOrMany(this.groups, oneOrMany, 'stopAllSounds');

      return this;
    }

    public addPlaylist(name: string, options: Array<ISoundGroupIdentifier | string>): IPlaylist;
    public addPlaylist(name: string, options: IPlaylistOptions): IPlaylist
    public addPlaylist(name: string, options: Array<ISoundGroupIdentifier | string> | IPlaylistOptions) {
      const playlist = Array.isArray(options) ?
        createPlaylist({ ids: getFrozenObject(options), }) :
        createPlaylist(getFrozenObject(options));
  
      this.addPlaylists({ [name]: playlist });
  
      return playlist;
    }

    public addPlaylists(playlists: IPlaylistsMap) {
      const playls = playlists || {};
      const names = Object.keys(playls);
      names.forEach((playlistName) => assert(!(playlistName in this.playlists)));
      this.__playlists = getFrozenObject(this.playlists, playls);
  
      return this;
    }

    public getPlaylists(name: string): IPlaylist;
    public getPlaylists(names: string[]): IPlaylist[];
    public getPlaylists(names: string | string[]): IPlaylist | IPlaylist[] {
      return getOneOrMany(names as string[], this.playlists);
    }

    public removePlaylists(name: string): this;
    public removePlaylists(names: string[]): this;
    public removePlaylists(names: string | string[]): this {
      const playls = { ...this.playlists, };
      if (typeof names === 'string') {
        delete playls[names];
      } else {
        names.forEach((name) => delete playls[name]);
      }

      this.__playlists = getFrozenObject(playls);

      return this;
    }

    public removeAllPlaylists() {
      return this.removePlaylists(Object.keys(this.playlists));
    }

    public async playPlaylist(name: string) {
      const playlist = this.getPlaylists(name);
      console.log(`Playing playlist ${name}.`);
      const events: Event[] = [];
      let playIndex = 0;
      let loopedTimes = 0;
      let sentinel = true;
      while (sentinel) {
        const id = playlist.ids[playIndex];
        console.log(`${id.groupName}.${id.soundName} starting.`);
        const result = await this.playlistPlaySound(
          playlist,
          events,
          playIndex,
          loopedTimes,
          name,
        );

        console.log(`${id.groupName}.${id.soundName} ending.`);

        playIndex += 1;
        if (result.looped) {
          console.log(`Looping playlist ${name}.`);
          playIndex = 0;
          loopedTimes += 1;
        }

        sentinel = result.ended;
      }
    }

    public async playlistPlaySound(
      playlist: IPlaylist,
      events: Event[],
      playIndex: number,
      loopedTimes: number,
      name?: string,
    )
    {
      const id = playlist.ids[playIndex];
      const sound = this.getSounds(id.soundName, id.groupName);

      const event = await sound.play(
        /* Overrides the sound's fade with the playlist fade. This argument is
         * ignored if it's falsy. */
        playlist.fade,
      );

      events.push(event);

      if (playIndex === playlist.ids.length - 1) {
        /* Pass the events to the playlist's callback, if it exists. */
        playlist.tryCallback(events, name);
        /* Empty the list. */
        events.forEach(events.pop);

        if (shouldLoopPlaylist(playlist, loopedTimes)) {
          /* This value is incremented when the loop begins a new iteration so
           * it must be -1 rather than 0. */
          return getPlaylistMessage(/* ended */ false, /* looped */ true);
        }

        return getPlaylistMessage(/* ended */ true, /* looped */ false);
      }

      return getPlaylistMessage(/* ended */ false, /* looped */ false);
    }

    public playPlaylists(name: string): Promise<void>;
    public playPlaylists(names: string[]): Promise<void>;
    public playPlaylists(names: string | string[]): Promise<void> {
      if (typeof names === 'string') {
        return this.playPlaylist(names);
      } else if (Array.isArray(names)) {
        return new Promise((resolve) => {
          Promise.all(names.map((name) => this.playPlaylist(name))).then(() => (
            resolve()
          ));
        });
      }

      throw new Error();
    }

    public stopPlaylists(name: string): this;
    public stopPlaylists(names: string[]): this;
    public stopPlaylists(names: string | string[]): this {
      let arr: string[] = [];
      if (typeof names === 'string') {
        arr = [ names, ];
      } else {
        arr = names;
      }

      const stopped: {
        [key: string]: {
          [key: string]: true,
        },
      } = {};

      arr.forEach((name) => {
        this.getPlaylists(name).ids.forEach((id) => {
          if (!stopped[id.groupName]) {
            stopped[id.groupName] = {};
          } else if (stopped[id.groupName][id.soundName]) {
            /* Skip this one as we've already stopped it. */
            return;
          }

          this.getSounds(id.soundName, id.groupName).stop();
          stopped[id.groupName][id.soundName] = true;
        });
      });

      return this;
    }
  };
}
