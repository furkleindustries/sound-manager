import {
  createSound,
} from '../../src/Sound/createSound';

import {
  createHtmlAudioSound,
} from '../../src/Sound/createHtmlAudioSound';
jest.mock('../../src/Sound/createHtmlAudioSound');

import {
  createWebAudioSound,
} from '../../src/Sound/createWebAudioSound';
jest.mock('../../src/Sound/createWebAudioSound');

describe('createSound Web Audio unit tests.', () => {
  beforeEach(() => {
    (createHtmlAudioSound as any).mockClear();
    (createWebAudioSound as any).mockClear();
  });

  it('Throws if no options argument is provided.', () => {
    // @ts-ignore
    const func = () => createSound();

    expect(func).toThrow();
  });

  it('Outputs a promise.', () => {
    expect(createSound({
      url: 'foobar',
      getManagerVolume: jest.fn(() => 1),
      isWebAudio: true,
    })).toBeInstanceOf(Promise);
  });

  it('Calls createWebAudioSound with the provided options if the manager is in Web Audio mode.', () => {
    const opts = {
      url: 'foobar',
      getManagerVolume: jest.fn(() => 1),
      isWebAudio: true,
    };

    createSound(opts);

    expect(createWebAudioSound).toBeCalledTimes(1);
    expect(createWebAudioSound).toBeCalledWith(opts);
  });

  it('Resolves if createWebAudioSound does.', () => {
    const sym = Symbol('foo');
    (createWebAudioSound as any).mockReturnValue(Promise.resolve(sym));

    const opts = {
      url: 'foobar',
      getManagerVolume: jest.fn(() => 1),
      isWebAudio: true,
    };

    return expect(createSound(opts)).resolves.toBe(sym);
  });

  it('Calls createHtmlAudioSound with the provided options if the call to createWebAudioSound fails.', () => {
    const warn = console.warn;
    console.warn = jest.fn();

    (createWebAudioSound as any).mockReturnValue(Promise.reject());
    (createHtmlAudioSound as any).mockReturnValue(Promise.resolve());

    const opts = {
      url: 'foobar',
      getManagerVolume: jest.fn(() => 1),
      isWebAudio: true,
    };

    return createSound(opts).then(() => {
      expect(createWebAudioSound).toBeCalledTimes(1);
      expect(createWebAudioSound).toBeCalledWith(opts);
      expect(createHtmlAudioSound).toBeCalledTimes(1);
      expect(createHtmlAudioSound).toBeCalledWith(opts);
  
      console.warn = warn;
    });
  });

  it('Rejects if the call to createHtmlAudioSound fails.', () => {
    const warn = console.warn;
    console.warn = jest.fn();
    const error = console.error;
    console.error = jest.fn();

    const opts = {
      url: 'foobar',
      getManagerVolume: jest.fn(() => 1),
      isWebAudio: true,
    };

    (createWebAudioSound as any).mockReturnValue(Promise.reject());
    (createHtmlAudioSound as any).mockReturnValue(Promise.reject(true));

    return expect(new Promise((
      // @ts-ignore
      resolve,
      reject,
    ) => {
      createSound(opts).catch(() => {
        console.warn = warn;
        console.error = error;

        return reject(true);
      });
    })).rejects.toBe(true);
  });
});
