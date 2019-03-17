import {
  EasingCurves,
} from '../../src/Fade/EasingCurves';
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
  it('Has a type of NodeTypes.Sound.', () => {
    expect(testSoundFactory().type).toBe(NodeTypes.Sound);
  });

  it('Throws if the options argument prop is falsy.', () => {
    // @ts-ignore
    const func = () => new Sound();
    expect(func).toThrow(strings.CTOR_OPTIONS_INVALID);
  });

  it('Throws if the audioElement argument prop is falsy.', () => {
    // @ts-ignore
    const func = () => new Sound({ audioElement: null });
    expect(func).toThrow(strings.CTOR_AUDIO_ELEMENT_INVALID);
  });

  it('Sets the audio element to the value passed in the constructor.', () => {
    const obj = {};
    const sound = new Sound({
      getManagerVolume: jest.fn(() => 1),
      // @ts-ignore
      audioElement: obj,
    });

    expect(sound.__audioElement).toBe(obj);
  });

  it('Sets the getManagerVolume function to the value passed in the constructor.', () => {
    const mock = jest.fn(() => 1);
    const sound = new Sound({
      getManagerVolume: mock,
      // @ts-ignore
      audioElement: {},
    });

    expect(sound.getManagerVolume).toBe(mock);
  });

  it('Allows setting the loop through the options object.', () => {
    const loop = true;
    const sound = testSoundFactory({ loop, });

    expect(sound.getLoop()).toBe(loop);
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

  it('Has a setVolume function which alters the volume property and updates the audio element volume.', () => {
    const newVol = 0.5;
    const mock = jest.fn();
    const sound = testSoundFactory();
    (sound as any).updateAudioElementVolume = mock;
    sound.setVolume(newVol);

    expect(sound.getVolume()).toBe(newVol);
    expect(mock).toBeCalledTimes(1);
  });

  it('Has a setVolume function which returns the Sound.', () => {
    const sound = testSoundFactory();
    expect(sound.setVolume(0.8)).toBe(sound);
  });

  it('Has a getTrackPosition function which returns a non-negative numeric value.', () => {
    expect(testSoundFactory().getTrackPosition()).toBeGreaterThanOrEqual(0);
  });

  it('Has a getTrackPosition function which returns the currentTime property of the audio element if isPlaying method returns true.', () => {
    const currentTime = 15;
    const sound = testSoundFactory();
    (sound as any).isPlaying = jest.fn(() => true);
    // @ts-ignore
    sound.__audioElement = {
      // @ts-ignore
      ...sound.__audioElement,
      currentTime,
    };

    expect(sound.getTrackPosition()).toBe(currentTime);
  });

  it('Has a getTrackPosition function which returns the __pausedTime property if the isPlaying method returns false.', () => {
    const sym = Symbol('paused')
    const sound = testSoundFactory();
    (sound as any).isPlaying = jest.fn();
    // @ts-ignore
    sound.__pausedTime = sym;

    expect(sound.getTrackPosition()).toBe(sym);
  });

  it('Has a getTrackPosition function which throws if the audio element is not present.', () => {
    const sound = testSoundFactory();
    (sound as any).isPlaying = jest.fn(() => true);
    // @ts-ignore
    delete sound.__audioElement;
    const func = () => sound.getTrackPosition();

    expect(func).toThrow(strings.GET_TRACK_POSITION_AUDIO_ELEMENT_INVALID);
  });

  it('Has a track position which defaults to 0.', () => {
    expect(testSoundFactory().getTrackPosition()).toBe(0);
  });

  it('Allows setting the trackPosition through the options object.', () => {    
    const trackPosition = 0.5;
    expect(testSoundFactory({ trackPosition }).getTrackPosition()).toBe(trackPosition);
  });

  it('Has a setTrackPosition function which changes the representation returned by the trackPosition property.', () => {
    const sound = testSoundFactory();
    const newVal = sound.getTrackPosition() + 500;

    expect(sound.setTrackPosition(newVal).getTrackPosition()).toBe(newVal);
  });

  it('Has a setTrackPosition function which sets audio element\'s currentTime property if the isPlaying method returns true.', () => {
    const sound = testSoundFactory();
    const newVal = 12;
    (sound as any).isPlaying = jest.fn(() => true);
    sound.setTrackPosition(newVal);

    // @ts-ignore
    expect(sound.__audioElement.currentTime).toBe(newVal);
  });

  it('Has a setTrackPosition function which sets the paused time if the isPlaying method returns false.', () => {
    const sound = testSoundFactory();
    const newVal = 12;
    sound.setTrackPosition(newVal);

    // @ts-ignore
    expect(sound.__pausedTime).toBe(newVal);
  });

  it('Has a setTrackPosition function which throws if the sound is playing and the audio element is falsy.', () => {
    const sound = testSoundFactory();
    (sound as any).isPlaying = jest.fn(() => true);
    // @ts-ignore
    delete sound.__audioElement;
    const func = () => sound.setTrackPosition(53);

    expect(func).toThrow(strings.SET_TRACK_POSITION_AUDIO_ELEMENT_INVALID);
  });

  it('Has a setTrackPosition function which returns the Sound.', () => {
    const sound = testSoundFactory();
    expect(sound.setTrackPosition(1)).toBe(sound);
  });

  it('Has a getDuration function which returns the duration of the audio element.', () => {
    const sound = testSoundFactory();
    const dur = 12;
    // @ts-ignore
    Object.assign(sound.__audioElement, { duration: dur });
    expect(sound.getDuration()).toBe(dur);
  });

  it('Has a getDuration property which throws if there is no audio element.', () => {
    const sound = testSoundFactory();
    // @ts-ignore
    delete sound.__audioElement;
    const func = () => sound.getDuration();

    expect(func).toThrow(strings.GET_DURATION_AUDIO_ELEMENT_INVALID);
  });

  it('Has an isPlaying function which returns a boolean.', () => {
    expect(typeof testSoundFactory().isPlaying()).toBe('boolean');
  });

  it('Has an isPlaying function which returns the __playing property.', () => {
    const sym = Symbol('playing');
    const sound = testSoundFactory();
    // @ts-ignore
    sound.__playing = sym;

    expect(sound.isPlaying()).toBe(sym);
  });

  it('Has an isPlaying function which defaults to false.', () => {
    expect(testSoundFactory().isPlaying()).toBe(false);
  });

  it('Has a getLoop property which returns a boolean.', () => {
    expect(typeof testSoundFactory().getLoop()).toBe('boolean');
  });

  it('Has a getLoop function which returns the loop override if it has been set.', () => {
    const sym = Symbol('loop');
    const sound = testSoundFactory();
    // @ts-ignore
    sound.__loopOverride = sym;

    expect(sound.getLoop()).toBe(sym);
  });

  it('Has a getLoop function which returns the loop property from the audio element.', () => {
    const sym = Symbol('loop');
    const sound = testSoundFactory();
    // @ts-ignore
    sound.__audioElement.loop = sym;

    expect(sound.getLoop()).toBe(sym);
  });

  it('Has a getLoop function which throws if the the audio element is not present.', () => {
    const sound = testSoundFactory();
    // @ts-ignore
    delete sound.__audioElement;
    const func = () => sound.getLoop();

    expect(func).toThrow(strings.GET_LOOP_AUDIO_ELEMENT_INVALID);
  });

  it('Has a getLoop function which defaults to false.', () => {
    expect(testSoundFactory().getLoop()).toBe(false);
  });

  it('Has a setLoop function which sets the loop property of the audio element.', () => {
    const sym = Symbol('loop');
    const sound = testSoundFactory();
    // @ts-ignore
    sound.setLoop(sym);

    // @ts-ignore
    expect(sound.__audioElement.loop).toBe(sym);
  });

  it('Has a setLoop function which returns the Sound.', () => {
    const sound = testSoundFactory();
    // @ts-ignore
    expect(sound.setLoop()).toBe(sound);
  });

  it('Has a getFade function which returns the fade override if it is set.', () => {
    const sym = Symbol('fade-override');
    const sound = testSoundFactory();
    // @ts-ignore
    sound.__fadeOverride = sym;

    expect(sound.getFade()).toBe(sym);
  });

  it('Has a getFade function which returns the fade override if it is set.', () => {
    const sym = Symbol('fade');
    const sound = testSoundFactory();
    // @ts-ignore
    sound.__fade = sym;

    expect(sound.getFade()).toBe(sym);
  });

  it('Has a getFade function which returns null by default.', () => {
    expect(testSoundFactory().getFade()).toBe(null);
  });

  it('Has a setFade function which sets the fade property.', () => {
    const sym = Symbol('fade');
    const sound = testSoundFactory();
    // @ts-ignore
    sound.setFade(sym);

    expect(sound.getFade()).toBe(sym);
  });

  it('Has a setFade function which returns the Sound.', () => {
    const sym = Symbol('fade');
    const sound = testSoundFactory();
    
    // @ts-ignore
    expect(sound.setFade(sym)).toBe(sound);
  });  

  it('Has a stop function which returns the Sound.', () => {
    const sound = testSoundFactory();
    expect(sound.stop()).toBe(sound);
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

  it('Returns 1 from getFadeVolume if there is no fade.', () => {
    expect(testSoundFactory().getFadeVolume()).toBe(1);
  });
});
