import {
  IManager,
} from './IManager';
import {
  Manager,
} from './Manager';

export const createManager = (): IManager => new Manager();
