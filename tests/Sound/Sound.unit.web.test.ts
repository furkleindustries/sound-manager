import {
  EasingCurves,
} from '../../src/enums/EasingCurves';
import {
  ISoundOptions,
} from '../../src/Sound/ISoundOptions';
import {
  NodeTypes,
} from '../../src/enums/NodeTypes';
import {
  Sound,
} from '../../src/Sound/Sound';
import {
  strings,
} from '../../src/Sound/Sound.strings';

import {
  getFadeValueAtTime,
} from '../../src/functions/getFadeValueAtTime';
jest.mock('../../src/functions/getFadeValueAtTime');

const getContext = () => new AudioContext();
const getAudioBuffer = (context: AudioContext) => context.createBuffer(1, 100, 12000);
const testSoundFactory = (options?: Partial<ISoundOptions>) => {
  const context = options ? options.context || getContext() : getContext();
  const buffer = options ? options.buffer || getAudioBuffer(context) : getAudioBuffer(context);
  return new Sound({
    buffer,
    context,
    getManagerVolume: jest.fn(() => 1),
    ...options,
  });
};

describe('Sound Web Audio unit tests.', () => {
  beforeEach(() => {
    (getFadeValueAtTime as any).mockClear();
    (getFadeValueAtTime as any).mockReturnValue(1);
  });

  it('Throws an error if the options argument is not provided.', () => {
    // @ts-ignore
    const func = () => new Sound();
    expect(func).toThrow(strings.CTOR_OPTIONS_INVALID);
  });

  it('Throws an error if the buffer argument property is not provided.', () => {
    const func = () => new Sound({
      context: {
        createAnalyser: jest.fn(() => ({})),
        createGain: jest.fn(),
      },
    } as any);

    expect(func).toThrow(strings.CTOR_BUFFER_INVALID);
  });

  it('Throws an error if the buffer is missing.', () => {
    const func = () => (
      new Sound({ context: getContext() } as any)
    );

    expect(func).toThrow();
  });

  it('Allows setting the loop property through the options object.', () => {
    const loop = true;
    const sound = testSoundFactory({ loop, });

    expect(sound.getLoop()).toBe(loop);
  });

  it('Allows setting the track position through the options object.', () => {    
    const trackPosition = 0.5;
    expect(testSoundFactory({ trackPosition, }).getTrackPosition()).toBe(trackPosition);
  });

  it('Allows the fade to be set in the argument object.', () => {
    const fade = {
      easingCurve: {
        in: EasingCurves.Exponential,
        out: EasingCurves.Quadratic,
      },

      length: {
        in: 4,
        out: 4,
      },
    };

    const sound = testSoundFactory({ fade });

    expect(sound.getFade()).toEqual(fade);
  });

  it('Allows the fade to be set with just a boolean.', () => {
    const fade = true;
    const sound = testSoundFactory({ fade });

    expect(sound.getFade()).toEqual({
      easingCurve: {
        in: EasingCurves.Quadratic,
        out: EasingCurves.Quadratic,
      },

      length: {
        in: 2,
        out: 2,
      },
    });
  });

  it('Has a type of NodeTypes.Sound.', () => {
    const sound = testSoundFactory();
    expect(sound.type).toBe(NodeTypes.Sound);
  });

  it('Has a getInputNode function which returns an instance of AudioNode.', () => {
    expect(testSoundFactory().getInputNode()).toBeInstanceOf(AudioNode);
  });

  it('Has a getSourceNode function which returns an instance of AudioBufferSourceNode after it is constructed.', () => {
    expect(testSoundFactory().getSourceNode()).toBeInstanceOf(AudioBufferSourceNode);
  });

  it('Throws if getSourceNode is called and __sourceNode is falsy.', () => {
    const sound = testSoundFactory();
    // @ts-ignore
    delete sound.__sourceNode;
    const func = () => sound.getSourceNode();

    expect(func).toThrow(strings.GET_SOURCE_NODE_NODE_INVALID);
  });

  it('Has a getFadeGainNode function which returns an instance of GainNode.', () => {
    expect(testSoundFactory().getFadeGainNode()).toBeInstanceOf(GainNode);
  });

  it('Throws if getFadeGainNode is called and __fadeGainNode is falsy.', () => {
    const sound = testSoundFactory();
    // @ts-ignore
    delete sound.__fadeGainNode;
    const func = () => sound.getFadeGainNode();

    expect(func).toThrow(strings.GET_FADE_GAIN_NODE_NODE_INVALID);
  });

  it('Has a setVolume function which alters the volume property.', () => {
    const newVol = 0.5;
    const sound = testSoundFactory();

    expect(sound.setVolume(newVol).getVolume()).toBe(newVol);
  });

  it('Has a setVolume property which returns the Sound.', () => {
    const sound = testSoundFactory();
    expect(sound.setVolume(1)).toBe(sound);
  });

  it('Has a getTrackPosition function which returns a non-negative numeric value.', () => {
    expect(testSoundFactory().getTrackPosition()).toBeGreaterThanOrEqual(0);
  });

  it('Has a getTrackPosition function which returns getContextCurrentTime - __startedTime if the Sound is playing.', () => {
    const contextTime = 15;
    const startedTime = 10;
    const sound = testSoundFactory();
    (sound as any).isPlaying = jest.fn(() => true);
    (sound as any).getContextCurrentTime = jest.fn(() => contextTime);
    // @ts-ignore
    sound.__startedTime = startedTime;

    expect(sound.getTrackPosition()).toBe(contextTime - startedTime);
  });

  it('Has a getTrackPosition function which returns __pausedTime if the Sound is not playing.', () => {
    const sym = Symbol('paused');
    const sound = testSoundFactory();
    // @ts-ignore
    sound.__pausedTime = sym;

    expect(sound.getTrackPosition()).toBe(sym);
  });

  it('Has a track position which defaults to 0.', () => {
    expect(testSoundFactory().getTrackPosition()).toBe(0);
  });

  it('Has a setTrackPosition function which changes the representation returned by the trackPosition property.', () => {
    const sound = testSoundFactory();
    const newVal = sound.getTrackPosition() + 500;

    expect(sound.setTrackPosition(newVal).getTrackPosition()).toBe(newVal);
  });

  it('Has a setTrackPosition function which returns the Sound.', () => {
    const sound = testSoundFactory();
    const ret = sound.setTrackPosition(0);

    expect(ret).toBe(sound);
  });

  it('Has a getDuration function which returns the duration of the source buffer.', () => {
    const sound = testSoundFactory();
    expect(sound.getDuration()).toBe(sound.getSourceNode().buffer!.duration);
  });

  it('Has a getDuration function which throws if the source node has no buffer.', () => {
    const sound = testSoundFactory();
    // @ts-ignore
    sound.__sourceNode.buffer = null;
    const func = () => sound.getDuration();

    expect(func).toThrow(strings.GET_DURATION_BUFFER_INVALID);
  });

  it('Has a isPlaying function which returns a boolean.', () => {
    expect(typeof testSoundFactory().isPlaying()).toBe('boolean');
  });

  it('Has an isPlaying function which returns __playing.', () => {
    const sym = Symbol('playing');
    const sound = testSoundFactory();
    // @ts-ignore
    sound.__playing = sym;

    expect(sound.isPlaying()).toBe(sym);
  });

  it('Has a playing value which defaults to false.', () => {
    expect(testSoundFactory().isPlaying()).toBe(false);
  });

  it('Has a getLoop function which returns a boolean.', () => {
    expect(typeof testSoundFactory().getLoop()).toBe('boolean');
  });

  it('Has a getLoop function which returns false by default.', () => {
    expect(testSoundFactory().getLoop()).toBe(false);
  });

  it('Has a getLoop function which returns from __loopOverride if that property is set.', () => {
    const sym = Symbol('loop');
    const sound = testSoundFactory();
    // @ts-ignore
    sound.__loopOverride = sym;

    expect(sound.getLoop()).toBe(sym);
  });

  it('Has a setLoop function which changes the source node\'s loop property.', () => {
    const sound = testSoundFactory();
    const newVal = !sound.getLoop();
    sound.setLoop(newVal);

    // @ts-ignore
    expect(sound.__sourceNode.loop).toBe(newVal);
  });

  it('Has a setLoop function which returns the sound.', () => {
    const sound = testSoundFactory();
    const ret = sound.setLoop(true);

    expect(ret).toBe(sound);
  });

  it('Has a getFade function which defaults to null.', () => {
    const fade = testSoundFactory().getFade();
    expect(fade).toBe(null);
  });

  it('Allows the fade to be set with just a boolean.', () => {
    const fade = true;
    const sound = testSoundFactory({ fade, });

    expect(sound.getFade()).toEqual({
      easingCurve: {
        in: EasingCurves.Quadratic,
        out: EasingCurves.Quadratic,
      },

      length: {
        in: 2,
        out: 2,
      },
    });
  });

  it('Has a setFade argument which changes the fade.', () => {
    const fade = {
      easingCurve: {
        in: EasingCurves.Exponential,
        out: EasingCurves.Quadratic,
      },

      length: {
        in: 5,
        out: 5,
      },
    };

    const sound = testSoundFactory();
    const oldFade = sound.getFade();
    sound.setFade(fade);
    const newFade = sound.getFade();

    expect(newFade).toBe(fade);
    expect(newFade).not.toBe(oldFade);
  });

  it('Has a setFade argument which returns the Sound.', () => {
    const sound = testSoundFactory();
    const ret = sound.setFade({
      easingCurve: {
        in: EasingCurves.Exponential,
        out: EasingCurves.Quadratic,
      },

      length: {
        in: 5,
        out: 5,
      },
    });

    expect(ret).toBe(sound);
  });

  it('Has a pause function which returns the Sound.', () => {
    const sound = testSoundFactory();
    const ret = sound.pause();

    expect(ret).toBe(sound);
  });

  it('Has a rewind function which returns the Sound.', () => {
    const sound = testSoundFactory();
    const ret = sound.rewind(2);

    expect(ret).toBe(sound);
  });


  it('Has a fastForward function which returns the Sound.', () => {
    const sound = testSoundFactory();
    const ret = sound.fastForward(2);

    expect(ret).toBe(sound);
  });

  it('Has a getGroupVolume function which returns a number betweeen 0 and 1 inclusive.', () => {
    const volume = testSoundFactory().getGroupVolume();

    expect(volume).toBeGreaterThanOrEqual(0);
    expect(volume).toBeLessThanOrEqual(1);
  });

  it('Has a function called updateAudioElementVolume which throws an error if it is used in the web audio mode.', () => {
    const func = () => testSoundFactory().updateAudioElementVolume();
    expect(func).toThrow();
  });

  it('Returns 1 from getFadeVolume if there is no fade.', () => {
    expect(testSoundFactory().getFadeVolume()).toBe(1);
  });

  it('Returns 1 from getFadeVolume if there is a fade but it is not during the in or out fading windows.', () => {
    const sound = testSoundFactory();
    (sound as any).getFade = jest.fn(() => ({
      easingCurve: {},
      length: {},
    } as any));

    expect(sound.getFadeVolume()).toBe(1);
  });

  it('Defaults to an isPanelRegistered() of false.', () => {
    const sound = testSoundFactory();
    expect(sound.isPanelRegistered()).toBe(false);
  });
});
