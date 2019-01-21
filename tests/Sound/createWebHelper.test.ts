import {
  createWebHelper,
  strings,
} from '../../src/Sound/createWebHelper';

import {
  createHtmlHelper,
} from '../../src/Sound/createHtmlHelper';
jest.mock('../../src/Sound/createHtmlHelper');
import {
  createWebAudioSound,
} from '../../src/Sound/createWebAudioSound';
jest.mock('../../src/Sound/createWebAudioSound');
import {
  getFrozenObject,
} from '../../src/functions/getFrozenObject';
jest.mock('../../src/functions/getFrozenObject');
import {
  warn,
} from '../../src/logging/warn';
jest.mock('../../src/logging/warn');

describe('createWebHelper unit tests.', () => {
  const htmlRetSym = Symbol('Resolved html value');
  const webRetSym = Symbol('Resolved web value');

  beforeEach(() => {
    (createHtmlHelper as any).mockClear();
    (createHtmlHelper as any).mockReturnValue(htmlRetSym);
    (createWebAudioSound as any).mockClear();
    (createWebAudioSound as any).mockReturnValue(webRetSym);
    (getFrozenObject as any).mockClear();
    (getFrozenObject as any).mockImplementation((aa: any) => aa);
    (warn as any).mockClear();
  });

  it('Passes the options to getFrozenObject, then to createWebAudioSound.', () => {
    const opts = Symbol('options') as any;
    createWebHelper(opts);

    expect(getFrozenObject).toBeCalledTimes(1);
    expect(getFrozenObject).toBeCalledWith(opts);
    expect(createWebAudioSound).toBeCalledTimes(1);
    expect(createWebAudioSound).toBeCalledWith(opts);
  });

  it('Returns the result of createWebAudioSound if it resolves.', async () => {
    expect(await createWebHelper({} as any)).toBe(webRetSym);
  });

  it('Warns if createWebAudioSound fails.', async () => {
    expect.assertions(2);
    const err = new Error('bux quux');
    (createWebAudioSound as any).mockImplementation(() => { throw err; });
    await createWebHelper({} as any);
    
    expect(warn).toBeCalledTimes(1);
    expect(warn).toBeCalledWith(`${strings.WEB_AUDIO_FAILED}\n${err}`);
  });

  it('Returns the value of createHtmlHelper if createWebAudioSound rejects and createHtmlHelper resolves.', async () => {
    (createWebAudioSound as any).mockImplementation(() => { throw new Error(); });
    expect(await createWebHelper({} as any)).toBe(htmlRetSym);
  });

  it('Throws if both createWebAudioSound and createHtmlHelper reject.', async () => {
    expect.assertions(1);
    const err = new Error('bux quux');
    (createWebAudioSound as any).mockImplementation(() => { throw new Error(); });
    (createHtmlHelper as any).mockImplementation(() => { throw err; });

    try {
      await createWebHelper({} as any);
    } catch (__err) {
      expect(__err).toEqual(
        new Error(`${strings.BOTH_FAILED}\n${err}`)
      );
    }
  });
});
