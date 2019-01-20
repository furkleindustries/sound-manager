import {
  doToOneOrMany,
} from '../../src/functions/doToOneOrMany';

import {
  doToMany,
} from '../../src/functions/doToMany';
jest.mock('../../src/functions/doToMany');
import {
  doToOne,
} from '../../src/functions/doToOne';
jest.mock('../../src/functions/doToOne');

describe('doToOneOrMany unit tests.', () => {
  beforeEach(() => {
    (doToMany as any).mockClear();
    (doToOne as any).mockClear();
  });

  it('Calls doToMany with the provided arguments if propOrProps is an array.', () => {
    const collection = {};
    const propOrProps = [ 'foo' ];
    const functionName = 'foobar';
    const argOne = 1;
    const argTwo = 2;
    doToOneOrMany(collection, propOrProps, functionName, argOne, argTwo);

    expect(doToMany).toBeCalledTimes(1);
    expect(doToMany).toBeCalledWith(collection, propOrProps, 'foobar', argOne, argTwo);
  });

  it('Calls doToOne with the provided arguments if propOrProps is an array.', () => {
    const collection = {};
    const propOrProps = 'foo';
    const functionName = 'foobar';
    const argOne = 1;
    const argTwo = 2;
    doToOneOrMany(collection, propOrProps, functionName, argOne, argTwo);

    expect(doToOne).toBeCalledTimes(1);
    expect(doToOne).toBeCalledWith(collection, propOrProps, 'foobar', argOne, argTwo);
  });
});
