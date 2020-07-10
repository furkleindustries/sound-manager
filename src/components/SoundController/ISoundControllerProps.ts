import {
  ISound,
} from '../../Sound/ISound';

export interface ISoundControllerProps {
  readonly sound: ISound;
  readonly className?: string;
}
