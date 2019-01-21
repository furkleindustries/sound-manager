import {
  generateVolumeLabelComponent,
  strings,
} from '../../src/Manager/generateVolumeLabelComponent';
import { NodeTypes } from '../../src/enums/NodeTypes';

describe('generateVolumeLabelComponent unit tests.', () => {
  it('Throws if the node argument is not provided.', () => {
    expect(generateVolumeLabelComponent).toThrow(strings.NODE_INVALID);
  });

  it('Throws if the node does not have a type property.', () => {
    // @ts-ignore
    const func = () => generateVolumeLabelComponent({});
    expect(func).toThrow(strings.NODE_TYPE_INVALID);
  });

  it('Throws if the uniqueId argument is not provided.', () => {
    // @ts-ignore
    const func = () => generateVolumeLabelComponent({ type: 'fdsfd' });
    expect(func).toThrow(strings.UNIQUE_ID_INVALID);
  });

  it('Returns a label element.', () => {
    const label = generateVolumeLabelComponent(
      { type: NodeTypes.Manager } as any,
      'foobar',
    );

    expect(label).toBeInstanceOf(HTMLLabelElement);
  });

  it('Returns an element with the class sm-volumeInput-label.', () => {
    const label = generateVolumeLabelComponent(
      { type: NodeTypes.Manager } as any,
      'foobar',
    );

    expect(label.classList.contains('sm-volumeInput-label')).toBe(true);
  });

  it('Returns an element with the for attribute set to the uniqueId argument.', () => {
    const uniqueId = 'foobar';
    const label = generateVolumeLabelComponent(
      { type: NodeTypes.Manager } as any,
      uniqueId,
    );

    expect(label.getAttribute('for')).toBe(uniqueId);
  });

  it('Throws if the node type is Group and the name is not provided.', () => {
    const uniqueId = 'foobar';
    const func = () => (
      generateVolumeLabelComponent(
        { type: NodeTypes.Group } as any,
        uniqueId,
      )
    );

    expect(func).toThrow(strings.NAME_INVALID);
  });

  it('Throws if the node type is Sound and the name is not provided.', () => {
    const uniqueId = 'foobar';
    const func = () => (
      generateVolumeLabelComponent(
        { type: NodeTypes.Sound } as any,
        uniqueId,
      )
    );

    expect(func).toThrow(strings.NAME_INVALID);
  });

  it('Sets the text content of the returned element to the first-letter capitalized form if the node is a Group.', () => {
    const uniqueId = 'foobar';
    const name = 'sui fjkdf ow l ks';
    const label = generateVolumeLabelComponent(
      { type: NodeTypes.Group } as any,
      uniqueId,
      name,
    );

    expect(label.textContent).toBe(
      `${name[0].toUpperCase()}${name.slice(1)}`
    );
  });

  it('Sets the text content of the returned element to the first-letter capitalized form if the node is a Sound.', () => {
    const uniqueId = 'foobar';
    const name = 'sui fjkdf ow l ks';
    const label = generateVolumeLabelComponent(
      { type: NodeTypes.Sound } as any,
      uniqueId,
      name,
    );

    expect(label.textContent).toBe(
      `${name[0].toUpperCase()}${name.slice(1)}`
    );
  });

  it('Sets the text content of the returned element to the first-letter capitalized form if the node is a Manager and the name is provided.', () => {
    const uniqueId = 'foobar';
    const name = 'sui fjkdf ow l ks';
    const label = generateVolumeLabelComponent(
      { type: NodeTypes.Manager } as any,
      uniqueId,
      name,
    );

    expect(label.textContent).toBe(
      `${name[0].toUpperCase()}${name.slice(1)}`
    );
  });

  it('Sets the text content of the returned element to "Master volume" if the node is a Manager and no name is provided.', () => {
    const uniqueId = 'foobar';
    const label = generateVolumeLabelComponent(
      { type: NodeTypes.Manager } as any,
      uniqueId,
    );

    expect(label.textContent).toBe('Master volume');
  });
});
