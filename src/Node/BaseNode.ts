import {
  IBaseNode,
} from './IBaseNode';
import {
  NodeTypes,
} from '../enums/NodeTypes';
import {
  INodeOptions,
} from './INodeOptions';
import {
  ISoundLabel,
} from './ISoundLabel';
import {
  isValidVolume,
} from '../functions/isValidVolume';
import {
  assertValid,
} from 'ts-assertions';

export class BaseNode implements IBaseNode {
  get type(): NodeTypes {
    throw new Error('Type not implemented.');
  }

  protected __label: ISoundLabel = {
    artistName: '',
    contributors: [],
    license: '',
    link: '',
    title: '',
  };

  protected __volume: number = 1;

  constructor(options?: INodeOptions | [ INodeOptions ]) {
    const opts = (Array.isArray(options) ? options[0] : options) || {};
    const {
      label,
      volume,
    } = opts;

    if (label) {
      this.setLabel(label);
    }

    if (isValidVolume(volume)) {
      this.setVolume(volume);
    }
  }

  public readonly getLabel = (): ISoundLabel => this.__label;

  public setLabel(label: Partial<ISoundLabel>) {
    const newLabel = { ...this.getLabel() };

    if (label.artistName) {
      newLabel.artistName = label.artistName;
    }

    if (Array.isArray(label.contributors)) {
      newLabel.contributors = label.contributors;
    }

    if (label.license) {
      newLabel.license = label.license;
    }

    if (label.link) {
      newLabel.link = label.link;
    }

    if (label.title) {
      newLabel.title = label.title;
    }

    this.__label = { ...newLabel };

    return this;
  };

  public readonly getVolume = () => this.__volume;

  public setVolume(value: number) {
    
    this.__volume = assertValid(
      value,
      'The value passed to Sound.setVolume was not valid.',
      isValidVolume,
    );

    return this;
  }
}
