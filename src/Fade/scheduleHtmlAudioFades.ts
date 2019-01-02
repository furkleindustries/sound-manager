export function scheduleHtmlAudioFades(
  audioElement: HTMLAudioElement,
  updateFunc: () => void,
)
{
  audioElement.addEventListener('timeupdate', updateFunc);
}
