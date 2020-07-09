import {
  IGroup,
} from '../../Group/IGroup';
import {
  IManagerStateCallback,
} from '../../interfaces/IManagerStateCallback';

export interface ISoundGroupViewProps {
  readonly group: IGroup;
  readonly className?: string;
  readonly registerStateCallback: (callback: IManagerStateCallback) => void;
  readonly unregisterStateCallback: (callback: IManagerStateCallback) => void;
}
