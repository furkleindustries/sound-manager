import {
  createHtmlAudioSound,
  strings,
} from '../../src/Sound/createHtmlAudioSound';

import {
  getFrozenObject,
} from '../../src/functions/getFrozenObject';
jest.mock('../../src/functions/getFrozenObject');
import {
  Sound,
} from '../../src/Sound/Sound';
jest.mock('../../src/Sound/Sound');

describe('createHtmlAudioSound unit tests.', () => {
  beforeEach(() => {
    (getFrozenObject as any).mockClear();
    (getFrozenObject as any).mockImplementation((aa: any) => aa);
    (Sound as any).mockClear();
  });

  it('Throws if the options argument is not provided.', async () => {
    expect.assertions(1);
    try {
      // @ts-ignore
      await createHtmlAudioSound();
    } catch (err) {
      expect(err.message).toBe(strings.OPTIONS_INVALID);
    }
  });

  it('Throws if the url is not provided.', async () => {
    expect.assertions(1);
    try {
      // @ts-ignore
      await createHtmlAudioSound({});
    } catch (err) {
      expect(err.message).toBe(strings.URL_INVALID);
    }
  });

  it('Throws if the getManagerVolume function is not provided.', async () => {
    expect.assertions(1);
    try {
      // @ts-ignore
      await createHtmlAudioSound({ url: 'foobar' });
    } catch (err) {
      expect(err.message).toBe(strings.GET_MANAGER_VOLUME_INVALID);
    }
  });

  it('Generates a new Audio element with the src set to the url argument.', async () => {
    expect.assertions(1);
    const url = 'https://foo.bar/fooobar';
    await createHtmlAudioSound({
      url,
      getManagerVolume: jest.fn(() => 1),
    } as any);

    expect((Sound as any).mock.calls[0][0].audioElement.src).toBe(url);
  });

  it('Sets the audio element to preload=auto.', async () => {
    expect.assertions(1);
    await createHtmlAudioSound({
      url: 'foobar',
      getManagerVolume: jest.fn(() => 1),
    } as any);

    expect((Sound as any).mock.calls[0][0].audioElement.preload).toBe('auto');
  });

  it('Merges options in and passes them to the Sound constructor.', async () => {
    const opts = {
      url: 'foobar',
      getManagerVolume: jest.fn(() => 1),
    } as any;

    await createHtmlAudioSound(opts);

    expect((Sound as any).mock.calls[0][0]).toMatchObject(opts);
  });
});
