import {
  ISound,
} from '../../Sound/ISound';

export interface ISoundViewProps {
  readonly name: string;
  readonly sound: ISound;
  readonly className?: string;
}
