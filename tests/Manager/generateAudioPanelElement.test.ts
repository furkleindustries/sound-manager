import {
  generateAudioPanelElement,
  strings,
} from '../../src/Manager/generateAudioPanelElement';

import {
  generateAudioComponent,
} from '../../src/Manager/generateAudioComponent';
jest.mock('../../src/Manager/generateAudioComponent');

describe('generateAudioPanelElement unit tests.', () => {
  beforeEach(() => {
    (generateAudioComponent as any).mockClear();
    (generateAudioComponent as any).mockReturnValue(document.createElement('div'));
  });

  it('Throws if the manager argument is not provided.', () => {
    const func = generateAudioPanelElement;
    expect(func).toThrow(strings.MANAGER_INVALID);
  });

  it('Outputs a div with the class sound-manager-panel.', () => {
    const panel = generateAudioPanelElement({
      collection: {
        groups: {},
      },
    } as any);

    expect(panel).toBeInstanceOf(HTMLDivElement);
    expect(panel.classList.contains('sound-manager-panel'));
  });

  it('Fetches each of the groups from the manager.', () => {
    const mock = jest.fn((name) => manager.collection.groups[name]);
    const manager = {
      collection: {
        getGroup: mock,
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
      },
    } as any;

    generateAudioPanelElement(manager);

    expect(mock.mock.calls).toEqual([
      [ 'one' ],
      [ 'two' ],
      [ 'three' ],
    ]);
  });

  it('Outputs an audio panel for the manager and every group which returns true to isPanelRegistered.', () => {
    const manager = {
      collection: {
        getGroup: jest.fn((name) => manager.collection.groups[name]),
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
      },
    } as any;

    generateAudioPanelElement(manager);

    expect((generateAudioComponent as any).mock.calls).toEqual([
      [
        manager,
      ],

      [
        manager.collection.groups.one,
        'one',
      ],

      [
        manager.collection.groups.three,
        'three',
      ],
    ]);
  });
  
  it('Outputs an audio panel for the manager and every sound which returns true to isPanelRegistered.', () => {
    const manager = {
      collection: {
        getGroup: jest.fn((name) => manager.collection.groups[name]),
        groups: {
          one: {
            getSound: jest.fn((name) => manager.collection.getGroup('one').sounds[name]),
            isPanelRegistered: jest.fn(),
            sounds: {
              s1: {
                isPanelRegistered: jest.fn(() => true),
              },
            },
          },
  
          two: {
            getSound: jest.fn((name) => manager.collection.getGroup('two').sounds[name]),
            isPanelRegistered: jest.fn(),
            sounds: {
              s2: {
                isPanelRegistered: jest.fn(() => true),
              }
            },
          },
  
          three: {
            getSound: jest.fn((name) => manager.collection.getGroup('three').sounds[name]),
            isPanelRegistered: jest.fn(),
            sounds: {
              s3: {
                isPanelRegistered: jest.fn(() => false),
              },
            },
          },
        },
      },
    } as any;

    generateAudioPanelElement(manager);

    expect((generateAudioComponent as any).mock.calls).toEqual([
      [
        manager,
      ],

      [
        manager.collection.groups.one.sounds.s1,
        's1',
      ],

      [
        manager.collection.groups.two.sounds.s2,
        's2',
      ],
    ]);
  });
});
