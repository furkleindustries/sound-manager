import {
  isDev,
} from '../functions/isDev';

const inDevMode = isDev();

export function error(...messages: any[]) {
  if (inDevMode) {
    const bound = console.error.bind(console);
    messages.forEach(bound);
  }
}
