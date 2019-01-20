import {
  assertNodeIsHtmlAudio,
  strings,
} from '../../src/assertions/assertNodeIsHtmlAudio';

const assertions = require('ts-assertions');
const assertSpy = jest.spyOn(assertions, 'assert');

describe('assertNodeIsHtmlAudio unit tests.', () => {
  beforeEach(() => {
    (assertSpy as any).mockClear();
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

  it('Passes the custom method name to assert.', () => {
    const methodName = 'isWebAudio';
    // @ts-ignore
    const func = () => assertNodeIsHtmlAudio(
      { isWebAudio: jest.fn(() => true) } as any,
      methodName,
    );

    expect(func).toThrow(
      strings.ASSERTION_FAILURE
        .replace('%METHOD_NAME%', methodName)
        .replace('%NODE_TYPE%', 'undefined')
    );
  });

  it('Passes the node type to assert.', () => {
    const type = 'type';
    // @ts-ignore
    const func = () => assertNodeIsHtmlAudio(
      {
        type,
        isWebAudio: jest.fn(() => true),
      } as any,
    );

    expect(func).toThrow(
      strings.ASSERTION_FAILURE
        .replace('%METHOD_NAME%', '(not provided)')
        .replace('%NODE_TYPE%', type)
    );
  });

  it('Returns true if the node is not in Web Audio mode.', () => {
    expect(assertNodeIsHtmlAudio({ isWebAudio: jest.fn() } as any)).toBe(true);
  });
});
