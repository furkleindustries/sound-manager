import {
  IManager,
} from './IManager';
import {
  Manager,
} from './Manager';

export const createManager = (
  context?: AudioContext | null | undefined,
): IManager => new Manager({ context: context || undefined });
