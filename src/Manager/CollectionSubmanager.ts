import {
  createSound,
} from '../Sound/createSound';
import {
  doToOneOrMany,
} from '../functions/doToOneOrMany';
import {
  getFrozenObject,
} from '../functions/getFrozenObject';
import {
  ICollectionSubmanager,
} from './ICollectionSubmanager';
import {
  ICreateSoundOptions,
} from '../Sound/ICreateSoundOptions';
import {
  createGroup,
} from '../Group/createGroup';
import {
  IGroup,
} from '../Group/IGroup';
import {
  IGroupsMap,
} from './IGroupsMap';
import {
  IGroupOptions,
} from '../Group/IGroupOptions';
import {
  ISound,
} from '../Sound/ISound';
import {
  ISoundsMap,
} from '../Group/ISoundsMap';
import {
  nameOrAllKeys,
} from '../functions/nameOrAllKeys';
import {
  shallowFlattenArray,
} from '../functions/shallowFlattenArray';
import {
  assert,
  assertValid,
} from 'ts-assertions';

export class CollectionSubmanager implements ICollectionSubmanager {
  /* Node collection */
  private __groups: IGroupsMap = getFrozenObject();
  get groups() {
    return this.__groups;
  }

  private readonly __isWebAudio: () => boolean = () => false;

  private readonly __getAudioContext: () => AudioContext = () => {
    throw new Error();
  };

  private readonly __getInputNode: () => AudioNode = () => {
    throw new Error();
  };

  private readonly __getManagerVolume: () => number;

  constructor({
    getAudioContext,
    getInputNode,
    getManagerVolume,
    groups,
    isWebAudio,
  }: {
    getManagerVolume: () => number,
    getAudioContext?: () => AudioContext,
    getInputNode?: () => AudioNode;
    getOutputNode?: () => AnalyserNode;
    groups?: IGroupsMap,
    isWebAudio?: () => boolean,
  }) {
    this.__getManagerVolume = assertValid<() => number>(
      typeof getManagerVolume === 'function',
    );

    if (typeof isWebAudio === 'function') {
      this.__isWebAudio = isWebAudio;
    }

    if (typeof getAudioContext === 'function') {
      this.__getAudioContext = getAudioContext;
    }

    if (typeof getInputNode === 'function') {
      this.__getInputNode = getInputNode;
    }

    this.__initializeGroups(groups);
  }

  private __initializeGroups(groups?: IGroupsMap) {
    /* Add the 'default' group. */
    this.__initializeDefaultGroup();

    if (groups) {
      this.__groups = getFrozenObject(this.__groups, groups);
      if (this.__isWebAudio()) {
        this.__connectGroupNodes();
      }
    }
  }

  private __initializeDefaultGroup() {
    if (this.__isWebAudio()) {
      this.addGroup('default', { context: this.__getAudioContext() });
    } else {
      this.addGroup('default');
    }

    return this;
  }

  private __connectGroupNodes() {
    assert(this.__isWebAudio());
    this.getAllGroups().forEach(({ getOutputNode }) => (
      getOutputNode().connect(this.__getInputNode())
    ));
  }
  
  public addGroup(name: string, options?: IGroupOptions) {
    const group = createGroup(options);
    this.addGroups({ [name]: group });

    return group;
  }

  public addGroups(groups: IGroupsMap) {
    const names = Object.keys(groups);
    names.forEach((groupName) => {
      /* Throw if there is already a group with this name. */
      assert(!(groupName in this.groups));
      if (this.__isWebAudio()) {
        const {
          isWebAudio,
          getOutputNode,
        } = groups[groupName];

        if (isWebAudio()) {
          /* Chain the group's output node to the manager's input node. */
          getOutputNode().connect(this.__getInputNode());
        }
      }
    });

    this.__groups = getFrozenObject(this.groups, groups);

    return this;
  }

  public hasGroup(name: string) {
    return name in this.groups;
  }

  public hasGroups(names: string[]) {
    return names.filter((groupName) => (
      !(groupName in this.groups)
    )).length === 0;
  }
  public getGroup(name: string) {
    return assertValid<IGroup>(this.__groups[name]);
  }

  public getGroups(names: string[]) {
    return names.map((name) => this.getGroup(name));
  }

  public getAllGroups() {
    return this.getGroups(Object.keys(this.groups));
  }

  public getGroupsByTag(tag: string) {
    return this.getAllGroups().filter(({ hasTag }) => hasTag(tag));
  }

  public getGroupsByTags(tags: string[], matchOneOrAll: 'one' | 'all' = 'one') {
    if (matchOneOrAll === 'all') {
      return this.getAllGroups().filter(({ hasTag }) => (
        tags.filter(hasTag).length === tags.length
      ));
    }

    return this.getAllGroups().filter(({ hasTag }) => (
      tags.filter(hasTag).length >= 1
    ));
  }

  public removeGroup(name: string) {
    return this.removeGroups([ name ]);
  }

  public removeGroups(names: string | string[]) {
    const arr: string[] = typeof names === 'string' ? [ names, ] : names;
    const groups = { ...this.groups };
    arr.forEach((groupName) => {
      const {
        isWebAudio,
        getOutputNode,
      } = groups[groupName];

      if (isWebAudio()) {
        getOutputNode().disconnect();
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
    groupName?: string
  ): Promise<ISound>;
  public async addSound(
    name: string,
    options: string | ICreateSoundOptions,
    groupName: string = 'default',
  ): Promise<ISound>
  {
    /* Allow a bare string to be used as an URL argument. */
    const tempOpts: Partial<ICreateSoundOptions> & { url: string } =
      typeof options === 'string' ? { url: options } : { ...options };

    const opts: ICreateSoundOptions = getFrozenObject({
      isWebAudio: this.__isWebAudio(),
      context: this.__getAudioContext(),
      getManagerVolume: () => this.__getManagerVolume(),
      ...tempOpts,
    });

    const sound = await createSound(opts);
    this.addSounds({ [name]: sound }, groupName);

    return sound;
  }

  public addSounds(sounds: ISoundsMap, groupName: string = 'default') {
    this.getGroup(groupName).addSounds(sounds);
    return this;
  }

  public hasSound(name: string, groupName: string = 'default') {
    assert(this.groups[groupName]);
    return name in this.groups[groupName].sounds;
  }

  public getSound(name: string, groupName: string = 'default') {
    return this.getGroup(groupName).getSound(name);
  }

  public hasSounds(names: string[], groupName: string = 'default') {
    expect(this.groups[groupName]);

    return names.filter((soundName) => (
      !(soundName in this.groups[groupName])
    )).length === 0;
  }

  public getSounds(names: string[], groupName: string = 'default') {
    return this.getGroup(groupName).getSounds(names);
  }

  public getAllSounds() {
    return shallowFlattenArray(
      this.getAllGroups().map(({ getAllSounds }) => getAllSounds())
    );
  }

  public getSoundsByTag(tag: string) {
    return shallowFlattenArray(
      this.getAllGroups().map(({ getSoundsByTag }) => getSoundsByTag(tag))
    );
  }

  public getSoundsByTags(tags: string[], matchOneOrAll: 'one' | 'all' = 'one') {
    let collection: ISound[][];
    if (matchOneOrAll === 'all') {
      collection = this.getAllGroups().map(({ getSoundsByTags }) => (
        getSoundsByTags(tags, matchOneOrAll)
      ));
    } else {
      collection = this.getAllGroups().map(({ getSoundsByTags }) => (
        getSoundsByTags(tags, matchOneOrAll)
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
}
