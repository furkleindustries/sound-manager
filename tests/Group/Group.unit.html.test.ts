import {
  Group,
} from '../../src/Group/Group';
import {
  NodeTypes,
} from '../../src/enums/NodeTypes';

const testGroupFactory = (opts = {}) => new Group(
  { ...opts },
);

describe('Group HTML5 Audio unit tests.', () => {
  it('Has a type property with the value NodeTypes.Group.', () => {
    expect(testGroupFactory().type).toBe(NodeTypes.Group);
  });

  it('Has a sounds property of type object.', () => {
    const group = testGroupFactory();
    expect(group.sounds && typeof group.sounds === 'object').toBe(true);
  });

  it('Has a sounds property which defaults to an empty object.', () => {
    expect(testGroupFactory().sounds).toEqual({});
  });

  it('Allows setting the sounds property through the options object.', () => {
    const sound = {} as any;
    const group = testGroupFactory({
      sounds: { test: sound, },
    });

    expect(group.sounds).toEqual({ test: sound, });
  });

  it('Has a getVolume function which returns a number between 0 and 1.', () => {
    const volume = testGroupFactory().getVolume();

    expect(volume).toBeGreaterThanOrEqual(0);
    expect(volume).toBeLessThanOrEqual(1);
  });

  it('Has a getVolume function which returns 1 by default.', () => {
    expect(testGroupFactory().getVolume()).toBe(1);
  });

  it('Allows setting the volume through the options object.', () => {
    const volume = 0.5;
    const group = testGroupFactory({ volume });

    expect(group.getVolume()).toBe(volume);
  });

  it('Has a setVolume function which alters the volume property.', () => {
    const group = testGroupFactory();
    const newVal = 0.333213;
    group.setVolume(newVal);

    expect(group.getVolume()).toBe(newVal);
  });

  it('Has a getSound function which returns the sound from its key.', () => {
    const group = testGroupFactory();
    const sym = Symbol('test');
    // @ts-ignore
    group.__sounds = { test: sym, };

    expect(group.sounds.test === sym as any);
  });

  it('Has an addSound function which puts the sound in the sounds object at the specified key.', () => {
    const group = testGroupFactory();
    const sound = {} as any;
    const key = 'test';
    group.addSound(key, sound);

    expect(group.sounds[key]).toBe(sound);
  });

  it('Has an addSound function which returns the Group.', () => {
    const group = testGroupFactory();
    const sound = {};
    const ret = group.addSound('test1', sound as any);

    expect(ret).toBe(group);
  });

  it('Has an addSounds function which merges the sounds argument with the sounds property.', () => {
    const group = testGroupFactory();
    const soundOne = {} as any;
    const soundTwo = {} as any;

    group.addSounds({
      one: soundOne,
      two: soundTwo,
    });

    expect(group.sounds).toEqual({
      one: soundOne,
      two: soundTwo,
    });
  });

  it('Has an addSounds function which returns the Group.', () => {
    const group = testGroupFactory();
    expect(group.addSounds({})).toBe(group);
  });

  it('Has an addSounds function which throws if a falsy key is used in the argument.', () => {
    const func = () => testGroupFactory().addSounds({
      // @ts-ignore
      '': 2,
    });

    expect(func).toThrow();
  });

  it('Has an addSounds function which throws if one of the keys already exists in the sounds map.', () => {
    const group = testGroupFactory();
    // @ts-ignore
    group.__sounds = { foo: 2, };
    // @ts-ignore
    const func = () => group.addSounds({ foo: {}, });

    expect(func).toThrow();
  });

  it('Has an addSounds function which throws if a sound in the argument map is falsy.', () => {
    const group = testGroupFactory();
    // @ts-ignore
    const func = () => group.addSounds({ one: false, });

    expect(func).toThrow();
  });

  it('Has a removeSounds function which removes the provided string from the sounds map.', () => {
    const group = testGroupFactory();
    const soundOne = {} as any;
    const soundTwo = {} as any;

    // @ts-ignore
    group.__sounds = {
      one: soundOne,
      two: soundTwo,
    };

    group.removeSound('one');

    expect(group.sounds).toEqual({
      two: soundTwo,
    });
  });

  it('Has a removeSounds function which removes all the values in the provided array from the sound map.', () => {
    const group = testGroupFactory();
    const soundOne = {} as any;
    const soundTwo = {} as any;

    // @ts-ignore
    group.__sounds = {
      one: soundOne,
      two: soundTwo,
    };

    group.removeSounds([ 'one', 'two', ]);

    expect(group.sounds).toEqual({});
  });

  it('Has a removeSounds function which returns the Group.', () => {
    const group = testGroupFactory();
    expect(group.removeSounds([])).toBe(group);
  });

  it('Has a clearAllSounds function which passes the entire sounds map to removeSounds.', () => {
    const group = testGroupFactory();
    (group as any).removeSounds = jest.fn();

    const soundOne = {} as any;
    const soundTwo = {} as any;
    const sounds = {
      one: soundOne,
      two: soundTwo,
    };

    // @ts-ignore
    group.__sounds = sounds;
    group.removeAllSounds();

    expect(group.removeSounds).toHaveBeenCalledWith(Object.keys(sounds));
  });

  it('Has a playSounds function which returns a promise.', () => {
    const group = testGroupFactory();
    const mockOne = jest.fn();
    const mockTwo = jest.fn();
    const sounds = {
      testOne: {
        play: mockOne,
      },

      testTwo: {
        play: mockTwo,
      },
    };

    group.addSounds(sounds as any);

    expect(group.playSounds([ 'testOne', 'testTwo', ])).toBeInstanceOf(Promise);
  });

  it('Has a playSounds function which plays the named sounds.', () => {
    const group = testGroupFactory();
    const mockOne = jest.fn();
    const mockTwo = jest.fn();
    const sounds = {
      testOne: {
        play: mockOne,
      },

      testTwo: {
        play: mockTwo,
      },
    };

    group.addSounds(sounds as any);
    group.playSounds([ 'testOne', 'testTwo', ]);

    expect(mockOne).toBeCalledTimes(1);
    expect(mockTwo).toBeCalledTimes(1);
  });

  it('Has a playAllSounds property which passes all of the keys in sounds to playSounds.', () => {
    const group = testGroupFactory();
    const mock = jest.fn();
    (group as any).playSounds = mock;
    const sounds = {
      testOne: {},
      testTwo: {},
    };

    group.addSounds(sounds as any);
    group.playAllSounds();

    expect(mock).toBeCalledTimes(1);
    expect(mock).toBeCalledWith(Object.keys(sounds));
  });

  it('Has a playAllSounds function which returns a promise.', () => {
    const group = testGroupFactory();
    const sounds = {
      testOne: {
        play: jest.fn(),
      },

      testTwo: {
        play: jest.fn(),
      },
    };

    group.addSounds(sounds as any);

    expect(group.playAllSounds()).toBeInstanceOf(Promise);
  });

  it('Has a pauseSounds function which calls pause on all listed sounds.', () => {
    const group = testGroupFactory();
    const mockOne = jest.fn();
    const mockTwo = jest.fn();
    const sounds = {
      testOne: {
        pause: mockOne,
      },

      testTwo: {
        pause: mockTwo,
      },
    };

    group.addSounds(sounds as any);
    group.pauseSounds([ 'testOne', 'testTwo', ]);

    expect(mockOne).toBeCalledTimes(1);
    expect(mockTwo).toBeCalledTimes(1);
  });

  it('Has a pauseSounds property which returns the Group.', () => {
    const group = testGroupFactory();
    const sounds = {
      testOne: {
        pause: jest.fn(),
      },

      testTwo: {
        pause: jest.fn(),
      },
    };

    group.addSounds(sounds as any);
    const ret = group.pauseSounds([ 'testOne', 'testTwo', ]);

    expect(ret).toBe(group);
  });

  it('Has a pauseAllSounds property which passes all of the keys in sounds to pauseSounds.', () => {
    const group = testGroupFactory();
    const mock = jest.fn();
    (group as any).pauseSounds = mock;
    const sounds = {
      testOne: {},
      testTwo: {},
    };

    group.addSounds(sounds as any);
    group.pauseAllSounds();

    expect(mock).toBeCalledTimes(1);
    expect(mock).toBeCalledWith(Object.keys(sounds));
  });

  it('Has a pauseAllSounds function which returns the Group.', () => {
    const group = testGroupFactory();
    const sounds = {
      testOne: {
        pause: jest.fn(),
      },

      testTwo: {
        pause: jest.fn(),
      },
    };

    group.addSounds(sounds as any);
    const ret = group.pauseAllSounds();

    expect(ret).toBe(group);
  });

  it('Has a stopSound function which calls stop on the named function.', () => {
    const group = testGroupFactory();
    const mock = jest.fn();
    const sound = {
      stop: mock,
    };

    const key = 'test';
    group.addSound(key, sound as any);
    group.stopSound(key);

    expect(mock).toHaveBeenCalledTimes(1);
  });

  it('Has a stopSound function which returns the Group.', () => {
    const group = testGroupFactory();
    const mock = jest.fn();
    const sound = {
      stop: mock,
    };

    const key = 'test';
    group.addSound(key, sound as any);
    const ret = group.stopSound(key);

    expect(ret).toBe(group);
  });

  it('Has a stopSounds function which calls stop on all listed sounds.', () => {
    const group = testGroupFactory();
    const mockOne = jest.fn();
    const mockTwo = jest.fn();
    const sounds = {
      testOne: {
        stop: mockOne,
      },

      testTwo: {
        stop: mockTwo,
      },
    };

    group.addSounds(sounds as any);
    group.stopSounds([ 'testOne', 'testTwo', ]);

    expect(mockOne).toBeCalledTimes(1);
    expect(mockTwo).toBeCalledTimes(1);
  });

  it('Has a stopSounds property which returns the Group.', () => {
    const group = testGroupFactory();
    const sounds = {
      testOne: {
        stop: jest.fn(),
      },

      testTwo: {
        stop: jest.fn(),
      },
    };

    group.addSounds(sounds as any);
    const ret = group.stopSounds([ 'testOne', 'testTwo', ]);

    expect(ret).toBe(group);
  });

  it('Has a stopAllSounds property which passes all of the keys in sounds to stopSounds.', () => {
    const group = testGroupFactory();
    const mock = jest.fn();
    (group as any).stopSounds = mock;
    const sounds = {
      testOne: {},
      testTwo: {},
    };

    group.addSounds(sounds as any);
    group.stopAllSounds();

    expect(mock).toBeCalledTimes(1);
    expect(mock).toBeCalledWith(Object.keys(sounds));
  });

  it('Has a stopAllSounds function which returns the Group.', () => {
    const group = testGroupFactory();
    const sounds = {
      testOne: {
        stop: jest.fn(),
      },

      testTwo: {
        stop: jest.fn(),
      },
    };

    group.addSounds(sounds as any);
    const ret = group.stopAllSounds();

    expect(ret).toBe(group);
  });

  it('Has an updateAllAudioElementsVolume function which calls updateAudioElementVolume on all sounds.', () => {
    const group = testGroupFactory();
    const mockOne = jest.fn();
    const mockTwo = jest.fn();
    // @ts-ignore
    group.__sounds = {
      one: {
        updateAudioElementVolume: mockOne,
      },

      two: {
        updateAudioElementVolume: mockTwo,
      },
    } as any;

    group.updateAllAudioElementsVolume();

    expect(mockOne).toBeCalledTimes(1);
    expect(mockTwo).not.toBeCalled();
  });

  it('Has an updateAllAudioElementsVolume function which returns the Group.', () => {
    const group = testGroupFactory();
    const ret = group.updateAllAudioElementsVolume();

    expect(ret).toBe(group);
  });

  it('Has an isPanelRegistered function which returns a boolean.', () => {
    expect(typeof testGroupFactory().isPanelRegistered()).toBe('boolean');
  });

  it('Has an isPanelRegistered function which returns false by default.', () => {
    expect(testGroupFactory().isPanelRegistered()).toBe(false);
  });
});
