import {
  createHtmlHelper,
  strings,
} from '../../src/Sound/createHtmlHelper';

import {
  createHtmlAudioSound,
} from '../../src/Sound/createHtmlAudioSound';
jest.mock('../../src/Sound/createHtmlAudioSound');
import {
  getFrozenObject,
} from '../../src/functions/getFrozenObject';
jest.mock('../../src/functions/getFrozenObject');

describe('createHtmlHelper unit tests.', () => {
  const retSym = Symbol('Resolved value');

  beforeEach(() => {
    (createHtmlAudioSound as any).mockClear();
    (createHtmlAudioSound as any).mockReturnValue(retSym);
    (getFrozenObject as any).mockClear();
    (getFrozenObject as any).mockImplementation((aa: any) => aa);
  });

  it('Passes the options argument to getFrozenObject and then to createHtmlAudioSound.', () => {
    const opts: any = Symbol('opts');
    createHtmlHelper(opts);

    expect(getFrozenObject).toBeCalledTimes(1);
    expect(getFrozenObject).toBeCalledWith(opts);
    expect(createHtmlAudioSound).toBeCalledTimes(1);
    expect(createHtmlAudioSound).toBeCalledWith(opts);
  });

  it('Returns the return value of createHtmlAudioSound.', async () => {
    expect(await createHtmlHelper({} as any)).toBe(retSym);
  });

  it('Throws if createHtmlAudioSound does.', async () => {
    expect.assertions(1);
    const err = new Error('foo bar baz');
    (createHtmlAudioSound as any).mockImplementation(() => { throw err; });

    try {
      await createHtmlHelper({} as any);
    } catch (__err) {
      expect(__err).toEqual(
        new Error(`${strings.HTML_AUDIO_FAILED}\n${err}`)
      );
    }
  });
});
