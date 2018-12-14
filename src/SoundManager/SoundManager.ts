import {
  Channel,
} from '../Channel/Channel';
import {
  ISoundManager,
} from './ISoundManager';

export class SoundManager implements ISoundManager {
  channels = {
    default: new Channel(),
  };

  masterVolume = 1;

  getChannel(name: string) {
    return this.channels[name] || null;
  }

  
}
