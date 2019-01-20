import {
  createWebAudioSound,
} from '../../src/Sound/createWebAudioSound';
import {
  strings,
} from '../../src/Sound/strings';

import {
  getFrozenObject,
} from '../../src/functions/getFrozenObject';
jest.mock('../../src/functions/getFrozenObject');
import {
  loadAudioBuffer,
} from '../../src/functions/loadAudioBuffer';
jest.mock('../../src/functions/loadAudioBuffer');
import {
  Sound,
} from '../../src/Sound/Sound';
jest.mock('../../src/Sound/Sound');

describe('createWebAudioSound unit tests.', () => {
  beforeEach(() => {
    (getFrozenObject as any).mockClear();
    (getFrozenObject as any).mockImplementation((aa: any) => aa);
    (loadAudioBuffer as any).mockClear();
    (Sound as any).mockClear();
  });

  it('Throws if no options argument is provided.', async () => {
    expect.assertions(1);
    try {
      // @ts-ignore
      await createWebAudioSound();
    } catch (err) {
      expect(err.message).toBe(strings.CREATE_WEB_AUDIO_SOUND_OPTIONS_INVALID);
    }
  });

  it('Throws if the context property is missing from the options.', async () => {
    expect.assertions(1);
    try {
      // @ts-ignore
      await createWebAudioSound({});
    } catch (err) {
      expect(err.message).toBe(strings.CREATE_WEB_AUDIO_SOUND_CONTEXT_INVALID);
    }
  });

  it('Throws if the url property is missing from the options.', async () => {
    expect.assertions(1);
    try {
      // @ts-ignore
      await createWebAudioSound({ context: true });
    } catch (err) {
      expect(err.message).toBe(strings.CREATE_WEB_AUDIO_SOUND_URL_INVALID);
    }
  });

  it('Passes the options to getFrozenObject before passing them to Sound.', async () => {
    /*const opts = {

    };
    // @ts-ignore
    await createWebAudioSound*/
  });

  it('Constructs a Sound with the audio buffer with other options if loadAudioBuffer resolves.', async () => {
    const mockVal1 = Symbol('Sound');
    (Sound as any).mockImplementation(() => mockVal1);
    const mockVal2 = Symbol('buffer');
    (loadAudioBuffer as any).mockReturnValue(Promise.resolve(mockVal2));
    const mockVal3 = Symbol('context');

    const url = 'test';
    const opts = {
      context: mockVal3,
      url,
    } as any;

    await createWebAudioSound(opts);
    expect(Sound).toBeCalledTimes(1);
    expect(Sound).toBeCalledWith({
      ...opts,
      context: mockVal3,
      buffer: mockVal2,
    });
  });

  it('Rejects if loadAudioBuffer does.', async () => {
    expect.assertions(1);
    const mockVal = 'foo bar baz';
    (loadAudioBuffer as any).mockReturnValue(Promise.reject(mockVal));

    const opts = {
      context: {},
      url: 'foobar',
    };

    try {
      await createWebAudioSound(opts as any);
    } catch (err) {
      expect(err).toBe(mockVal);
    }
  });
});
