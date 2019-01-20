import {
  isDev,
} from '../functions/isDev';

const inDevMode = isDev();

export function log(...messages: any[]) {
  if (inDevMode) {
    const bound = console.log.bind(console);
    messages.forEach(bound);
  }
}
