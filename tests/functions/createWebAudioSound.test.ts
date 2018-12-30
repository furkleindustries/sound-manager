import {
  createWebAudioSound,
} from '../../src/functions/createWebAudioSound';

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
    const func = () => createWebAudioSound({
      manager: {} as any,
    });

    expect(func).toThrow();
  });

  it('Throws if the manager property is missing from the options.', () => {
    // @ts-ignore
    const func = () => createWebAudioSound({
      url: 'test',
    });

    expect(func).toThrow();
  });

  it('Returns a promise.', () => {
    const opts = {
      url: 'foobar',
      manager: {
        getAudioContext: jest.fn(),
      },
    } as any;

    expect(createWebAudioSound(opts)).toBeInstanceOf(Promise);
  });

  it('Passes the computed arguments to loadAudioBuffer.', () => {
    const mockVal = {};
    const mock = jest.fn(() => mockVal);
    const url = 'test';
    const opts = {
      url,
      manager: { getAudioContext: mock, },
    } as any;

    createWebAudioSound(opts);

    expect(loadAudioBuffer).toBeCalledTimes(1);
    expect(loadAudioBuffer).toBeCalledWith(url, mockVal);
    expect(mock).toBeCalledTimes(1);
  });

  it('Constructs a Sound with the audio buffer with other options if loadAudioBuffer resolves.', () => {
    expect.assertions(3);

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

    const url = 'test';
    const opts = {
      url,
      manager: {
        getAudioContext: jest.fn(),
      },
    } as any;

    return expect(createWebAudioSound(opts)).rejects.toBe(mockVal);
  });
});
