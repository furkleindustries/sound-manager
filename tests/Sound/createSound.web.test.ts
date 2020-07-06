import {
  createSound,
} from '../../src/Sound/createSound';

import {
  createWebHelper,
} from '../../src/Sound/createWebHelper';
jest.mock('../../src/Sound/createWebHelper');

import {
  getFrozenObject,
} from '../../src/functions/getFrozenObject';
jest.mock('../../src/functions/getFrozenObject');

const getOpts = () => ({
  context: {} as any,
  getManagerVolume: jest.fn(() => 1),
  isWebAudio: true,
  url: 'foobar',
});

describe('createSound Web Audio unit tests.', () => {
  beforeEach(() => {
    (createWebHelper as any).mockClear();
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

  it('Calls createWebHelper.', () => {
    const opts = getOpts();
    createSound(opts);

    expect(createWebHelper).toBeCalledTimes(1);
    expect(createWebHelper).toBeCalledWith(opts);
  });
});
