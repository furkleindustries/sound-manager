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
  IManagerStateCallback,
} from '../interfaces/IManagerStateCallback';
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

  constructor(
    { getCollection }: { getCollection: () => ICollectionSubmanager },

    public readonly registerStateCallback: (cb: IManagerStateCallback) => void,
    public readonly unregisterStateCallback: (cb: IManagerStateCallback) => void,
    public readonly callStateCallbacks: () => void,
  )
  {
    this.__getCollection = assertValid<() => ICollectionSubmanager>(getCollection);
  }

  public readonly playGroup = async (name: string): Promise<void[]> => (
    this.__getCollection().getGroup(name).playAllSounds()
  );

  public readonly playGroups = async (names: string[]): Promise<void[]> => {
    assert(Array.isArray(names));
    const val = await Promise.all(names.map((name) => this.playGroup(name)));
    return shallowFlattenArray(val);
  };

  public readonly playSound = (
    name: string,
    groupName: string = 'default',
  ): Promise<void> => (
    this.__getCollection().getGroup(groupName).playSound(name)
  );

  public readonly playSounds = (
    names: string[],
    groupName: string = 'default',
  ): Promise<void[]> => {
    assert(Array.isArray(names));
    return this.__getCollection().getGroup(groupName).playSounds(names);
  };

  public readonly playAllSounds = async (
    groupName?: string,
  ): Promise<void[]> => {
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
  };

  public readonly pauseSound = (
    name: string,
    groupName: string = 'default',
  ) => {
    this.__getCollection().getGroup(groupName).pauseSound(name);
    return this;
  };

  public readonly pauseSounds = (
    names: string[],
    groupName: string = 'default',
  ) => {
    assert(Array.isArray(names));    
    this.__getCollection().getGroup(groupName).pauseSounds(names);

    return this;
  };

  public readonly pauseAllSounds = (groupName?: string) => {
    const oneOrMany = nameOrAllKeys(groupName, this.__getCollection().groups);
    doToOneOrMany(this.__getCollection().groups, oneOrMany, 'pauseAllSounds');

    return this;
  };

  public readonly stopSound = (
    name: string,
    groupName: string = 'default',
  ) => {
    this.__getCollection().getGroup(groupName).stopSound(name);
    return this;
  };

  public readonly stopSounds = (
    names: string[],
    groupName: string = 'default',
  ) => {
    this.__getCollection().getGroup(groupName).stopSounds(names);
    return this;
  };

  public readonly stopAllSounds = (groupName?: string) => {
    const oneOrMany = nameOrAllKeys(groupName, this.__getCollection().groups);
    doToOneOrMany(this.__getCollection().groups, oneOrMany, 'stopAllSounds');

    return this;
  };

  public readonly addPlaylist = (
    name: string,
    options: Array<ISoundGroupIdentifier | string> | IPlaylistOptions,
  ) => {
    const playlist = Array.isArray(options) ?
      createPlaylist({ ids: getFrozenObject(options) as any }) :
      createPlaylist(getFrozenObject(options));

    this.addPlaylists({ [name]: playlist });

    return playlist;
  };

  public readonly addPlaylists = (playlists: IPlaylistsMap) => {
    const playls = playlists || {};
    const names = Object.keys(playls);
    names.forEach((playlistName) => assert(!(playlistName in this.playlists)));
    this.__playlists = getFrozenObject(this.playlists, playls);

    return this;
  };

  public readonly hasPlaylist = (name: string) => (name in this.playlists);

  public readonly getPlaylist = (name: string) => (
    assertValid<IPlaylist>(this.playlists[name])
  );

  public readonly hasPlaylists = (names: string[]) => (
    names.filter((playlistName) => (
      !(playlistName in this.playlists)
    )).length === 0
  );

  public readonly getPlaylists = (names: string[]) => (
    names.map((name) => this.getPlaylist(name))
  );

  public readonly removePlaylist = (name: string) => (
    this.removePlaylists([ name ])
  );

  public readonly removePlaylists = (names: string | string[]) => {
    const playls = { ...this.playlists, };
    if (typeof names === 'string') {
      delete playls[names];
    } else {
      names.forEach((name) => delete playls[name]);
    }

    this.__playlists = getFrozenObject(playls);

    return this;
  };

  public readonly removeAllPlaylists = () => (
    this.removePlaylists(Object.keys(this.playlists))
  );

  public readonly playPlaylist = async (name: string) => {
    const playlist = this.getPlaylist(name);
    log(`Playing playlist ${name}.`);
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
  };

  private readonly  __playlistPlaySound = async (
    playlist: IPlaylist,
    playIndex: number,
    loopedTimes: number,
    name?: string,
  ) => {
    const id = playlist.ids[playIndex];
    const sound = this.__getCollection().getSound(id.soundName, id.groupName);

    await sound.play(
      /* Overrides the sound's fade with the playlist fade. This argument is
        * ignored if it's falsy. */
      playlist.fade,
    );

    if (playIndex === playlist.ids.length - 1) {
      playlist.tryCallback(name);

      if (shouldLoopPlaylist(playlist, loopedTimes)) {
        /* This value is incremented when the loop begins a new iteration so
          * it must be -1 rather than 0. */
        return getPlaylistMessage(/* ended */ false, /* looped */ true);
      }

      return getPlaylistMessage(/* ended */ true, /* looped */ false);
    }

    return getPlaylistMessage(/* ended */ false, /* looped */ false);
  };

  public readonly playPlaylists = async (names: string[]) => {
    assert(Array.isArray(names));
    await Promise.all(names.map(this.playPlaylist));
  };

  public readonly stopPlaylist = (name: string) => {
    this.getPlaylist(name).ids.forEach(({ groupName, soundName, }) => (
      this.__getCollection().getSound(soundName, groupName).stop()  
    ));

    return this;
  };

  public readonly stopPlaylists = (names: string[]) => {
    assert(Array.isArray(names));
    names.map((name) => this.stopPlaylist(name));

    return this;
  };
}
