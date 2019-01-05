import {
  isDev,
} from '../functions/isDev';

const inDevMode = isDev();

export function warn(...messages: any[]) {
  if (inDevMode) {
    messages.forEach(console.warn.bind(console));
  }
}
