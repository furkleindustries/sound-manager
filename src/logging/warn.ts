import {
  isDev,
} from '../functions/isDev';

const inDevMode = isDev();

export function warn(...messages: any[]) {
  if (inDevMode) {
    const bound = console.warn.bind(console);
    messages.forEach(bound);
  }
}
