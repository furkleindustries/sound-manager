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
  Sound,
} from '../../src/Sound/Sound';

const testSoundFactory = (options?: Partial<ISoundOptions>) => {
  const audioElement = {
    ...new Audio('./'),
    play: jest.fn(),
    pause: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    loop: false,
  };
  
  return new Sound({
    audioElement,
    getManagerVolume: jest.fn(() => 1),
    ...options,
  });
};

describe('Sound HTML5 Audio unit tests.', () => {
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

  it('Has an isWebAudio function which returns false if the audio element is provided.', () => {
    expect(testSoundFactory().isWebAudio()).toBe(false);
  });

  it('Has a getGainNode function which throws when in HTML Audio mode.', () => {
    const func = () => testSoundFactory().getGainNode();
    expect(func).toThrow();
  });

  it('Has a getInputNode function which throws when in HTML Audio mode.', () => {
    const func = () => testSoundFactory().getInputNode();
    expect(func).toThrow();
  });

  it('Has a getOutputNode function which throws when in HTML Audio mode.', () => {
    const func = () => testSoundFactory().getOutputNode();
    expect(func).toThrow();
  });

  it('Has a getSourceNode function which throws when in HTML Audio mode.', () => {
    const func = () => testSoundFactory().getSourceNode();
    expect(func).toThrow();
  });

  it('Has a getFadeGainNode function which throws when in HTML Audio mode.', () => {
    const func = () => testSoundFactory().getFadeGainNode();
    expect(func).toThrow();
  });

  it('Has a getContextCurrentTime function which throws when in HTML Audio mode.', () => {
    const func = () => testSoundFactory().getContextCurrentTime();
    expect(func).toThrow();
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

  it('Mutates the __startedTime private property if the sound is playing.', () => {
    const sound = testSoundFactory();
    sound.play();
    const difference = 5;
    // @ts-ignore
    const beforeStartedTime = sound.__startedTime;
    sound.setTrackPosition(sound.getTrackPosition() + difference);
    const afterStartedTime = sound.getTrackPosition();
    sound.stop();

    expect(beforeStartedTime).toBe(afterStartedTime - difference);
  });

  it('Has a getDuration function which returns the duration of the audio element.', () => {
    const sound = testSoundFactory();
    expect(sound.getDuration()).toBe(
      // @ts-ignore
      sound.__audioElement.duration);
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

  it('Allows setting the loop through the options object.', () => {
    const loop = true;
    const sound = testSoundFactory({ loop, });

    expect(sound.getLoop()).toBe(loop);
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
    sound.updateAudioElementVolume = mock;

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

  it('Does not fade on play if the track position is greater than the in length of the IFade.', () => {
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
  });
  

  it('Fades on end if the track position is less than the out length of the IFade.', () => {
    const sound = testSoundFactory();
    const mock = jest.fn();
    // @ts-ignore
    sound.updateAudioElementVolume = mock;


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

  it('Outputs a promise when played.', () => {
    expect(testSoundFactory().play()).toBeInstanceOf(Promise);
  });

  /*it('Resolves the promise with an event when the sound completes.', () => {
    expect.assertions(1);
    const sound = testSoundFactory();
    const prom = sound.play();

    // @ts-ignore
    sound.__audioElement.currentTime = sound.__audioElement.duration;

    return expect(prom).resolves.toBeInstanceOf(Event);
  });*/

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
    sound.play();
    sound.stop();

    expect(sound.getPlaying()).toBe(false);
    expect(sound.getTrackPosition()).toBe(0);
  });

  it('Has a stop function which returns the Sound.', () => {
    const sound = testSoundFactory();
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

  it('Has a function called updateAudioElementVolume which returns the sound.', () => {
    const sound = testSoundFactory();
    const ret = sound.updateAudioElementVolume();

    expect(ret).toBe(sound);
  });

  it('Has a getFadeVolume function which calls getFadeValueAtTime with args from the destructured fade.', () => {
    const sound = testSoundFactory();
    const mock = jest.fn();
    sound.getFadeValueAtTime = mock;
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

    expect(mock).toBeCalledTimes(1);
    expect(mock).toBeCalledWith({
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

  it('Has a getFadeValueAtTime method which emits a number.', () => {
    const fadeOpts = {
      curve: EasingCurves.Linear,
      change: 1,
      duration: 2,
      initial: 0,
      time: 1,
    };

    expect(testSoundFactory().getFadeValueAtTime(fadeOpts)).toBe(0.5);
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

    expect((sound as any).__fadeOverride).toBe(fade);

    sound.clearFadeState();

    expect((sound as any).__fadeOverride).toBeUndefined();
  });

  it('Defaults to an isPanelRegistered() of false.', () => {
    const sound = testSoundFactory();
    expect(sound.isPanelRegistered()).toBe(false);
  });
});
