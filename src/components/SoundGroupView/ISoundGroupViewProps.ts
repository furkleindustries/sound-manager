import {
  IGroup,
} from '../../Group/IGroup';

export interface ISoundGroupViewProps {
  readonly group: IGroup;
  readonly groupName: string;
  readonly className?: string;
}
