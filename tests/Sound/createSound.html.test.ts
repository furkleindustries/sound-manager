import {
  createSound,
} from '../../src/Sound/createSound';

jest.mock('../../src/Sound/createHtmlHelper');
import {
  createHtmlHelper,
} from '../../src/Sound/createHtmlHelper';

jest.mock('../../src/functions/getFrozenObject');
import {
  getFrozenObject,
} from '../../src/functions/getFrozenObject';

const getOpts = () => ({
  getManagerVolume: jest.fn(() => 1),
  isWebAudio: false,
  url: 'foobar',
});

describe('createSound HTML5 Audio unit tests.', () => {
  beforeEach(() => {
    (createHtmlHelper as any).mockClear();
    (getFrozenObject as any).mockClear();
    (getFrozenObject as any).mockImplementation((aa: any) => aa);
  });

  it('Throws if no options argument is provided.', () => {
    // @ts-ignore
    const func = () => createSound();

    expect(func).toThrow();
  });

  it('Freezes the options argument.', () => {
    const opts = getOpts();
    createSound(opts);

    expect(getFrozenObject).toBeCalledTimes(1);
    expect(getFrozenObject).toBeCalledWith(opts);
  });

  it('Calls createHtmlHelper.', () => {
    const opts = getOpts();
    createSound(opts);

    expect(createHtmlHelper).toBeCalledTimes(1);
    expect(createHtmlHelper).toBeCalledWith(opts);
  });
});
