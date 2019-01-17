import {
  createWebAudioSound,
} from '../../src/Sound/createWebAudioSound';

jest.mock('../../src/functions/loadAudioBuffer');
import {
  loadAudioBuffer,
} from '../../src/functions/loadAudioBuffer';
jest.mock('../../src/Sound/Sound');
import {
  Sound,
} from '../../src/Sound/Sound';

describe('createWebAudioSound unit tests.', () => {
  beforeEach(() => {
    (loadAudioBuffer as any).mockClear();
    (Sound as any).mockClear();
  });

  it('Throws if no options argument is provided.', () => {
    // @ts-ignore
    const func = () => createWebAudioSound();

    expect(func).toThrow();
  });

  it('Throws if the url property is missing from the options.', () => {
    // @ts-ignore
    const func = () => createWebAudioSound({});

    expect(func).toThrow();
  });

  it('Returns a promise.', () => {
    const opts = {
      url: 'foobar',
      getManagerVolume: jest.fn(() => 1),
      isWebAudio: true,
    };

    expect(createWebAudioSound(opts)).toBeInstanceOf(Promise);
  });

  it('Constructs a Sound with the audio buffer with other options if loadAudioBuffer resolves.', () => {
    const mockVal1 = Symbol('Sound');
    (Sound as any).mockImplementation(() => mockVal1);
    const mockVal2 = Symbol('buffer');
    (loadAudioBuffer as any).mockReturnValue(Promise.resolve(mockVal2));

    const url = 'test';
    const opts = {
      url,
      manager: {
        getAudioContext: jest.fn(),
      },
    } as any;

    return createWebAudioSound(opts).then(() => {
      expect(Sound).toBeCalledTimes(1);
      expect((Sound as any).mock.calls[0][0]).toMatchObject({
        ...opts,
        buffer: mockVal2,
      });

      expect((Sound as any).mock.calls[0][0].getManagerVolume).toBeInstanceOf(Function);
    });
  });

  it('Rejects if loadAudioBuffer does.', () => {
    const mockVal = Symbol('buffer');
    (loadAudioBuffer as any).mockReturnValue(Promise.reject(mockVal));

    const opts = {
      url: 'foobar',
      getManagerVolume: jest.fn(() => 1),
      isWebAudio: true,
    };

    return expect(createWebAudioSound(opts)).rejects.toBe(mockVal);
  });
});
