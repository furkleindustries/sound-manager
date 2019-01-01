import {
  EasingCurves,
} from '../../src/Fade/EasingCurves';
import {
  IFade,
} from '../../src/Fade/IFade';
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

  /* Constructor tests. */
  it('Throws an error if the options argument is not provided.', () => {
    const func = () => (
      // @ts-ignore
      new Sound()
    );

    expect(func).toThrow();
  });

  it('Throws an error if the getManagerVolume argument property is not a function.', () => {
    const func = () => (
      // @ts-ignore
      new Sound({})
    );

    expect(func).toThrow();
  });

  it('Throws an error if neither a context nor an audioElement property were provided.', () => {
    const func = () => new Sound({ getManagerVolume: jest.fn(), });
    expect(func).toThrow();
  });

  it('Throws an error if the buffer is missing.', () => {
    const func = () => (
      new Sound({
        context: getContext(),
        getManagerVolume: jest.fn(),
      })
    );

    expect(func).toThrow();
  });
  /* End constructor tests. */

  it('Has a type of NodeTypes.Sound.', () => {
    const sound = testSoundFactory();
    expect(sound.type).toBe(NodeTypes.Sound);
  });

  it('Has a getVolume function which returns a number.', () => {
    const sound = testSoundFactory();
    const volume = sound.getVolume();

    expect(volume).toBeGreaterThanOrEqual(0);
    expect(volume).toBeLessThanOrEqual(1);
  });

  it('Defaults to a volume of 1.', () => {
    expect(testSoundFactory().getVolume()).toBe(1);
  });

  it('Allows setting the volume through the options object.', () => {
    const argVol = 0.4;
    const sound = testSoundFactory({ volume: argVol, });

    expect(sound.getVolume()).toBe(argVol);
  });

  it('Has a setVolume function which alters the volume property.', () => {
    const newVol = 0.5;
    expect(testSoundFactory().setVolume(newVol).getVolume()).toBe(newVol);
  });

  it('Has an isWebAudio function which returns true if the context and buffer are provided.', () => {
    expect(testSoundFactory().isWebAudio()).toBe(true);
  });

  it('Has a getGainNode property which returns an instance of GainNode after it is constructed.', () => {
    expect(testSoundFactory().getGainNode()).toBeInstanceOf(GainNode);
  });

  it('Throws if getGainNode is called and __gainNode is falsy.', () => {
    const sound = testSoundFactory();
    // @ts-ignore
    delete sound.__gainNode;
    const func = () => sound.getGainNode();

    expect(func).toThrow();
  });

  it('Has a getInputNode function which returns an instance of AudioNode.', () => {
    expect(testSoundFactory().getInputNode()).toBeInstanceOf(AudioNode);
  });

  it('Has a getOutputNode function which returns an instance of AudioNode.', () => {
    expect(testSoundFactory().getOutputNode()).toBeInstanceOf(AudioNode);
  });

  it('Has a getSourceNode function which returns an instance of AudioBufferSourceNode after it is constructed.', () => {
    expect(testSoundFactory().getSourceNode()).toBeInstanceOf(AudioBufferSourceNode);
  });

  it('Throws if getSourceNode is called and __sourceNode is falsy.', () => {
    const sound = testSoundFactory();
    // @ts-ignore
    delete sound.__sourceNode;
    const func = () => sound.getSourceNode();

    expect(func).toThrow();
  });

  it('Has a getFadeGainNode function which returns an instance of GainNode.', () => {
    expect(testSoundFactory().getFadeGainNode()).toBeInstanceOf(GainNode);
  });

  it('Throws if getFadeGainNode is called and __fadeGainNode is falsy.', () => {
    const sound = testSoundFactory();
    // @ts-ignore
    delete sound.__fadeGainNode;
    const func = () => sound.getFadeGainNode();

    expect(func).toThrow();
  });

  it('Has a getContextCurrentTime function which returns the currentTime property of the AudioContext passed in the options object.', () => {
    const context = getContext();
    const sound = testSoundFactory({ context, });

    expect(sound.getContextCurrentTime()).toBe(context.currentTime);
  });

  it('Has a getTrackPosition function which returns a non-negative numeric value.', () => {
    expect(testSoundFactory().getTrackPosition()).toBeGreaterThanOrEqual(0);
  });

  it('Has a trackPosition which defaults to 0.', () => {
    expect(testSoundFactory().getTrackPosition()).toBe(0);
  });

  it('Allows setting the trackPosition through the options object.', () => {    
    const trackPosition = 0.5;
    expect(testSoundFactory({ trackPosition, }).getTrackPosition()).toBe(trackPosition);
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

  it('Mutates the __startedTime private property if the sound is playing.', () => {
    const sound = testSoundFactory();
    sound.play().catch(() => {});
    const difference = 5;
    // @ts-ignore
    const beforeStartedTime = sound.__startedTime;
    sound.setTrackPosition(sound.getTrackPosition() + difference);
    const afterStartedTime = sound.getTrackPosition();
    sound.stop();

    expect(beforeStartedTime).toBe(afterStartedTime - difference);
  });

  it('Has a getDuration function which returns the duration of the source buffer.', () => {
    const sound = testSoundFactory();
    expect(sound.getDuration()).toBe(sound.getSourceNode().buffer!.duration);
  });

  it('Returns 0 if the source buffer can\'t be found.', () => {
    const sound = testSoundFactory();
    // @ts-ignore
    sound.__sourceNode.buffer = null;

    expect(sound.getDuration()).toBe(0);
  });

  it('Has a getPlaying function which returns a boolean.', () => {
    expect(typeof testSoundFactory().getPlaying()).toBe('boolean');
  });

  it('Has a playing value which defaults to false.', () => {
    expect(testSoundFactory().getPlaying()).toBe(false);
  });

  it('Allows setting the playing value through the autoplay property of the options object.', () => {    
    const autoplay = true;
    expect(testSoundFactory({ autoplay, }).getPlaying()).toBe(autoplay);
  });

  it('Has a getLoop function which returns a boolean.', () => {
    expect(typeof testSoundFactory().getLoop()).toBe('boolean');
  });

  it('Has a getLoop function which returns false by default.', () => {
    expect(testSoundFactory().getLoop()).toBe(false);
  });

  it('Has a getLoop function which returns from __loopOverride if that property is set.', () => {
    const sound = testSoundFactory();
    const loop = true;
    // @ts-ignore
    sound.__loopOverride = loop;

    expect(sound.getLoop()).toBe(loop);
  });

  it('Allows setting the loop through the options object.', () => {    
    const loop = true;
    expect(testSoundFactory({ loop, }).getLoop()).toBe(loop);
  });

  it('Has a setLoop function which changes the loop property.', () => {
    const sound = testSoundFactory();
    const newVal = !sound.getLoop();

    expect(sound.setLoop(newVal).getLoop()).toBe(newVal);
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

    const sound = testSoundFactory({ fade, });

    expect(sound.getFade()).toEqual(fade);
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

  it('Has a play function which changes the result of the getPlaying function.', () => {
    const sound = testSoundFactory();
    sound.play();

    expect(sound.getPlaying()).toBe(true);
  });

  it('Fades on play if the track position is less than the in length of the IFade.', () => {
    const sound = testSoundFactory();
    const mock = jest.fn();
    // @ts-ignore
    sound.__fadeGainNode = {
      // @ts-ignore
      gain: {
        setValueAtTime: mock,
      },
    };

    // @ts-ignore
    sound.__sourceNode = {
      start: jest.fn(),
    };

    sound.play({
      easingCurve: {
        in: EasingCurves.Cubic,
        out: EasingCurves.Cubic,
      },

      length: {
        in: 1,
        out: 1,
      },
    });

    expect(mock).toBeCalled();
  });

  /*it('Does not fade on play if the track position is greater than the in length of the IFade.', () => {
    const sound = testSoundFactory();
    const mock = jest.fn();
    // @ts-ignore
    sound.__fadeGainNode = {
      // @ts-ignore
      gain: {
        setValueAtTime: mock,
      },
    };

    // @ts-ignore
    sound.__sourceNode = {
      start: jest.fn(),
    };

    // @ts-ignore
    sound.getDuration = jest.fn(() => 20);

    // @ts-ignore
    sound.getTrackPosition = jest.fn(() => 10);

    sound.play({
      easingCurve: {
        in: EasingCurves.Cubic,
        out: EasingCurves.Cubic,
      },

      length: {
        in: 1,
        out: 1,
      },
    });

    expect(mock).not.toBeCalled();
  });*/
  

  it('Fades on end if the track position is less than the out length of the IFade.', () => {
    const sound = testSoundFactory();
    const mock = jest.fn();
    // @ts-ignore
    sound.__fadeGainNode = {
      // @ts-ignore
      gain: {
        setValueAtTime: mock,
      },
    };

    // @ts-ignore
    sound.__sourceNode = {
      start: jest.fn(),
    };

    // @ts-ignore
    sound.getDuration = jest.fn(() => 12);

    // @ts-ignore
    sound.getTrackPosition = jest.fn(() => 10);

    sound.play({
      easingCurve: {
        in: EasingCurves.Cubic,
        out: EasingCurves.Cubic,
      },

      length: {
        in: 5,
        out: 5,
      },
    });

    expect(mock).toBeCalled();
  });

  it('Uses the first argument as a fadeOverride if it is truthy.', () => {
    const sound = testSoundFactory();
    const fade = {
      easingCurve: {
        in: EasingCurves.Quartic,
        out: EasingCurves.Quintic,
      },

      length: {
        in: 15,
        out: 15,
      },
    };

    sound.play(fade).catch(() => {});

    expect(sound.getFade()).toEqual(fade);
  });

  it('Uses the second argument as a loop value if it is a boolean.', () => {
    const sound = testSoundFactory();
    const loop = true;
    sound.play(null, loop).catch(() => {});

    expect(sound.getLoop()).toBe(loop);
  });

  it('Outputs a promise when played.', () => {
    expect(testSoundFactory().play()).toBeInstanceOf(Promise);
  });

  it('Resolves the promise with an event when the sound completes.', () => {
    expect.assertions(1);
    const sound = testSoundFactory();
    const prom = sound.play();

    /* TODO: fix this awful hack around the testing library. */
    // @ts-ignore
    sound.getSourceNode().$stateAtTime = jest.fn(() => 'FINISHED');
    // @ts-ignore
    sound.getSourceNode().$process();

    return expect(prom).resolves.toBeInstanceOf(Event);
  });

  it('Rejects the promise with an event when the sound is stopped.', () => {
    expect.assertions(1);
    const sound = testSoundFactory();
    const prom = sound.play();
    sound.stop();

    return expect(prom).rejects.toBeTruthy();
  });

  it('Rejects with a custom message if a message is provided to __rejectOnStop.', () => {
    expect.assertions(1);
    const sound = testSoundFactory();
    const message = 'testfoo';
    const prom = sound.play();
    // @ts-ignore
    sound.__rejectOnStop(message);

    return expect(prom).rejects.toBe(message);
  });

  it('Rejects with a generic message if no message is provided to __rejectOnStop.', () => {
    expect.assertions(1);
    const sound = testSoundFactory();
    const prom = sound.play();
    // @ts-ignore
    sound.__rejectOnStop();

    return expect(prom).rejects.toBe('The sound was stopped, probably by a user-created script.');
  });

  it('Has a pause function which changes the playing property but leaves the track position as is.', () => {
    const sound = testSoundFactory();
    sound.setTrackPosition(2);
    sound.play();
    const trackPosition = sound.getTrackPosition();
    sound.pause();

    expect(sound.getPlaying()).toBe(false);
    expect(sound.getTrackPosition()).toBe(trackPosition);
  });

  it('Has a pause function which returns the Sound.', () => {
    const sound = testSoundFactory();
    const ret = sound.pause();

    expect(ret).toBe(sound);
  });

  it('Has a stop function which changes the playing property and resets the trackPosition property to 0.', () => {
    const sound = testSoundFactory();
    sound.setTrackPosition(3);
    sound.play().catch(() => {});
    sound.stop();

    expect(sound.getPlaying()).toBe(false);
    expect(sound.getTrackPosition()).toBe(0);
  });

  it('Has a stop function which returns the Sound.', () => {
    const sound = testSoundFactory();
    sound.play().catch(() => {});
    const ret = sound.stop();

    expect(ret).toBe(sound);
  });

  it('Has a rewind function which decreases the trackPosition property.', () => {
    const sound = testSoundFactory();
    const origPosition = 16;
    sound.setTrackPosition(origPosition);
    const toRewind = 5;
    sound.rewind(toRewind);

    expect(sound.getTrackPosition()).toBe(origPosition - toRewind);
  });

  it('Has a rewind function which returns the Sound.', () => {
    const sound = testSoundFactory();
    const ret = sound.rewind(2);

    expect(ret).toBe(sound);
  });

  it('Has a fastForward function which increases the trackPosition property.', () => {
    const sound = testSoundFactory();
    const origPosition = 12;
    sound.setTrackPosition(origPosition);
    const toFastForward = 5;
    sound.fastForward(toFastForward);

    expect(sound.getTrackPosition()).toBe(origPosition + toFastForward);
  });

  it('Has a fastForward function which returns the Sound.', () => {
    const sound = testSoundFactory();
    const ret = sound.fastForward(2);

    expect(ret).toBe(sound);
  });

  it('Has a getManagerVolume argument which is used as the getManagerVolume method.', () => {
    const getManagerVolume = jest.fn();
    const sound = testSoundFactory({ getManagerVolume, });

    expect(sound.getManagerVolume).toBe(getManagerVolume);
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

  it('Has a getFadeVolume function which calls getFadeValueAtTime with args from the destructured fade.', () => {
    const sound = testSoundFactory();
    sound.setTrackPosition(0);

    const fade: IFade = {
      easingCurve: {
        in: EasingCurves.Cubic,
        out: EasingCurves.EqualPower,
      },

      length: {
        in: 3,
        out: 3,
      },
    };

    // @ts-ignore
    sound.__fade = fade;
    sound.getFadeVolume();

    expect(getFadeValueAtTime).toBeCalledTimes(1);
    expect(getFadeValueAtTime).toBeCalledWith({
      change: 1,
      curve: fade.easingCurve.in,
      duration: fade.length.in,
      initial: 0,
      time: sound.getTrackPosition(),
    });
  });

  it('Returns 1 from getFadeVolume if there is no fade.', () => {
    expect(testSoundFactory().getFadeVolume()).toBe(1);
  });

  it('Returns 1 from getFadeVolume if there is a fade but it is not during the in or out fading windows.', () => {
    const sound = testSoundFactory();
    sound.getFade = jest.fn(() => ({
      easingCurve: {},
      length: {},
    }));

    expect(sound.getFadeVolume()).toBe(1);
  });

  it('Has a clearFadeState function which clears the fade override, cancels the fade volume scheduling, and sets the fade volume to 1.', () => {
    const sound = testSoundFactory();
    const fade = {
      easingCurve: {
        in: EasingCurves.EqualPower,
        out: EasingCurves.Cubic,
      },

      length: {
        in: 2,
        out: 2,
      },
    };

    sound.play(fade);

    expect((sound as any).__fadeOverride).toEqual(fade);

    sound.clearFadeState();

    expect((sound as any).__fadeOverride).toBeUndefined();
  });

  it('Defaults to an isPanelRegistered() of false.', () => {
    const sound = testSoundFactory();
    expect(sound.isPanelRegistered()).toBe(false);
  });
});
