import {
  updateAudioPanelElement,
} from '../../src/Manager/updateAudioPanelElement';

import {
  generateAudioPanelElement,
} from '../../src/Manager/generateAudioPanelElement';
jest.mock('../../src/Manager/generateAudioPanelElement');

describe('updateAudioPanelElement unit tests.', () => {
  beforeEach(() => {
    (generateAudioPanelElement as any).mockClear();
  });

  it('Throws if the manager argument is falsy.', () => {
    // @ts-ignore
    expect(updateAudioPanelElement).toThrow();
  });

  it('Throws if the oldElem argument is falsy.', () => {
    // @ts-ignore
    expect(() => updateAudioPanelElement(true)).toThrow();
  });

  it('Throws if the oldElem argument\'s parentElement property is falsy.', () => {
    // @ts-ignore
    expect(() => updateAudioPanelElement(true, true)).toThrow();
  });

  it('Passes the manager to generateVolumePanelElement.', () => {
    const sym = Symbol('manager') as any;
    const elem = {
      parentElement: {
        replaceChild: jest.fn(),
      },
    } as any;

    updateAudioPanelElement(sym, elem);

    expect(generateAudioPanelElement).toBeCalledTimes(1);
    expect(generateAudioPanelElement).toBeCalledWith(sym);
  });

  it('Call\'s replaceChild on oldElem\'s parent, replacing the old element with the one from generateVolumePanelElement.', () => {
    const newElem = Symbol('newElem');
    (generateAudioPanelElement as any).mockReturnValue(newElem);

    const replaceChild = jest.fn();
    const oldElem = {
      parentElement: { replaceChild, },
    } as any;

    updateAudioPanelElement(true as any, oldElem);

    expect(replaceChild).toBeCalledTimes(1);
    expect(replaceChild).toBeCalledWith(newElem, oldElem);
  });

  it('Passes the manager to generateVolumePanelElement.', () => {
    const sym = Symbol('manager') as any;
    const elem = {
      parentElement: {
        replaceChild: jest.fn(),
      },
    } as any;

    updateAudioPanelElement(sym, elem);

    expect(generateAudioPanelElement).toBeCalledTimes(1);
    expect(generateAudioPanelElement).toBeCalledWith(sym);
  });

  it('Returns the result of generateVolumePanelElement.', () => {
    const newElem = Symbol('newElem');
    (generateAudioPanelElement as any).mockReturnValue(newElem);

    const elem = {
      parentElement: {
        replaceChild: jest.fn(),
      },
    } as any;

    expect(updateAudioPanelElement(true as any, elem)).toBe(newElem);
  });
});