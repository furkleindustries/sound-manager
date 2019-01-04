import {
  updateAudioPanelElement,
} from '../../src/functions/updateAudioPanelElement';

import {
  generateVolumePanelElement,
} from '../../src/functions/generateVolumePanelElement';
jest.mock('../../src/functions/generateVolumePanelElement');

describe('updateAudioPanelElement unit tests.', () => {
  beforeEach(() => {
    (generateVolumePanelElement as any).mockClear();
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

    expect(generateVolumePanelElement).toBeCalledTimes(1);
    expect(generateVolumePanelElement).toBeCalledWith(sym);
  });

  it('Call\'s replaceChild on oldElem\'s parent, replacing the old element with the one from generateVolumePanelElement.', () => {
    const newElem = Symbol('newElem');
    (generateVolumePanelElement as any).mockReturnValue(newElem);

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

    expect(generateVolumePanelElement).toBeCalledTimes(1);
    expect(generateVolumePanelElement).toBeCalledWith(sym);
  });

  it('Returns the result of generateVolumePanelElement.', () => {
    const newElem = Symbol('newElem');
    (generateVolumePanelElement as any).mockReturnValue(newElem);

    const elem = {
      parentElement: {
        replaceChild: jest.fn(),
      },
    } as any;

    expect(updateAudioPanelElement(true as any, elem)).toBe(newElem);
  });
});
