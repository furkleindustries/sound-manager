import {
  createHtmlAudioSound,
} from '../../src/functions/createHtmlAudioSound';

import {
  Sound,
} from '../../src/Sound/Sound';
jest.mock('../../src/Sound/Sound');

describe('createHtmlAudioSound unit tests.', () => {
  beforeEach(() => {
    (Sound as any).mockClear();
  });

  it('Outputs an object of instance Promise.', () => {
    const prom = createHtmlAudioSound({
      manager: {} as any,
      url: 'whatever',
    });

    expect(prom).toBeInstanceOf(Promise);
  });

  it('Generates a new Audio element with the src set to the url argument.', () => {
    const url = 'https://foo.bar/fooobar';
    const prom = createHtmlAudioSound({
      url,
      manager: {} as any,
    });

    return expect(new Promise((resolve) => {
      prom.then(() => {
        return resolve(
          (Sound as any).mock.calls[0][0].audioElement.src
        );
      });
    })).resolves.toBe(url);
  });

  it('Sets the audio element to preload=auto.', () => {
    const url = 'whatever';
    const prom = createHtmlAudioSound({
      url,
      manager: {} as any,
    });

    return expect(new Promise((resolve) => {
      prom.then(() => {
        return resolve(
          (Sound as any).mock.calls[0][0].audioElement.preload
        );
      });
    })).resolves.toBe('auto');
  });

  it('Merges options in and passes them to the Sound constructor.', () => {
    const opts = {
      url: 'foobarbaz',
      manager: {} as any,
    };

    const prom = createHtmlAudioSound(opts);

    return expect(new Promise((resolve) => {
      prom.then(() => {
        return resolve(
          (Sound as any).mock.calls[0][0]
        );
      });
    })).resolves.toMatchObject(opts);
  });
});
