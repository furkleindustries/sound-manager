import {
  generateUniqueAudioPanelIdentifier,
  strings,
} from '../../src/Manager/generateUniqueAudioPanelIdentifier';
import {
  NodeTypes,
} from '../../src/enums/NodeTypes';

describe('generateUniqueAudioPanelIdentifier unit tests.', () => {
  it('Throws if the node argument is not provided.', () => {
    const func = generateUniqueAudioPanelIdentifier;
    expect(func).toThrow(strings.NODE_INVALID);
  });

  it('Throws if the node argument has no type property.', () => {
    const func = () => generateUniqueAudioPanelIdentifier({} as any);
    expect(func).toThrow(strings.NODE_TYPE_INVALID);
  });

  it('Returns an identifier computed from a random series of hex digits if the node type is Manager and no name is provided.', () => {
    const type = NodeTypes.Manager;
    const val = generateUniqueAudioPanelIdentifier({ type } as any);
    expect(val.startsWith(`sm-volumeInput-${type}-`)).toBe(true);
    expect(/[0-9a-f]+$/i.test(val)).toBe(true);
  });

  it('Returns an identifier computed from a name if node type is Manager and a name is provided.', () => {
    const type = NodeTypes.Manager;
    const name = 'foobar';
    const val = generateUniqueAudioPanelIdentifier({ type } as any, name);
    expect(val).toBe(`sm-volumeInput-${type}-${name}`);
  });

  it('Returns an identifier computed from a name if node type is not Manager.', () => {
    const type = NodeTypes.Group;
    const name = 'foobar';
    const val = generateUniqueAudioPanelIdentifier({ type } as any, name);
    expect(val).toBe(`sm-volumeInput-${type}-${name}`);
  });

  it('Throws if the node type is not Manager and the name argument is not present.', () => {
    const type = NodeTypes.Group;
    const func = () => generateUniqueAudioPanelIdentifier({ type } as any);
    expect(func).toThrow(strings.NAME_INVALID);
  });
});
