export const scheduleHtmlAudioFades = (
  audioElement: HTMLAudioElement,
  updateFunc: () => void,
) => audioElement.addEventListener('timeupdate', updateFunc);
