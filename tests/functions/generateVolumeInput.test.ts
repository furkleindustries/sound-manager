import {
  generateVolumeInput,
} from '../../src/functions/generateVolumeInput';
import {
  NodeTypes,
} from '../../src/enums/NodeTypes';

describe('generateVolumeInput unit tests.', () => {
  it('Outputs a div with the classes sm-volumeInput-container and sm-volumeInput-container-${nodeName}.', () => {
    const node = {
      type: NodeTypes.Manager,
      getVolume: jest.fn(() => 1),
    } as any;

    const container = generateVolumeInput(node);

    expect(container).toBeInstanceOf(HTMLDivElement);
    expect(container.classList.contains('sm-volumeInput-container')).toBe(true);
    expect(container.classList.contains('sm-volumeInput-container-manager')).toBe(true);
  });

  it('Has an output element with a label child with the class sm-volumeInput-label.', () => {
    const node = {
      getVolume: jest.fn(),
      type: NodeTypes.Sound,
    } as any;

    const name = 'fikfds';
    const container = generateVolumeInput(node, name);
    const label = container.querySelector('label') as HTMLLabelElement;

    expect(label).toBeInstanceOf(HTMLLabelElement);
    expect(label.classList.contains('sm-volumeInput-label')).toBe(true);
  });

  it('Has an output element with an input child with the class sm-volumeInput-input and a computed unique id.', () => {
    const type = NodeTypes.Sound;
    const node = {
      getVolume: jest.fn(),
      type,
    } as any;

    const name = 'testname';

    const container = generateVolumeInput(node, name);
    const input = container.querySelector('input') as HTMLInputElement;

    expect(input).toBeInstanceOf(HTMLInputElement);
    expect(input.classList.contains('sm-volumeInput-input')).toBe(true);
    expect(input.id).toBe(`sm-volumeInput-${type}-${name}`);
  });

  it('Throws if the nodeType is Group or Sound but there is no name provided.', () => {
    const node = {
      type: NodeTypes.Group,
    } as any;

    const func = () => generateVolumeInput(node);

    expect(func).toThrow();
  });

  it('Sets the label\'s textContent to first-letter capitalized form of the provided name if the node is a Sound.', () => {
    const node = {
      getVolume: jest.fn(),
      type: NodeTypes.Sound,
    } as any;

    const name = 'foobarbazbnux';

    const container = generateVolumeInput(node, name);
    const label = container.querySelector('label') as HTMLLabelElement;
    
    expect(label.textContent).toBe(name[0].toUpperCase() + name.slice(1));
  });

  it('Sets the label\'s textContent to first-letter capitalized form of the provided name if the node is a Group.', () => {
    const node = {
      getVolume: jest.fn(),
      type: NodeTypes.Group,
    } as any;

    const name = 'foobarbazbnux';

    const container = generateVolumeInput(node, name);
    const label = container.querySelector('label') as HTMLLabelElement;
    
    expect(label.textContent).toBe(name[0].toUpperCase() + name.slice(1));
  });

  it('Sets the label\'s textContent to first-letter capitalized form of the provided name if the node is a Manager.', () => {
    const node = {
      getVolume: jest.fn(),
      type: NodeTypes.Manager,
    } as any;

    const name = 'foobarbazbnux';

    const container = generateVolumeInput(node, name);
    const label = container.querySelector('label') as HTMLLabelElement;
    
    expect(label.textContent).toBe(name[0].toUpperCase() + name.slice(1));
  });

  it('Sets the label\'s textContent to "Master volume" when the provided node is a Manager and no name is provided.', () => {
    const node = {
      getVolume: jest.fn(),
      type: NodeTypes.Manager,
    } as any;

    const container = generateVolumeInput(node);
    const label = container.querySelector('label') as HTMLLabelElement;

    expect(label.textContent).toBe('Master volume');
  });

  it('Computes a unique id from a random hex number if the node is a Manager.', () => {
    const node = {
      getVolume: jest.fn(),
      type: NodeTypes.Manager,
    } as any;

    const container = generateVolumeInput(node);
    const input = container.querySelector('input') as HTMLInputElement;

    expect(/sm-volumeInput-manager-[0-9A-Fa-f]+/.test(input.id)).toBe(true);
  });

  it('Sets the input value to the stringified result of node.getVolume().', () => {
    const volume = 0.544;
    const node = {
      getVolume: jest.fn(() => volume),
      type: NodeTypes.Group,
    } as any;

    const container = generateVolumeInput(node, 'foobar');
    const input = container.querySelector('input') as HTMLInputElement;

    expect(input.value).toBe(String(volume));
  });
});
