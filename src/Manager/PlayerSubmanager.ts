import {
  createPlaylist,
} from '../Playlist/createPlaylist';
import {
  doToOneOrMany,
} from '../functions/doToOneOrMany';
import {
  getFrozenObject,
} from '../functions/getFrozenObject';
import {
  getPlaylistMessage,
} from './getPlaylistMessage';
import {
  ICollectionSubmanager,
} from './ICollectionSubmanager';
import {
  IPlaylist,
} from '../Playlist/IPlaylist';
import {
  IPlaylistsMap,
} from './IPlaylistsMap';
import {
  IPlaylistOptions,
} from '../Playlist/IPlaylistOptions';
import {
  IPlayerSubmanager,
} from './IPlayerSubmanager';
import {
  ISoundGroupIdentifier,
} from '../interfaces/ISoundGroupIdentifier';
import {
  log,
} from '../logging/log';
import {
  nameOrAllKeys,
} from '../functions/nameOrAllKeys';
import {
  shallowFlattenArray,
} from '../functions/shallowFlattenArray';
import {
  shouldLoopPlaylist,
} from './shouldLoopPlaylist';
import {
  assert,
  assertValid,
} from 'ts-assertions';

export class PlayerSubmanager implements IPlayerSubmanager {
  /* Player */
  private __playlists: IPlaylistsMap = getFrozenObject();
  get playlists() {
    return this.__playlists;
  }

  private readonly __getCollection: () => ICollectionSubmanager;

  constructor({
    getCollection,
  }: {
    getCollection: () => ICollectionSubmanager,
  })
  {
    assert(typeof getCollection === 'function');
    this.__getCollection = getCollection;
  }

  public async playGroup(name: string): Promise<Event[]> {
    return await this.__getCollection().getGroup(name).playAllSounds();
  }

  public async playGroups(names: string[]): Promise<Event[]> {
    assert(Array.isArray(names));
    const val = await Promise.all(names.map((name) => this.playGroup(name)));
    return shallowFlattenArray(val);
  }

  public playSound(name: string, groupName: string = 'default'): Promise<Event> {
    return this.__getCollection().getGroup(groupName).playSound(name);
  }

  public playSounds(names: string[], groupName: string = 'default'): Promise<Event[]> {
    assert(Array.isArray(names));
    return this.__getCollection().getGroup(groupName).playSounds(names);
  }

  public async playAllSounds(groupName?: string): Promise<Event[]> {
    if (groupName) {
      return this.playGroup(groupName);
    } else {
      const val = await Promise.all(
        this.__getCollection().getAllGroups().map(({ playAllSounds }) => (
          playAllSounds()
        ))
      );

      return shallowFlattenArray(val);
    }
  }

  public pauseSound(name: string, groupName: string = 'default') {
    this.__getCollection().getGroup(groupName).pauseSound(name);
    return this;
  }

  public pauseSounds(names: string[], groupName: string = 'default') {
    assert(Array.isArray(names));    
    this.__getCollection().getGroup(groupName).pauseSounds(names);

    return this;
  }

  public pauseAllSounds(groupName?: string) {
    const oneOrMany = nameOrAllKeys(groupName, this.__getCollection().groups);
    doToOneOrMany(this.__getCollection().groups, oneOrMany, 'pauseAllSounds');

    return this;
  }

  public stopSound(name: string, groupName: string = 'default') {
    this.__getCollection().getGroup(groupName).stopSound(name);
    return this;
  }

  public stopSounds(names: string[], groupName: string = 'default'): this {
    this.__getCollection().getGroup(groupName).stopSounds(names);
    return this;
  }

  public stopAllSounds(groupName?: string) {
    const oneOrMany = nameOrAllKeys(groupName, this.__getCollection().groups);
    doToOneOrMany(this.__getCollection().groups, oneOrMany, 'stopAllSounds');

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

  public hasPlaylist(name: string) {
    return name in this.playlists;
  }

  public getPlaylist(name: string) {
    return assertValid<IPlaylist>(this.playlists[name]);
  }

  public hasPlaylists(names: string[]) {
    return names.filter((playlistName) => (
      !(playlistName in this.playlists)
    )).length === 0;
  }

  public getPlaylists(names: string[]) {
    return names.map((name) => this.getPlaylist(name));
  }

  public removePlaylist(name: string) {
    return this.removePlaylists([ name ]);
  }

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
    const playlist = this.getPlaylist(name);
    log(`Playing playlist ${name}.`);
    const events: Event[] = [];
    let playIndex = 0;
    let loopedTimes = 0;
    let sentinel = true;
    while (sentinel) {
      const id = playlist.ids[playIndex];
      log(`${id.groupName}.${id.soundName} starting.`);
      const {
        ended,
        looped,
      } = await this.__playlistPlaySound(
        playlist,
        events,
        playIndex,
        loopedTimes,
        name,
      );

      log(`${id.groupName}.${id.soundName} ending.`);

      playIndex += 1;
      if (looped) {
        log(`Looping playlist ${name}.`);
        playIndex = 0;
        loopedTimes += 1;
      }

      sentinel = ended;
    }
  }

  private async __playlistPlaySound(
    playlist: IPlaylist,
    events: Event[],
    playIndex: number,
    loopedTimes: number,
    name?: string,
  )
  {
    const id = playlist.ids[playIndex];
    const sound = this.__getCollection().getSound(id.soundName, id.groupName);

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
      events.splice(0, events.length);

      if (shouldLoopPlaylist(playlist, loopedTimes)) {
        /* This value is incremented when the loop begins a new iteration so
          * it must be -1 rather than 0. */
        return getPlaylistMessage(/* ended */ false, /* looped */ true);
      }

      return getPlaylistMessage(/* ended */ true, /* looped */ false);
    }

    return getPlaylistMessage(/* ended */ false, /* looped */ false);
  }

  public async playPlaylists(names: string[]) {
    assert(Array.isArray(names));
    await Promise.all(names.map(this.playPlaylist));
  }

  public stopPlaylist(name: string) {
    this.getPlaylist(name).ids.forEach(({ groupName, soundName, }) => (
      this.__getCollection().getSound(soundName, groupName).stop()  
    ));

    return this;
  }

  public stopPlaylists(names: string[]) {
    assert(Array.isArray(names));
    names.map((name) => this.stopPlaylist(name));

    return this;
  }
}