import {
  deepFlattenArray,
} from '../../src/functions/deepFlattenArray';

describe('deepFlattenArray integration tests.', () => {
  it('Returns a flat array unchanged.', () => {
    const arr = [ 1, 'foo', {}, ];
    expect(deepFlattenArray(arr)).toEqual(arr);
  });

  it('Flattens depth 1 arrays properly.', () => {
    const arr = [
      2,
      [ 'foobart' ],
      [ 'buzbart' ],
      [],
      [ 15 ],
    ];

    expect(deepFlattenArray(arr)).toEqual([
      2,
      'foobart',
      'buzbart',
      15,
    ]);
  });

  it('Flattens depth 2 arrays properly.', () => {
    const arr = [
      2,
      [
        [ 'foobart' ],
      ],
      [
        [
          'buzbart',
          'weird',
        ]
      ],
      [ 'bax' ],
      [ 15 ],
    ];

    expect(deepFlattenArray(arr)).toEqual([
      2,
      'foobart',
      'buzbart',
      'weird',
      'bax',
      15,
    ]);
  });

  it('Flattens depth 3 arrays properly.', () => {
    const arr = [
      2,
      [
        [
          [ 'foobart' ],
        ],
      ],
      [
        [
          [ 'buzbart' ],
          'weird',
        ]
      ],
      [ 'bax' ],
      [
        [
          'quux',
          'binx',
        ],
      ],
      [ 15 ],
    ];

    expect(deepFlattenArray(arr)).toEqual([
      2,
      'foobart',
      'buzbart',
      'weird',
      'bax',
      'quux',
      'binx',
      15,
    ]);
  });
});
