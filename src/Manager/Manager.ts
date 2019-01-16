import {
  AnalysableNodeMixin,
} from '../Node/AnalysableNodeMixin';
import {
  assert,
} from '../assertions/assert';
import {
  assertNodeIsWebAudio,
} from '../assertions/assertNodeIsWebAudio';
import {
  assertValid,
} from '../assertions/assertValid';
import {
  createGroup,
} from '../Group/createGroup';
import {
  createPlaylist,
} from '../Playlist/createPlaylist';
import {
  createSound,
} from '../Sound/createSound';
import {
  doToOneOrMany,
} from '../functions/doToOneOrMany';
import {
  generateVolumePanelElement,
} from '../functions/generateVolumePanelElement';
import {
  getFrozenObject,
} from '../functions/getFrozenObject';
import {
  getPlaylistMessage,
} from './getPlaylistMessage';
import {
  ICreateSoundOptions,
} from '../Sound/ICreateSoundOptions';
import {
  IGroup,
} from '../Group/IGroup';
import {
  IGroupOptions,
} from '../Group/IGroupOptions';
import {
  IGroupsMap,
} from './IGroupsMap';
import {
  IPanelRegisterableNode,
} from '../Node/IPanelRegisterableNode';
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
  ISound,
} from '../Sound/ISound';
import {
  ISoundGroupIdentifier,
} from '../interfaces/ISoundGroupIdentifier';
import {
  ISoundsMap,
} from '../Group/ISoundsMap';
import {
  IManager,
} from './IManager';
import {
  IManagerOptions,
} from './IManagerOptions';
import {
  ManagerNode,
} from '../Node/ManagerNode';
import {
  nameOrAllKeys,
} from '../functions/nameOrAllKeys';
import {
  NodeTypes,
} from '../enums/NodeTypes';
import {
  shallowFlattenArray,
} from '../functions/shallowFlattenArray';
import {
  shouldLoopPlaylist,
} from './shouldLoopPlaylist';
import {
  updateAudioPanelElement,
} from '../functions/updateAudioPanelElement';

declare const webkitAudioContext: AudioContext;
const ctxCtor = AudioContext || webkitAudioContext;

export class Manager extends AnalysableNodeMixin(ManagerNode) implements IManager {
  get type(): NodeTypes.Manager {
    return NodeTypes.Manager;
  }

  constructor(options?: IManagerOptions) {
    super({ ...options });

    if (!this.__audioContext && ctxCtor) {
      /* any cast is for typedoc complaints. */
      this.__audioContext = new (ctxCtor as any)();
      this.__isWebAudio = true;
    }

    const opts = options || {};
    const {
      groups,
      masterVolume,
    } = opts;

    if (this.isWebAudio()) {
      this.__connectNodes();
    }

    this.__initializeGroups(groups);

    if (typeof masterVolume !== 'undefined') {
      this.setVolume(masterVolume);
    }
  }

  private __connectNodes() {
    assertNodeIsWebAudio(this, '__connectNodes' as any);
    this.getInputNode().connect(this.getOutputNode());
    this.getOutputNode().connect(this.getAudioContext().destination);
  }

  private __initializeGroups(groups?: IGroupsMap) {
    /* Add the 'default' group. */
    this.__initializeDefaultGroup();

    if (groups) {
      this.__groups = getFrozenObject(this.__groups, groups);
      if (this.isWebAudio()) {
        this.__connectGroupNodes();
      }
    }
  }

  private __connectGroupNodes() {
    assertNodeIsWebAudio(this, '__connectGroupNodes' as any);
    this.getAllGroups().forEach((group) => (
      group.getOutputNode().connect(this.getInputNode())
    ));
  }

  public setVolume(value: number) {
    super.setVolume(value);
    this.updateAllAudioElementsVolume();

    return this;
  }

  /* Node collection */
  private __groups: IGroupsMap = getFrozenObject();
  get groups() {
    return this.__groups;
  }

  public addGroup(name: string, options?: IGroupOptions) {
    const group = createGroup(options);
    this.addGroups({ [name]: group });

    return group;
  }

  public addGroups(groups: IGroupsMap) {
    const names = Object.keys(groups);
    names.forEach((groupName) => {
      assert(!(groupName in this.groups))
      if (this.isWebAudio()) {
        const group = groups[groupName];
        if (group.isWebAudio()) {
          /* Chain the group's output node to the manager's input node. */
          group.getOutputNode().connect(this.getInputNode());
        }
      }
    });

    this.__groups = getFrozenObject(this.groups, groups);

    return this;
  }

  private __initializeDefaultGroup() {
    if (this.isWebAudio()) {
      this.addGroup('default', { context: this.getAudioContext(), });
    } else {
      this.addGroup('default');
    }

    return this;
  }

  public getGroup(name: string) {
    return assertValid<IGroup>(this.__groups[name]);
  }

  public getGroups(names: string[]) {
    return names.map(this.getGroup);
  }

  public getAllGroups() {
    return this.getGroups(Object.keys(this.groups));
  }

  public getGroupsByTag(tag: string) {
    return this.getAllGroups().filter((group) => group.hasTag(tag));
  }

  public getGroupsByTags(tags: string[], matchOneOrAll: 'one' | 'all' = 'one') {
    if (matchOneOrAll === 'all') {
      return this.getAllGroups().filter((group) => (
        tags.filter(group.hasTag).length === tags.length
      ));
    }

    return this.getAllGroups().filter((group) => (
      tags.filter(group.hasTag).length >= 1
    ));
  }

  public removeGroup(name: string) {
    return this.removeGroups([ name ]);
  }

  public removeGroups(names: string | string[]) {
    const arr: string[] = typeof names === 'string' ? [ names, ] : names;
    const groups = { ...this.groups, };
    arr.forEach((groupName) => {
      const group = groups[groupName];
      if (group.isWebAudio()) {
        group.getOutputNode().disconnect();
      }

      delete groups[groupName];
    });

    this.__groups = getFrozenObject(groups);
    if (!('default' in this.groups)) {
      /* Re-add a (now-empty) default group. */
      this.__initializeDefaultGroup();
    }

    return this;
  }

  public removeAllGroups() {
    return this.removeGroups(Object.keys(this.groups));
  }

  public getGroupVolume(name: string = 'default') {
    return this.getGroup(name).getVolume();
  }

  public setGroupVolume(value: number, groupName: string = 'default') {
    this.getGroup(groupName).setVolume(value);
    return this;
  }

  public addSound(
    name: string,
    options: string,
    groupName?: string,
  ): Promise<ISound>;
  public addSound(
    name: string,
    options: ICreateSoundOptions,
    groupName?: string): Promise<ISound>;
  public addSound(
    name: string,
    options: string | ICreateSoundOptions,
    groupName: string = 'default',
  ): Promise<ISound>
  {
    /* Allow a bare string to be used as an URL argument. */
    const tempOpts: Partial<ICreateSoundOptions> & { url: string } =
      typeof options === 'string' ?
        { url: options } :
        { ...options };

    const opts: ICreateSoundOptions = getFrozenObject({
      isWebAudio: this.isWebAudio(),
      context: this.getAudioContext(),
      getManagerVolume: () => this.getVolume(),
      ...tempOpts,
    });

    return new Promise((resolve) => {
      createSound(opts).then((sound) => {
        this.addSounds({ [name]: sound }, groupName);
        return resolve(sound);
      });
    });
  }

  public addSounds(sounds: ISoundsMap, groupName: string = 'default') {
    this.getGroup(groupName).addSounds(sounds);
    return this;
  }

  public getSound(name: string, groupName: string = 'default') {
    return this.getGroup(groupName).getSound(name);
  }

  public getSounds(names: string[], groupName: string = 'default') {
    return this.getGroup(groupName).getSounds(names);
  }

  public getAllSounds() {
    return shallowFlattenArray(
      this.getAllGroups().map((group) => group.getAllSounds())
    );
  }

  public getSoundsByTag(tag: string) {
    return shallowFlattenArray(
      this.getAllGroups().map((group) => group.getSoundsByTag(tag))
    );
  }

  public getSoundsByTags(tags: string[], matchOneOrAll: 'one' | 'all' = 'one') {
    let collection: ISound[][];
    if (matchOneOrAll === 'all') {
      collection = this.getAllGroups().map((group) => (
        group.getSoundsByTags(tags, matchOneOrAll)
      ));
    } else {
      collection = this.getAllGroups().map((group) => (
        group.getSoundsByTags(tags, matchOneOrAll)
      ));
    }

    return shallowFlattenArray(collection);
  }

  public removeSound(name: string, groupName: string = 'default') {
    this.getGroup(groupName).removeSound(name);
    return this;
  }

  public removeSounds(names: string[], groupName: string = 'default') {
    assert(Array.isArray(names));
    names.forEach((name) => this.removeSound(name, groupName));

    return this;
  }

  public removeAllSounds(groupName?: string) {
    const oneOrMany = nameOrAllKeys(groupName, this.groups);
    doToOneOrMany(this.groups, oneOrMany, 'removeAllSounds');

    return this;
  }

  public getSoundVolume(name: string, groupName: string = 'default') {
    return this.getGroup(groupName).getSound(name).getVolume();
  }

  public setSoundVolume(name: string, value: number, groupName: string = 'default') {
    this.getGroup(groupName).getSound(name).setVolume(value);
    return this;
  }

  public updateAllAudioElementsVolume() {
    this.getAllGroups().forEach((grp) => grp.updateAllAudioElementsVolume());
    return this;
  }

  /* Player */
  private __playlists: IPlaylistsMap = getFrozenObject();
  get playlists() {
    return this.__playlists;
  }
  
  public playGroup(name: string): Promise<Event[]> {
    return new Promise((resolve, reject) => (
      this.getGroup(name).playAllSounds()).then(resolve, reject)
    );
  }

  public playGroups(names: string[]): Promise<Event[]> {
    assert(Array.isArray(names));
    return new Promise((resolve, reject) => (
      Promise.all(names.map(this.playGroup)).then(
        (val) => resolve(shallowFlattenArray(val)),
        reject,
      )
    ));
  }

  public playSound(name: string, groupName: string = 'default'): Promise<Event> {
    return this.getGroup(groupName).playSound(name);
  }

  public playSounds(names: string[], groupName: string = 'default'): Promise<Event[]> {
    assert(Array.isArray(names));
    return this.getGroup(groupName).playSounds(names);
  }

  public playAllSounds(groupName?: string): Promise<Event[]> {
    if (groupName) {
      return this.playGroup(groupName);
    } else {
      return new Promise((resolve, reject) => (
        Promise.all(
          this.getAllGroups().map((group) => group.playAllSounds())
        ).then(
          (val) => resolve(shallowFlattenArray(val)),
          reject,
        )
      ));
    }
  }

  public pauseSound(name: string, groupName: string = 'default') {
    this.getGroup(groupName).pauseSound(name);
    return this;
  }

  public pauseSounds(names: string[], groupName: string = 'default') {
    assert(Array.isArray(names));    
    this.getGroup(groupName).pauseSounds(names);

    return this;
  }

  public pauseAllSounds(groupName?: string) {
    const oneOrMany = nameOrAllKeys(groupName, this.groups);
    doToOneOrMany(this.groups, oneOrMany, 'pauseAllSounds');

    return this;
  }

  public stopSound(name: string, groupName: string = 'default') {
    this.getGroup(groupName).stopSound(name);
    return this;
  }

  public stopSounds(names: string[], groupName: string = 'default'): this {
    this.getGroup(groupName).stopSounds(names);
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

  public getPlaylist(name: string) {
    return assertValid<IPlaylist>(this.playlists[name]);
  }

  public getPlaylists(names: string[]) {
    return names.map(this.getPlaylist);
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
    console.log(`Playing playlist ${name}.`);
    const events: Event[] = [];
    let playIndex = 0;
    let loopedTimes = 0;
    let sentinel = true;
    while (sentinel) {
      const id = playlist.ids[playIndex];
      console.log(`${id.groupName}.${id.soundName} starting.`);
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

      console.log(`${id.groupName}.${id.soundName} ending.`);

      playIndex += 1;
      if (looped) {
        console.log(`Looping playlist ${name}.`);
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
    const sound = this.getSound(id.soundName, id.groupName);

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

  public playPlaylists(names: string[]): Promise<void> {
    assert(Array.isArray(names));
    return new Promise((resolve, reject) => (
      Promise.all(names.map(this.playPlaylist)).then(
        () => resolve(),
        reject,
      )
    ));
  }

  public stopPlaylist(name: string) {
    this.getPlaylist(name).ids.forEach((id) => (
      this.getSound(id.soundName, id.groupName).stop()  
    ));

    return this;
  }

  public stopPlaylists(names: string[]) {
    assert(Array.isArray(names));
    names.map(this.stopPlaylist);

    return this;
  }

  /* Volume panel */
  private __volumePanelElement: HTMLElement | null = null;

  public generateVolumePanelElement(): HTMLElement {
    this.__volumePanelElement = generateVolumePanelElement(this);
    return this.__volumePanelElement;
  }

  public updateVolumePanelElement() {
    assert(this.__volumePanelElement);
    const newElem = updateAudioPanelElement(this, this.__volumePanelElement!);
    this.__volumePanelElement = newElem;

    return this;
  }

  public volumePanelRegister(node: IPanelRegisterableNode) {
    assert(node);
    node.__panelRegistered = true;
    if (this.__volumePanelElement) {
      this.updateVolumePanelElement();
    }

    return this;
  }

  public volumePanelDeregister(node: IPanelRegisterableNode) {
    assert(node);
    node.__panelRegistered = false;
    if (this.__volumePanelElement) {
      this.updateVolumePanelElement();
    }

    return this;
  }
}
