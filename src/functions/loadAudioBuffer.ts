export const loadAudioBuffer = (
  url: string,
  context: AudioContext
): Promise<AudioBuffer> =>
{
  const request = new XMLHttpRequest();
  request.open('GET', url, true);
  request.responseType = 'arraybuffer';

  return new Promise((resolve, reject) => {
    request.onload = function() {
      // Asynchronously decode the audio file data in request.response
      context.decodeAudioData(
        request.response,
        function (buffer) {
          if (!buffer) {
            return reject(`error decoding file data:  ${url}`);
          }

          return resolve(buffer);
        },
        function (error) {
          return reject(error);
        },
      );
    }

    request.onerror = function() {
      reject(`Encountered error loading audio from ${url}`);
    }

    request.send();
  })
};
