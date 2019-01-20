import {
  assertNodeIsHtmlAudio,
  strings,
} from '../../src/assertions/assertNodeIsHtmlAudio';

import {
  assert,
} from 'ts-assertions';
jest.mock('ts-assertions');

describe('assertNodeIsHtmlAudio unit tests.', () => {
  beforeEach(() => {
    (assert as any).mockClear();
  });

  it('Throws if the node is not provided.', () => {
    const func = assertNodeIsHtmlAudio;
    expect(func).toThrow(strings.NODE_INVALID);
  });

  it('Throws if the node is in Web Audio mode.', () => {
    // @ts-ignore
    const func = () => assertNodeIsHtmlAudio(
      { isWebAudio: jest.fn(() => true) } as any,
    );

    expect(func).toThrow(
      strings.ASSERTION_FAILURE
        .replace('%METHOD_NAME%', '(not provided)')
        .replace('%NODE_TYPE%', 'undefined')
    );
  });
});
