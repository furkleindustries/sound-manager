import {
  assert,
} from '../../assertions/assert';
import {
  createGroup,
} from '../../Group/createGroup';
import {
  createSound,
} from '../../Sound/createSound';
import {
  doToOneOrMany,
} from '../../functions/doToOneOrMany';
import {
  getFrozenObject,
} from '../../functions/getFrozenObject';
import {
  getOneOrMany,
} from '../../functions/getOneOrMany';
import {
  IConstructor,
} from '../../interfaces/IConstructor';
import {
  ICreateSoundOptions,
} from '../../Sound/ICreateSoundOptions';
import {
  IGroup,
} from '../../Group/IGroup';
import {
  IGroupOptions,
} from '../../Group/IGroupOptions';
import {
  IGroupsMap,
} from '../IGroupsMap';
import {
  IManagerNode,
} from '../../Node/IManagerNode';
import {
  INodeCollectionSubmanager,
} from './INodeCollectionSubmanager';
import {
  ISound,
} from '../../Sound/ISound';
import {
  ISoundsMap,
} from '../../Group/ISoundsMap';
import {
  nameOrAllKeys,
} from '../../functions/nameOrAllKeys';

export function NodeCollectionSubmanagerMixin<T extends IConstructor<IManagerNode>>(Base: T) {
  return class NodeCollectionSubmanagerMixin extends Base implements INodeCollectionSubmanager {
    public __groups: IGroupsMap = getFrozenObject();
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

    public initializeDefaultGroup() {
      if (this.isWebAudio()) {
        this.addGroup('default', { context: this.getAudioContext(), });
      } else {
        this.addGroup('default');
      }

      return this;
    }

    public getGroups(name: string): IGroup;
    public getGroups(names: string[]): IGroup[];
    public getGroups(nameOrNames: string | string[]): IGroup | IGroup[] {
      return getOneOrMany(nameOrNames as string, this.groups);
    }

    public getAllGroups() {
      return this.getGroups(Object.keys(this.groups));
    }

    public removeGroups(name: string): this;
    public removeGroups(name: string[]): this;
    public removeGroups(names: string | string[]): this {
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
        this.initializeDefaultGroup();
      }

      return this;
    }

    public removeAllGroups() {
      return this.removeGroups(Object.keys(this.groups));
    }

    public getGroupVolume(name: string = 'default') {
      return this.getGroups(name).getVolume();
    }

    public setGroupVolume(value: number, groupName: string = 'default') {
      this.getGroups(groupName).setVolume(value);
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
      this.getGroups(groupName).addSounds(sounds);
      return this;
    }

    public getSounds(name: string, groupName?: string): ISound;
    public getSounds(names: string[], groupName?: string): ISound[];
    public getSounds(names: string | string[], groupName: string = 'default'): ISound | ISound[] {
      return this.getGroups(groupName).getSounds(names as string);
    }

    public getAllSounds() {
      return this.getAllGroups().flatMap((group) => group.getAllSounds());
    }

    public removeSound(name: string, groupName: string = 'default') {
      return this.removeSounds(name, groupName);
    }

    public removeSounds(name: string, groupName?: string): this;
    public removeSounds(names: string[], groupName?: string): this;
    public removeSounds(names: string | string[], groupName: string = 'default'): this {
      this.getGroups(groupName).removeSounds(names as string);
      return this;
    }

    public removeAllSounds(groupName?: string) {
      const oneOrMany = nameOrAllKeys(groupName, this.groups);
      doToOneOrMany(this.groups, oneOrMany, 'removeAllSounds');

      return this;
    }

    public getSoundVolume(name: string, groupName: string = 'default') {
      return this.getGroups(groupName).getSounds(name).getVolume();
    }

    public setSoundVolume(name: string, value: number, groupName: string = 'default') {
      this.getGroups(groupName).getSounds(name).setVolume(value);
      return this;
    }

    public updateAllAudioElementsVolume() {
      this.getAllGroups().forEach((grp) => grp.updateAllAudioElementsVolume());
      return this;
    }
  };
}
