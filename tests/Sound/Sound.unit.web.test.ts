import {
  Sound,
} from '../../src/Sound/Sound';

const getContext = () => new AudioContext();
const getAudioBuffer = (context: AudioContext) => context.createBuffer(1, 100, 12000);

describe('Sound unit tests.', () => {
  it('Has an isWebAudio function which returns true if the context and buffer are provided.', () => {
    const context = getContext();
    const buffer = getAudioBuffer(context);

    expect(new Sound({
      buffer,
      context,
      getManagerVolume: jest.fn(),
    }).isWebAudio()).toBe(true);
  });
  
  it('Has a getInputNode function which returns an instance of AudioNode.', () => {
    const context = getContext();
    const buffer = getAudioBuffer(context);

    expect(new Sound({
      buffer,
      context,
      getManagerVolume: jest.fn(),
    }).getInputNode()).toBeInstanceOf(AudioNode);
  });

  it('Has a getOutputNode function which returns an instance of AudioNode.', () => {
    const context = getContext();
    const buffer = getAudioBuffer(context);

    expect(new Sound({
      buffer,
      context,
      getManagerVolume: jest.fn(),
    }).getOutputNode()).toBeInstanceOf(AudioNode);
  });

  it('Has a getSourceNode function which returns an instance of AudioBufferSourceNode after it is constructed.', () => {
    const context = getContext();
    const buffer = getAudioBuffer(context);

    expect(new Sound({
      buffer,
      context,
      getManagerVolume: jest.fn(),
    }).getSourceNode()).toBeInstanceOf(AudioBufferSourceNode);
  });

  it('Has a getGainNode property which returns an instance of GainNode after it is constructed.', () => {
    const context = getContext();
    const buffer = getAudioBuffer(context);

    expect(new Sound({
      buffer,
      context,
      getManagerVolume: jest.fn(),
    }).getGainNode()).toBeInstanceOf(GainNode);
  });

  it('Has a getVolume function which returns a number.', () => {
    const context = getContext();
    const buffer = getAudioBuffer(context);

    const sound = new Sound({
      buffer,
      context,
      getManagerVolume: jest.fn(),
    });

    const volume = sound.getVolume();
    expect(volume >= 0 && volume <= 1).toBe(true);
  });

  it('Defaults to a volume of 1.', () => {
    const context = getContext();
    const buffer = getAudioBuffer(context);

    const sound = new Sound({
      buffer,
      context,
      getManagerVolume: jest.fn(),
    });

    expect(sound.getVolume()).toBe(1);
  });

  it('Allows setting the volume through the options object.', () => {
    const context = getContext();
    const buffer = getAudioBuffer(context);

    const argVol = 0.4;
    const sound = new Sound({
      buffer,
      context,
      getManagerVolume: jest.fn(),
      volume: argVol,
    });

    expect(sound.getVolume()).toBe(argVol);
  });

  it('Has a getLoop function which returns a boolean.', () => {
    const context = getContext();
    const buffer = getAudioBuffer(context);

    const sound = new Sound({
      buffer,
      context,
      getManagerVolume: jest.fn(),
    });

    expect(typeof sound.getLoop()).toBe('boolean');
  });

  it('Has a getLoop function which returns false by default.', () => {
    const context = getContext();
    const buffer = getAudioBuffer(context);

    const sound = new Sound({
      buffer,
      context,
      getManagerVolume: jest.fn(),
    });

    expect(sound.getLoop()).toBe(false);
  });

  it('Allows setting the loop through the options object.', () => {    
    const context = getContext();
    const buffer = getAudioBuffer(context);

    const loop = true;

    const sound = new Sound({
      buffer,
      context,
      loop,
      getManagerVolume: jest.fn(),
    });

    expect(sound.getLoop()).toBe(loop);
  });

  it('Has a getTrackPosition function which returns a non-negative numeric value.', () => {
    const context = getContext();
    const buffer = getAudioBuffer(context);

    const sound = new Sound({
      buffer,
      context,
      getManagerVolume: jest.fn(),
    });

    expect(sound.getTrackPosition()).toBeGreaterThanOrEqual(0);
  });

  it('Has a trackPosition which defaults to 0.', () => {
    const context = getContext();
    const buffer = getAudioBuffer(context);

    const sound = new Sound({
      buffer,
      context,
      getManagerVolume: jest.fn(),
    });

    expect(sound.getTrackPosition()).toBe(0);
  });

  it('Allows setting the trackPosition through the options object.', () => {    
    const context = getContext();
    const buffer = getAudioBuffer(context);

    const trackPosition = 0.5;

    const sound = new Sound({
      buffer,
      context,
      trackPosition,
      getManagerVolume: jest.fn(),
    });

    expect(sound.getTrackPosition()).toBe(trackPosition);
  });

  it('Has a getPlaying function which returns a boolean.', () => {
    const context = getContext();
    const buffer = getAudioBuffer(context);

    const sound = new Sound({
      buffer,
      context,
      getManagerVolume: jest.fn(),
    });

    expect(typeof sound.getPlaying()).toBe('boolean');
  });

  it('Has a playing value which defaults to false.', () => {
    const context = getContext();
    const buffer = getAudioBuffer(context);

    const sound = new Sound({
      buffer,
      context,
      getManagerVolume: jest.fn(),
    });

    expect(sound.getPlaying()).toBe(false);
  });

  it('Allows setting the playing value through the autoplay property of the options object.', () => {    
    const context = getContext();
    const buffer = getAudioBuffer(context);

    const autoplay = true;

    const sound = new Sound({
      autoplay,
      buffer,
      context,
      getManagerVolume: jest.fn(),
    });

    expect(sound.getPlaying()).toBe(autoplay);
  });

  it('Has a getContextCurrentTime function which returns the currentTime property of the AudioContext passed in the options object.', () => {
    const context = getContext();
    const buffer = getAudioBuffer(context);

    const sound = new Sound({
      buffer,
      context,
      getManagerVolume: jest.fn(),
    });

    expect(sound.getContextCurrentTime()).toBe(context.currentTime);
  });

  it('Has a setVolume function which alters the volume property.', () => {
    const context = getContext();
    const buffer = getAudioBuffer(context);

    const sound = new Sound({
      buffer,
      context,
      getManagerVolume: jest.fn(),
    });

    const newVol = 0.5;
    expect(sound.setVolume(newVol).getVolume()).toBe(newVol);
  });

  it('Has a setLoop function which changes the loop property.', () => {
    const context = getContext();
    const buffer = getAudioBuffer(context);

    const sound = new Sound({
      buffer,
      context,
      getManagerVolume: jest.fn(),
    });

    const newVal = !sound.getLoop();
    expect(sound.setLoop(newVal).getLoop()).toBe(newVal);
  });

  it('Has a setTrackPosition function which changes the representation returned by the trackPosition property.', () => {
    const context = getContext();
    const buffer = getAudioBuffer(context);

    const sound = new Sound({
      buffer,
      context,
      getManagerVolume: jest.fn(),
    });

    const newVal = sound.getTrackPosition() + 500;
    expect(sound.setTrackPosition(newVal).getTrackPosition()).toBe(newVal);
  });

  it('Has a play function which changes the result of the getPlaying function.', () => {
    const context = getContext();
    const buffer = getAudioBuffer(context);

    const sound = new Sound({
      buffer,
      context,
      getManagerVolume: jest.fn(),
    });

    expect(sound.play().getPlaying()).toBe(true);
  });

  it('Has a pause function which changes the playing property but leaves the track position as is.', () => {
    const context = getContext();
    const buffer = getAudioBuffer(context);

    const sound = new Sound({
      buffer,
      context,
      getManagerVolume: jest.fn(),
    });

    sound.setTrackPosition(2);
    sound.play();
    const trackPosition = sound.getTrackPosition();
    sound.pause();

    expect(sound.getPlaying() === false &&
           sound.getTrackPosition() === trackPosition).toBe(true);
  });

  it('Has a stop function which changes the playing property and resets the trackPosition property to 0.', () => {
    const context = getContext();
    const buffer = getAudioBuffer(context);

    const sound = new Sound({
      buffer,
      context,
      getManagerVolume: jest.fn(),
    });

    sound.setTrackPosition(3);
    sound.play();
    sound.stop();

    expect(sound.getPlaying() === false &&
           sound.getTrackPosition() === 0).toBe(true);
  });

  it('Has a rewind function which decreases the trackPosition property.', () => {
    const context = getContext();
    const buffer = getAudioBuffer(context);

    const sound = new Sound({
      buffer,
      context,
      getManagerVolume: jest.fn(),
    });

    const origPosition = 16;
    sound.setTrackPosition(origPosition);
    const toRewind = 5;
    sound.rewind(toRewind);

    expect(sound.getTrackPosition()).toBe(origPosition - toRewind);
  });

  it('Has a fastForward function which increases the trackPosition property.', () => {
    const context = getContext();
    const buffer = getAudioBuffer(context);

    const sound = new Sound({
      buffer,
      context,
      getManagerVolume: jest.fn(),
    });

    const origPosition = 12;
    sound.setTrackPosition(origPosition);
    const toFastForward = 5;
    sound.fastForward(toFastForward);

    expect(sound.getTrackPosition()).toBe(origPosition + toFastForward);
  });
});
