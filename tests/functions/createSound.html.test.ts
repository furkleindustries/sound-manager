import {
  createSound,
} from '../../src/functions/createSound';

import {
  createHtmlAudioSound,
} from '../../src/functions/createHtmlAudioSound';
jest.mock('../../src/functions/createHtmlAudioSound');

console.log = jest.fn();

const testManagerFactory = () => ({
  isWebAudio: jest.fn(() => false),
} as any);

describe('createSound HTML5 Audio unit tests.', () => {
  beforeEach(() => {
    (createHtmlAudioSound as any).mockClear();
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
    (createHtmlAudioSound as any).mockReturnValue(Promise.resolve());

    expect(createSound({
      url: 'foobar',
      manager: testManagerFactory(),
    })).toBeInstanceOf(Promise);
  });

  it('Calls createHtmlAudioSound with the provided options if the manager is in HTML Audio mode.', () => {
    (createHtmlAudioSound as any).mockReturnValue(Promise.resolve());

    const opts = {
      url: 'foobar',
      manager: testManagerFactory(),
    };

    createSound(opts);

    expect(createHtmlAudioSound).toBeCalledTimes(1);
    expect(createHtmlAudioSound).toBeCalledWith(opts);
  });

  it('Resolves if createHtmlAudioSound does.', () => {
    const val = 'foo';
    (createHtmlAudioSound as any).mockReturnValue(Promise.resolve(val));

    const opts = {
      url: 'foobar',
      manager: testManagerFactory(),
    };

    return expect(createSound(opts)).resolves.toBe(val);
  });

  it('Rejects if createHtmlAudioSound does.', () => {
    const val = 'foo';
    (createHtmlAudioSound as any).mockReturnValue(Promise.reject(val));

    const opts = {
      url: 'foobar',
      manager: testManagerFactory(),
    };

    return expect(createSound(opts)).rejects.toBeTruthy();
  });
});
