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

  private readonly __initializeGroups = (groups?: IGroupsMap) => {
    /* Add the 'default' group. */
    this.__initializeDefaultGroup();

    if (groups) {
      this.__groups = getFrozenObject(this.__groups, groups);
      if (this.__isWebAudio()) {
        this.__connectGroupNodes();
      }
    }
  };

  private readonly __initializeDefaultGroup = () => {
    if (this.__isWebAudio()) {
      this.addGroup('default', { context: this.__getAudioContext() });
    } else {
      this.addGroup('default');
    }

    return this;
  };

  private readonly __connectGroupNodes = () => {
    assert(this.__isWebAudio());
    this.getAllGroups().forEach((group) => (
      group.getOutputNode().connect(this.__getInputNode())
    ));
  };

  public readonly addGroup = (name: string, options?: IGroupOptions) => {
    const group = createGroup(options);
    this.addGroups({ [name]: group });

    return group;
  };

  public readonly addGroups = (groups: IGroupsMap) => {
    const names = Object.keys(groups);
    names.forEach((groupName) => {
      /* Throw if there is already a group with this name. */
      assert(!(groupName in this.groups));
      if (this.__isWebAudio()) {
        const group = groups[groupName];

        if (group.isWebAudio()) {
          /* Chain the group's output node to the manager's input node. */
          group.getOutputNode().connect(this.__getInputNode());
        }
      }
    });

    this.__groups = getFrozenObject(this.groups, groups);

    return this;
  };

  public readonly hasGroup = (name: string) => (name in this.groups);

  public readonly hasGroups = (names: string[]) => (
    names.filter((groupName) => (
      !(groupName in this.groups)
    )).length === 0
  );

  public readonly getGroup = (name: string) => (
    assertValid<IGroup>(this.__groups[name])
  );

  public readonly getGroups = (names: string[]) => (
    names.map((name) => this.getGroup(name))
  );

  public readonly getAllGroups = () => (
    this.getGroups(Object.keys(this.groups))
  );

  public readonly getGroupsByTag = (tag: string) => (
    this.getAllGroups().filter((group) => group.hasTag(tag))
  );

  public readonly getGroupsByTags = (
    tags: string[],
    matchOneOrAll: 'one' | 'all' = 'one',
  ) => this.getAllGroups().filter((group) => (
    matchOneOrAll === 'all' ?
      tags.filter(group.hasTag).length === tags.length :
      tags.filter(group.hasTag).length >= 1
  ));

  public readonly removeGroup = (name: string) => this.removeGroups([ name ]);

  public readonly removeGroups = (names: string | string[]) => {
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
  };

  public readonly removeAllGroups = () => (
    this.removeGroups(Object.keys(this.groups))
  );

  public readonly getGroupVolume = (name = 'default') => (
    this.getGroup(name).getVolume()
  );

  public readonly setGroupVolume = (
    value: number,
    groupName = 'default',
  ) => this.getGroup(groupName).setVolume(value) && this;

  public readonly addSound = async (
    name: string,
    options: string | ICreateSoundOptions,
    groupName = 'default',
  ): Promise<ISound> =>
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

    this.__registerIntentToAddSound(name, groupName);
    const sound = await createSound(opts);
    this.addSounds({ [name]: sound }, groupName);
    this.__deregisterIntentToAddSound(name, groupName);

    return sound;
  };

  private readonly __registerIntentToAddSound = (
    name: string,
    groupName = 'default',
  ) => this.getGroup(groupName).registerIntentToAddSound(name);

  private readonly __deregisterIntentToAddSound = (
    name: string,
    groupName = 'default',
  ) => this.getGroup(groupName).deregisterIntentToAddSound(name);

  public readonly addSounds = (
    sounds: ISoundsMap,
    groupName = 'default',
  ) => this.getGroup(groupName).addSounds(sounds) && this;

  public readonly hasSound = (name: string, groupName = 'default') => (
    this.getGroup(groupName).hasSound(name)
  );

  public readonly getSound = (name: string, groupName = 'default') => (
    this.getGroup(groupName).getSound(name)
  );

  public readonly hasSounds = (
    names: string[],
    groupName = 'default',
  ) => this.getGroup(groupName).hasSounds(names);

  public readonly getSounds = (
    names: string[],
    groupName = 'default',
  ) => this.getGroup(groupName).getSounds(names);

  public readonly getAllSounds = () => shallowFlattenArray(
    this.getAllGroups().map((group) => group.getAllSounds())
  );

  public readonly getSoundsByTag = (tag: string) => shallowFlattenArray(
    this.getAllGroups().map((group) => group.getSoundsByTag(tag))
  );

  public readonly getSoundsByTags = (
    tags: string[],
    matchOneOrAll: 'one' | 'all' = 'one',
  ) => shallowFlattenArray(
    this.getAllGroups().map((group) => (
      group.getSoundsByTags(tags, matchOneOrAll)
    ))
  );

  public readonly removeSound = (name: string, groupName = 'default') => (
    this.getGroup(groupName).removeSound(name) && this
  );

  public readonly removeSounds = (
    names: string[],
    groupName = 'default',
  ) => {
    assert(Array.isArray(names));
    names.forEach((name) => this.removeSound(name, groupName));

    return this;
  };

  public readonly removeAllSounds = (groupName?: string) => {
    const oneOrMany = nameOrAllKeys(groupName, this.groups);
    doToOneOrMany(this.groups, oneOrMany, 'removeAllSounds');

    return this;
  };

  public readonly getSoundVolume = (
    name: string,
    groupName = 'default',
  ) => this.getGroup(groupName).getSound(name).getVolume();

  public readonly setSoundVolume = (
    name: string,
    value: number,
    groupName = 'default',
  ) => this.getGroup(groupName).getSound(name).setVolume(value) && this;

  public readonly updateAllAudioElementsVolume = () => {
    this.getAllGroups().forEach((grp) => grp.updateAllAudioElementsVolume());
    return this;
  };
}
