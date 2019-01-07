import {
  createSound,
} from '../../src/Sound/createSound';

import {
  createHtmlAudioSound,
} from '../../src/Sound/createHtmlAudioSound';
jest.mock('../../src/Sound/createHtmlAudioSound');

console.warn = jest.fn();

describe('createSound HTML5 Audio unit tests.', () => {
  beforeEach(() => {
    (createHtmlAudioSound as any).mockClear();
  });

  it('Throws if no options argument is provided.', () => {
    // @ts-ignore
    const func = () => createSound();

    expect(func).toThrow();
  });

  it('Outputs a promise.', () => {
    (createHtmlAudioSound as any).mockReturnValue(Promise.resolve());

    expect(createSound({
      url: 'foobar',
      getManagerVolume: jest.fn(() => 1),
      isWebAudio: false,
    })).toBeInstanceOf(Promise);
  });

  it('Calls createHtmlAudioSound with the provided options if the manager is in HTML Audio mode.', () => {
    (createHtmlAudioSound as any).mockReturnValue(Promise.resolve());

    const opts = {
      url: 'foobar',
      getManagerVolume: jest.fn(() => 1),
      isWebAudio: false,
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
      getManagerVolume: jest.fn(() => 1),
      isWebAudio: false,
    };

    return expect(createSound(opts)).resolves.toBe(val);
  });

  it('Rejects if createHtmlAudioSound does.', () => {
    const val = 'foo';
    (createHtmlAudioSound as any).mockReturnValue(Promise.reject(val));

    const opts = {
      url: 'foobar',
      getManagerVolume: jest.fn(() => 1),
      isWebAudio: false,
    };

    return expect(createSound(opts)).rejects.toBeTruthy();
  });
});
