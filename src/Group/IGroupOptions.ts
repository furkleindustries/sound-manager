import {
  INodeOptions,
} from '../Node/INodeOptions';
import {
  IPanelRegisterableNodeOptions,
} from '../Node/IPanelRegisterableNodeOptions';
import {
  ISoundsMap,
} from './ISoundsMap';
import {
  ITaggableNodeOptions,
} from '../Node/ITaggableNodeOptions';

export interface IGroupOptions
  extends
    INodeOptions,
    IPanelRegisterableNodeOptions,
    ITaggableNodeOptions
{
  sounds?: ISoundsMap;
}
