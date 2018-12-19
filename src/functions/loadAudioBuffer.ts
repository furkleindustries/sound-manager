export const loadAudioBuffer = (
  url: string,
  context: AudioContext
): Promise<AudioBuffer> =>
{
  const request = new XMLHttpRequest();
  request.open('GET', url, true);
  request.responseType = 'arraybuffer';

  return new Promise((resolve, reject) => {
    request.onload = () => {
      context.decodeAudioData(
        request.response,
        (buffer) => {
          if (!buffer) {
            return reject(`error decoding file data:  ${url}`);
          }

          return resolve(buffer);
        },
        (error) => {
          return reject(error);
        },
      );
    };

    request.onerror = () => {
      reject(`Encountered error loading audio from ${url}`);
    };

    request.send();
  })
};
