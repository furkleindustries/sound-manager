export function loadAudioBuffer(
  url: string,
  context: AudioContext,
): Promise<AudioBuffer>
{
  const request = new XMLHttpRequest();
  request.open('GET', url);
  request.responseType = 'arraybuffer';

  return new Promise((resolve, reject) => {
    request.onload = () => context.decodeAudioData(
      request.response,
      resolve,
      reject,
    );

    request.onerror = () => (
      reject(`Encountered error loading audio from ${url}.`)
    );

    request.send();
  });
}
