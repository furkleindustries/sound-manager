import {
  generateAudioComponent,
  strings,
} from '../../src/functions/generateAudioComponent';
import {
  NodeTypes,
} from '../../src/enums/NodeTypes';

describe('generateAudioComponent unit tests.', () => {
  it('Throws if the node argument is not provided.', () => {
    // @ts-ignore
    const func = generateAudioComponent;
    expect(func).toThrow(strings.NODE_INVALID);
  });

  it('Creates a div ', () => {

  });
});
