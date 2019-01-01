import {
  generateAudioPanelElement,
} from '../../src/functions/generateAudioPanelElement';

import {
  generateVolumeInput,
} from '../../src/functions/generateVolumeInput';
jest.mock('../../src/functions/generateVolumeInput');

describe('generateAudioPanelElement unit tests.', () => {
  beforeEach(() => {
    (generateVolumeInput as any).mockClear();
    (generateVolumeInput as any).mockReturnValue(document.createElement('input'));
  });

  it('Outputs a div with the class sound-manager-panel.', () => {
    const panel = generateAudioPanelElement({
      groups: {},
    } as any);

    expect(panel).toBeInstanceOf(HTMLDivElement);
    expect(panel.classList.contains('sound-manager-panel'));
  });

  it('Fetches each of the groups from the manager.', () => {
    const mock = jest.fn((name) => manager.groups[name]);
    const manager = {
      groups: {
        one: {
          isPanelRegistered: jest.fn(),
          sounds: {},
        },

        two: {
          isPanelRegistered: jest.fn(),
          sounds: {},
        },

        three: {
          isPanelRegistered: jest.fn(),
          sounds: {},
        },
      },

      getGroups: mock,
    } as any;

    generateAudioPanelElement(manager);

    expect(mock.mock.calls).toEqual([
      [ 'one', ],
      [ 'two', ],
      [ 'three', ],
    ]);
  });

  it('Outputs an audio panel for the manager and every group which returns true to isPanelRegistered.', () => {
    const manager = {
      groups: {
        one: {
          isPanelRegistered: jest.fn(() => true),
          sounds: {},
        },

        two: {
          isPanelRegistered: jest.fn(() => false),
          sounds: {},
        },

        three: {
          isPanelRegistered: jest.fn(() => true),
          sounds: {},
        },
      },

      getGroups: jest.fn((name) => manager.groups[name]),
    } as any;

    generateAudioPanelElement(manager);

    expect((generateVolumeInput as any).mock.calls).toEqual([
      [
        manager,
      ],

      [
        manager.groups.one,
        'one',
      ],

      [
        manager.groups.three,
        'three',
      ],
    ]);
  });

  it('Outputs an audio panel for the manager and every sound which returns true to isPanelRegistered.', () => {
    const manager = {
      groups: {
        one: {
          getSounds: jest.fn((name) => manager.getGroups('one').sounds[name]),
          isPanelRegistered: jest.fn(),
          sounds: {
            s1: {
              isPanelRegistered: jest.fn(() => true),
            },
          },
        },

        two: {
          getSounds: jest.fn((name) => manager.getGroups('two').sounds[name]),
          isPanelRegistered: jest.fn(),
          sounds: {
            s2: {
              isPanelRegistered: jest.fn(() => true),
            }
          },
        },

        three: {
          getSounds: jest.fn((name) => manager.getGroups('three').sounds[name]),
          isPanelRegistered: jest.fn(),
          sounds: {
            s3: {
              isPanelRegistered: jest.fn(() => false),
            },
          },
        },
      },

      getGroups: jest.fn((name) => manager.groups[name]),
    } as any;

    generateAudioPanelElement(manager);

    expect((generateVolumeInput as any).mock.calls).toEqual([
      [
        manager,
      ],

      [
        manager.groups.one.sounds.s1,
        's1',
      ],

      [
        manager.groups.two.sounds.s2,
        's2',
      ],
    ]);
  });
});
