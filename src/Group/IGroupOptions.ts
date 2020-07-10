import {
  INodeOptions,
} from '../Node/INodeOptions';
import {
  ISoundsMap,
} from './ISoundsMap';
import {
  ITaggableNodeOptions,
} from '../Node/ITaggableNodeOptions';

export interface IGroupOptions extends INodeOptions, ITaggableNodeOptions {
  isWebAudio?: boolean;
  sounds?: ISoundsMap;
}
