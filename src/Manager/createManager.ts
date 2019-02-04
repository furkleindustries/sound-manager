import {
  IManager,
} from './IManager';
import {
  Manager,
} from './Manager';

export function createManager(context?: AudioContext): IManager {
  const ctxCtor = AudioContext || (window as any).webkitAudioContext;
  if (!context && ctxCtor) {
    return new Manager({ context: new ctxCtor() });
  }

  return new Manager();
}
