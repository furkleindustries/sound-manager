import {
  Group,
} from '../../src/Group/Group';

const createGroup = (opts = {}) => new Group(Object.assign({}, {
  context: new AudioContext(),
}, opts));

describe('Group unit tests.', () => {
  it('Has a sounds property of type object.', () => {
    const group = createGroup();
    expect(group.sounds && typeof group.sounds === 'object').toBe(true);
  });

  it('Has a sounds property which defaults to an empty object.', () => {
    const group = createGroup();
    expect(group.sounds).toEqual({});
  });

  it('Allows setting the sounds property through the options object.', () => {
    const sound = {
      isWebAudio: jest.fn(() => true),
      getOutputNode: () => ({
        connect: jest.fn(),
      }),
    } as any;

    const group = createGroup({
      sounds: {
        test: sound,
      },
    });

    expect(group.sounds).toEqual({ test: sound, });
  });

  it('Has an inputNode property which is an instance of AudioNode.', () => {
    const group = createGroup();
    expect(group.getInputNode()).toBeInstanceOf(AudioNode);
  });

  it('Has an outputNode property which is an instance of AudioNode.', () => {
    const group = createGroup();
    expect(group.getOutputNode()).toBeInstanceOf(AudioNode);
  });

  it('Has an analyserNode property which is an instance of AnalyserNode.', () => {
    const group = createGroup();
    expect(group.getAnalyserNode()).toBeInstanceOf(AnalyserNode);
  });

  it('Has a gainNode property which is an instance of GainNode.', () => {
    const group = createGroup();
    expect(group.getGainNode()).toBeInstanceOf(GainNode);
  });

  it('Has a volume property which is a number between 0 and 1.', () => {
    const group = createGroup();
    expect(group.getVolume() >= 0 && group.getVolume() <= 1).toBe(true);
  });

  it('Has a volume property which defaults to 1.', () => {
    const group = createGroup();
    expect(group.getVolume()).toBe(1);
  });

  it('Allows setting the volume through the options object.', () => {
    const volume = 0.5;
    const group = createGroup({ volume, });
    expect(group.getVolume()).toBe(volume);
  });

  it('Has a getSound function which returns the sound from its key.', () => {
    const group = createGroup();
    const sym = Symbol('test');
    // @ts-ignore
    group.__sounds = { test: sym, };

    expect(group.sounds.test === sym as any);
  });

  it('Has an addSounds function which merges the sounds argument with the sounds property.', () => {
    const group = createGroup();

    const soundOne = {
      isWebAudio: jest.fn(() => true),
      getOutputNode: () => ({
        connect: jest.fn(),
      }),
    } as any;

    const soundTwo = {
      isWebAudio: jest.fn(() => true),
      getOutputNode: () => ({
        connect: jest.fn(),
      }),
    } as any;

    group.addSounds({
      one: soundOne,
      two: soundTwo,
    });

    expect(group.sounds).toEqual({
      one: soundOne,
      two: soundTwo,
    });
  });

  it('Has an addSounds function which connects the sound to the output node.', () => {
    const group = createGroup();

    const mock = jest.fn();
    const sound = {
      isWebAudio: jest.fn(() => true),
      getOutputNode: () => ({
        connect: mock,
      }),
    } as any;

    group.addSounds({
      test: sound,
    });

    expect(mock).toBeCalledTimes(1);
  });

  it('Has a removeSounds function which removes the provided string from the sounds map.', () => {
    const group = createGroup();

    const soundOne = {
      isWebAudio: jest.fn(() => true),
      getOutputNode: () => ({
        disconnect: jest.fn(),
      }),
    } as any;

    const soundTwo = {
      isWebAudio: jest.fn(() => true),
      getOutputNode: () => ({
        disconnect: jest.fn(),
      }),
    } as any;

    // @ts-ignore
    group.__sounds = {
      one: soundOne,
      two: soundTwo,
    };

    group.removeSounds('one');

    expect(group.sounds).toEqual({
      two: soundTwo,
    });
  });

  it('Has a removeSounds function which removes all the values in the provided array from the sound map.', () => {
    const group = createGroup();

    const soundOne = {
      isWebAudio: jest.fn(() => true),
      getOutputNode: () => ({
        disconnect: jest.fn(),
      }),
    } as any;

    const soundTwo = {
      isWebAudio: jest.fn(() => true),
      getOutputNode: () => ({
        disconnect: jest.fn(),
      }),
    } as any;

    // @ts-ignore
    group.__sounds = {
      one: soundOne,
      two: soundTwo,
    };

    group.removeSounds([ 'one', 'two', ]);

    expect(group.sounds).toEqual({});
  });

  it('Has a removeSounds function which disconnects the output node.', () => {
    const group = createGroup();

    const mock = jest.fn();
    const sound = {
      isWebAudio: jest.fn(() => true),
      getOutputNode: () => ({
        disconnect: mock,
      }),
    } as any;

    // @ts-ignore
    group.__sounds = { test: sound, };

    group.removeSounds('test');

    expect(mock).toBeCalledTimes(1);
  });

  it('Has a clearAllSounds function which passes the entire sounds map to removeSounds.', () => {
    const group = createGroup();
    group.removeSounds = jest.fn();

    const soundOne = {
      isWebAudio: jest.fn(() => true),
      getOutputNode: () => ({
        disconnect: jest.fn(),
      }),
    } as any;

    const soundTwo = {
      isWebAudio: jest.fn(() => true),
      getOutputNode: () => ({
        disconnect: jest.fn(),
      }),
    } as any;

    const sounds = {
      one: soundOne,
      two: soundTwo,
    };

    // @ts-ignore
    group.__sounds = sounds;

    group.removeAllSounds();

    expect(group.removeSounds).toHaveBeenCalledWith(Object.keys(sounds));
  });

  it('Has a setVolume function which alters the volume property.', () => {
    const group = createGroup();
    const newVal = 0.333213;
    group.setVolume(newVal);

    expect(group.getVolume()).toBe(newVal);
  });
});