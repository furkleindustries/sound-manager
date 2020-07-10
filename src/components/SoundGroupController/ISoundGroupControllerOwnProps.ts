import { IGroup } from "../../Group/IGroup";

export interface ISoundGroupControllerOwnProps {
  readonly group: IGroup;
  readonly groupName: string;
  readonly className?: string;
}
