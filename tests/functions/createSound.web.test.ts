import {
  createSound,
} from '../../src/functions/createSound';

import {
  createHtmlAudioSound,
} from '../../src/functions/createHtmlAudioSound';
jest.mock('../../src/functions/createHtmlAudioSound');

import {
  createWebAudioSound,
} from '../../src/functions/createWebAudioSound';
jest.mock('../../src/functions/createWebAudioSound');

const testManagerFactory = () => ({
  isWebAudio: jest.fn(() => true),
} as any);

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

  it('Throws if the manager is not included in the options argument.', () => {
    // @ts-ignore
    const func = () => createSound({});

    expect(func).toThrow();
  });

  it('Outputs a promise.', () => {
    expect(createSound({
      url: 'foobar',
      manager: testManagerFactory(),
    })).toBeInstanceOf(Promise);
  });

  it('Calls createWebAudioSound with the provided options if the manager is in Web Audio mode.', () => {
    const opts = {
      url: 'foobar',
      manager: testManagerFactory(),
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
      manager: testManagerFactory(),
    };

    return expect(createSound(opts)).resolves.toBe(sym);
  });

  it('Calls createHtmlAudioSound with the provided options if the call to createWebAudioSound fails.', () => {
    expect.assertions(4);
    
    const warn = console.warn;
    console.warn = jest.fn();

    (createWebAudioSound as any).mockReturnValue(Promise.reject());
    (createHtmlAudioSound as any).mockReturnValue(Promise.resolve());

    const opts = {
      url: 'fdsjkfds',
      manager: testManagerFactory(),
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
      url: 'fdsjkfds',
      manager: testManagerFactory(),
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
