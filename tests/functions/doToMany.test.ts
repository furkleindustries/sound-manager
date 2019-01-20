import {
  doToMany,
} from '../../src/functions/doToMany';

import {
  doToOne,
} from '../../src/functions/doToOne';
jest.mock('../../src/functions/doToOne');

describe('doToMany unit tests.', () => {
  beforeEach(() => {
    (doToOne as any).mockClear();
  });

  it('Calls doToOne on each of the items in the propNames argument and passes remaining arguments.', () => {
    const collection = Symbol('collection') as any;
    const propNames = [ 'foo', 'bar', 'baz', ];
    const functionName = 'func';
    const argOne = 1;
    const argTwo = 2;
    doToMany(collection, propNames, functionName, argOne, argTwo);

    expect(doToOne).toBeCalledTimes(propNames.length);
    propNames.forEach((name) => {
      expect(doToOne).toBeCalledWith(
        collection,
        name,
        functionName,
        argOne,
        argTwo
      );
    })
  });
});
