import {
  doToOne,
  strings,
} from '../../src/functions/doToOne';

describe('doToOne unit tests.', () => {
  it('Throws if the collection is not provided.', () => {
    // @ts-ignore
    const func = () => doToOne();
    expect(func).toThrow(strings.COLLECTION_INVALID);
  });

  it('Throws if the propName is not provided.', () => {
    // @ts-ignore
    const func = () => doToOne({});
    expect(func).toThrow(strings.PROP_NAME_INVALID);
  });

  it('Throws if the functionName is not provided.', () => {
    // @ts-ignore
    const func = () => doToOne({}, 'foo');
    expect(func).toThrow(strings.FUNCTION_NAME_INVALID);
  });

  it('Throws if collection[propName] does not exist.', () => {
    // @ts-ignore
    const func = () => doToOne({ foo: false }, 'foo', 'bar');
      expect(func).toThrow(strings.COLLECTION_PROP_NAME_INVALID);
    });

  it('Throws if collection[propName][functionName] is not of type function.', () => {
    const func = () => (
      doToOne(
        {
          foo: { bar: false },
        } as any,
        'foo',
        // @ts-ignore
        'bar',
      )
    );

    expect(func).toThrow(strings.FUNCTION_INVALID);
  });

  it('Calls the correct function.', () => {
    const mockOne = jest.fn();
    const mockTwo = jest.fn();
    const propName = 'foo';
    const functionName = 'bar';
    const argOne = 1;
    const argTwo = 2;
    const collection = {
      [propName]: {
        [functionName]: mockOne,
        dskfjds: mockTwo,
      },
    };

    doToOne(collection, propName, functionName, argOne, argTwo);

    expect(mockOne).toBeCalledTimes(1);
    expect(mockOne).toBeCalledWith(argOne, argTwo);
  });
});
