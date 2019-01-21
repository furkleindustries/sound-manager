import {
  generateVolumeInputComponent,
  strings,
} from "../../src/Manager/generateVolumeInputComponent";

describe('generateVolumeInputComponent unit tests.', () => {
  it('Throws if the node argument is not provided.', () => {
    expect(generateVolumeInputComponent).toThrow(strings.NODE_INVALID);
  });

  it('Throws if the uniqueId argument is not provided.', () => {
    // @ts-ignore
    const func = () => generateVolumeInputComponent({});
    expect(func).toThrow(strings.UNIQUE_ID_INVALID);
  });

  it('Returns an input element.', () => {
    const elem = generateVolumeInputComponent({ getVolume: jest.fn() } as any, 'foo');
    expect(elem).toBeInstanceOf(HTMLInputElement);
  });

  it('Sets the id of the returned element to the uniqueId argument.', () => {
    const uniqueId = 'foo';
    const elem = generateVolumeInputComponent({ getVolume: jest.fn() } as any, uniqueId);
    expect(elem.id).toBe(uniqueId);
  });

  it('Sets the value of the returned element to the result of the node\'s getVolume method.', () => {
    const volume = 0.6;
    const elem = generateVolumeInputComponent({
      getVolume: jest.fn(() => volume) } as any,
      'foo',
    );

    expect(elem.value).toBe(String(volume));
  });

  it('Sets the min of the returned element to 0.', () => {
    const elem = generateVolumeInputComponent({ getVolume: jest.fn() } as any, 'foo');
    expect(elem.min).toBe('0');
  });

  it('Sets the max of the returned element to 0.', () => {
    const elem = generateVolumeInputComponent({ getVolume: jest.fn() } as any, 'foo');
    expect(elem.max).toBe('1');
  });

  it('Sets the step of the returned element to 0.01.', () => {
    const elem = generateVolumeInputComponent({ getVolume: jest.fn() } as any, 'foo');
    expect(elem.step).toBe('0.01');
  });
});
