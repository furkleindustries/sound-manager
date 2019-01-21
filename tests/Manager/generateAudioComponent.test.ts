import {
  generateAudioComponent,
  strings,
} from '../../src/Manager/generateAudioComponent';

import {
  generateUniqueAudioPanelIdentifier,
} from '../../src/Manager/generateUniqueAudioPanelIdentifier';
jest.mock('../../src/Manager/generateUniqueAudioPanelIdentifier');
import {
  generateVolumeInputComponent,
} from '../../src/Manager/generateVolumeInputComponent';
jest.mock('../../src/Manager/generateVolumeInputComponent');
import {
  generateVolumeLabelComponent,
} from '../../src/Manager/generateVolumeLabelComponent';
jest.mock('../../src/Manager/generateVolumeLabelComponent');
import {
  generateVolumeLevelVisualizerComponent,
} from '../../src/Manager/generateVolumeLevelVisualizerComponent';
jest.mock('../../src/Manager/generateVolumeLevelVisualizerComponent');

describe('generateAudioComponent unit tests.', () => {
  beforeEach(() => {
    (generateUniqueAudioPanelIdentifier as any).mockClear();
    (generateVolumeInputComponent as any).mockClear();
    (generateVolumeInputComponent as any).mockReturnValue(document.createElement('input'));
    (generateVolumeLabelComponent as any).mockClear();
    (generateVolumeLabelComponent as any).mockReturnValue(document.createElement('label'));
    (generateVolumeLevelVisualizerComponent as any).mockClear();
    (generateVolumeLevelVisualizerComponent as any).mockReturnValue(document.createElement('canvas'));
  });

  it('Throws if the node argument is not provided.', () => {
    // @ts-ignore
    const func = generateAudioComponent;
    expect(func).toThrow(strings.NODE_INVALID);
  });

  it('Throws if the node argument does not have a type property.', () => {
    // @ts-ignore
    const func = () => generateAudioComponent({} as any);
    expect(func).toThrow(strings.NODE_TYPE_INVALID);
  });

  it('Returns a div.', () => {
    const node = {
      isWebAudio: jest.fn(),
      type: 'foo',
    } as any;

    expect(generateAudioComponent(node)).toBeInstanceOf(HTMLDivElement);
  });

  it('Adds the correct class names to the returned div.', () => {
    const type = 'foo';
    const node = {
      type,
      isWebAudio: jest.fn(),
    } as any;

    const div = generateAudioComponent(node);
    expect(div.classList.contains('sm-volumeInput-container')).toBe(true);
    expect(div.classList.contains(`sm-volumeInput-container-${type}`)).toBe(true);
  });

  it('Passes the arguments to generateUniqueAudioPanelIdentifier.', () => {
    const node = {
      isWebAudio: jest.fn(),
      type: 'foo',
    } as any;
    
    const name = 'foobar';

    generateAudioComponent(node, name);

    expect(generateUniqueAudioPanelIdentifier).toBeCalledTimes(1);
    expect(generateUniqueAudioPanelIdentifier).toBeCalledWith(node, name);
  });

  it('Passes the result of generateUniqueAudioPanelIdentifier along with other arguments to generateVolumeLabelComponent.', () => {
    const val = 'value';
    (generateUniqueAudioPanelIdentifier as any).mockReturnValue(val);

    const node = {
      isWebAudio: jest.fn(),
      type: 'foo',
    } as any;

    const name = 'foobar';

    generateAudioComponent(node, name);

    expect(generateVolumeLabelComponent).toBeCalledTimes(1);
    expect(generateVolumeLabelComponent).toBeCalledWith(node, val, name);
  });

  it('Appends the result of generateVolumeLabelComponent to the container.', () => {
    const val = document.createElement('label');
    (generateVolumeLabelComponent as any).mockReturnValue(val);

    const node = {
      isWebAudio: jest.fn(),
      type: 'foo',
    } as any;

    const name = 'foobar';

    const container = generateAudioComponent(node, name);

    expect(container.contains(val)).toBe(true);
  });

  it('Passes the result of generateUniqueAudioPanelIdentifier along with other arguments to generateVolumeInputComponent.', () => {
    const val = 'value';
    (generateUniqueAudioPanelIdentifier as any).mockReturnValue(val);

    const node = {
      isWebAudio: jest.fn(),
      type: 'foo',
    } as any;

    generateAudioComponent(node);

    expect(generateVolumeInputComponent).toBeCalledTimes(1);
    expect(generateVolumeInputComponent).toBeCalledWith(node, val);
  });

  it('Appends the result of generateVolumeInputComponent to the container.', () => {
    const val = document.createElement('input');
    (generateVolumeInputComponent as any).mockReturnValue(val);

    const node = {
      isWebAudio: jest.fn(),
      type: 'foo',
    } as any;

    const container = generateAudioComponent(node);

    expect(container.contains(val)).toBe(true);
  });

  it('Passes the analysis suite to generateVolumeLevelVisualizerComponent if the node is in Web Audio mode.', () => {
    const val = document.createElement('input');
    (generateVolumeLevelVisualizerComponent as any).mockReturnValue(val);

    const analysisSuite = {};
    const node = {
      analysisSuite,
      isWebAudio: jest.fn(() => true),
      type: 'foo',
    } as any;

    generateAudioComponent(node);

    expect(generateVolumeLevelVisualizerComponent).toBeCalledTimes(1);
    expect(generateVolumeLevelVisualizerComponent).toBeCalledWith(analysisSuite);
  });

  it('Does not pass the node to generateVolumeLevelVisualizerComponent if the node is in HTML Audio mode.', () => {
    const node = {
      isWebAudio: jest.fn(),
      type: 'foo',
    } as any;

    generateAudioComponent(node);

    expect(generateVolumeLevelVisualizerComponent).toBeCalledTimes(0);
  });

  it('Appends the result of generateVolumeLevelVisualizerComponent to the container if the node is in Web Audio mode.', () => {
    const val = document.createElement('canvas');
    (generateVolumeInputComponent as any).mockReturnValue(val);

    const node = {
      analysisSuite: {} as any,
      isWebAudio: jest.fn(() => true),
      type: 'foo',
    } as any;

    const container = generateAudioComponent(node);

    expect(container.contains(val)).toBe(true);
  });
});
