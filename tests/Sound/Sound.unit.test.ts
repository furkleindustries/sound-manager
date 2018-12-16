import {
  Sound,
} from '../../src/Sound/Sound';;

const getContext = () => new AudioContext();
const getAudioBuffer = (context: AudioContext) => context.createBuffer(1, 100, 12000);

describe('Sound unit tests.', () => {
  it('Has an inputNode property which is an instance of AudioNode.', () => {
    const context = getContext();
    const buffer = getAudioBuffer(context);

    expect(new Sound({
      buffer,
      context,
    }).inputNode).toBeInstanceOf(AudioNode);
  });

  it('Has an outputNode property which is an instance of AudioNode.', () => {
    const context = getContext();
    const buffer = getAudioBuffer(context);

    expect(new Sound({
      buffer,
      context,
    }).outputNode).toBeInstanceOf(AudioNode);
  });

  it('Has a sourceNode property which is an instance of AudioBufferSourceNode after it is constructed.', () => {
    const context = getContext();
    const buffer = getAudioBuffer(context);

    expect(new Sound({
      buffer,
      context,
    }).sourceNode).toBeInstanceOf(AudioBufferSourceNode);
  });

  it('Has a sourceNode property which is readonly.', () => {
    const context = getContext();
    const buffer = getAudioBuffer(context);

    const sound = new Sound({
      buffer,
      context,
    });

    const sourceNode = sound.sourceNode;
    const sym = Symbol('fail');
    // @ts-ignore
    sound.sourceNode = sym;
    expect(sound.sourceNode === sourceNode && sound.sourceNode !== sym as any).toBe(true);
  });

  it('Has a gainNode property which is an instance of GainNode after it is constructed.', () => {
    const context = getContext();
    const buffer = getAudioBuffer(context);

    expect(new Sound({
      buffer,
      context,
    }).gainNode).toBeInstanceOf(GainNode);
  });

  it('Has a gainNode property which is readonly.', () => {
    const context = getContext();
    const buffer = getAudioBuffer(context);

    const sound = new Sound({
      buffer,
      context,
    });

    const gainNode = sound.gainNode;
    const sym = Symbol('fail');
    // @ts-ignore
    sound.gainNode = sym;
    expect(sound.gainNode === gainNode && sound.gainNode !== sym as any).toBe(true);
  });

  it('Has a volume property which is a number.', () => {
    const context = getContext();
    const buffer = getAudioBuffer(context);

    const sound = new Sound({
      buffer,
      context,
    });

    const volume = sound.volume;
    expect(volume >= 0 && volume <= 1).toBe(true);
  });

  it('Has a volume property which is readonly.', () => {
    const context = getContext();
    const buffer = getAudioBuffer(context);

    const sound = new Sound({
      buffer,
      context,
    });

    const volume = sound.volume;
    const sym = Symbol('fail');
    // @ts-ignore
    sound.volume = sym;
    expect(sound.volume === volume && sound.volume as any !== sym).toBe(true);
  });

  it('Defaults to a volume of 1.', () => {
    const context = getContext();
    const buffer = getAudioBuffer(context);

    const sound = new Sound({
      buffer,
      context,
    });

    expect(sound.volume).toBe(1);
  });

  it('Allows setting the volume through the options object.', () => {
    const context = getContext();
    const buffer = getAudioBuffer(context);

    const argVol = 0.4;
    const sound = new Sound({
      buffer,
      context,
      volume: argVol,
    });

    expect(sound.volume).toBe(argVol);
  });

  it('Has a boolean loop property.', () => {
    const context = getContext();
    const buffer = getAudioBuffer(context);

    const sound = new Sound({
      buffer,
      context,
    });

    expect(typeof sound.loop).toBe('boolean');
  });

  it('Has a loop property which is readonly.', () => {
    const context = getContext();
    const buffer = getAudioBuffer(context);

    const sound = new Sound({
      buffer,
      context,
    });

    const loop = sound.loop;
    const sym = Symbol('fail');
    // @ts-ignore
    sound.loop = sym;
    expect(sound.loop === loop && sound.loop as any !== sym).toBe(true);
  });

  it('Has a loop property which defaults to false.', () => {
    const context = getContext();
    const buffer = getAudioBuffer(context);

    const sound = new Sound({
      buffer,
      context,
    });

    expect(sound.loop).toBe(false);
  });

  it('Allows setting the loop property through the options object.', () => {    
    const context = getContext();
    const buffer = getAudioBuffer(context);

    const loop = true;

    const sound = new Sound({
      buffer,
      context,
      loop,
    });

    expect(sound.loop).toBe(loop);
  });

  it('Has a numeric, non-negative trackPosition property.', () => {
    const context = getContext();
    const buffer = getAudioBuffer(context);

    const sound = new Sound({
      buffer,
      context,
    });

    expect(sound.trackPosition).toBeGreaterThanOrEqual(0);
  });

  it('Has a trackPosition property which is readonly.', () => {
    const context = getContext();
    const buffer = getAudioBuffer(context);

    const sound = new Sound({
      buffer,
      context,
    });

    const trackPosition = sound.trackPosition;
    const sym = Symbol('fail');
    // @ts-ignore
    sound.trackPosition = sym;
    expect(sound.trackPosition === trackPosition && sound.trackPosition as any !== sym).toBe(true);
  });

  it('Has a trackPosition property which defaults to 0.', () => {
    const context = getContext();
    const buffer = getAudioBuffer(context);

    const sound = new Sound({
      buffer,
      context,
    });

    expect(sound.trackPosition).toBe(0);
  });

  it('Allows setting the trackPosition property through the options object.', () => {    
    const context = getContext();
    const buffer = getAudioBuffer(context);

    const trackPosition = 0.5;

    const sound = new Sound({
      buffer,
      context,
      trackPosition,
    });

    expect(sound.trackPosition).toBe(trackPosition);
  });

  it('Has a boolean playing property.', () => {
    const context = getContext();
    const buffer = getAudioBuffer(context);

    const sound = new Sound({
      buffer,
      context,
    });

    expect(typeof sound.playing).toBe('boolean');
  });

  it('Has a playing property which is readonly.', () => {
    const context = getContext();
    const buffer = getAudioBuffer(context);

    const sound = new Sound({
      buffer,
      context,
    });

    const playing = sound.playing;
    const sym = Symbol('fail');
    // @ts-ignore
    sound.playing = sym;
    expect(sound.playing === playing && sound.playing as any !== sym).toBe(true);
  });

  it('Has a playing property which defaults to false.', () => {
    const context = getContext();
    const buffer = getAudioBuffer(context);

    const sound = new Sound({
      buffer,
      context,
    });

    expect(sound.playing).toBe(false);
  });

  it('Allows setting the playing property through the autoplay property of the options object.', () => {    
    const context = getContext();
    const buffer = getAudioBuffer(context);

    const autoplay = true;

    const sound = new Sound({
      autoplay,
      buffer,
      context,
    });

    expect(sound.play).toBe(autoplay);
  });

  it('Has a getContextCurrentTime function which returns the currentTime property of the AudioContext passed in the options object.', () => {
    const context = getContext();
    const buffer = getAudioBuffer(context);

    const sound = new Sound({
      buffer,
      context,
    });

    expect(sound.getContextCurrentTime()).toBe(context.currentTime);
  });

  it('Has a setVolume function which alters the volume property.', () => {
    const context = getContext();
    const buffer = getAudioBuffer(context);

    const sound = new Sound({
      buffer,
      context,
    });

    const newVol = 0.5;
    expect(sound.setVolume(newVol).volume).toBe(newVol);
  });

  it('Has a setLoop function which changes the loop property.', () => {
    const context = getContext();
    const buffer = getAudioBuffer(context);

    const sound = new Sound({
      buffer,
      context,
    });

    const newVal = !sound.loop;
    expect(sound.setLoop(newVal).loop).toBe(newVal);
  });

  it('Has a setTrackPosition function which changes the representation returned by the trackPosition property.', () => {
    const context = getContext();
    const buffer = getAudioBuffer(context);

    const sound = new Sound({
      buffer,
      context,
    });

    const newVal = sound.trackPosition + 500;
    expect(sound.setTrackPosition(newVal).trackPosition).toBe(newVal);
  });

  it('Has a play function which changes the playing property.', () => {
    const context = getContext();
    const buffer = getAudioBuffer(context);

    const sound = new Sound({
      buffer,
      context,
    });

    expect(sound.play().playing).toBe(true);
  });

  it('Has a pause function which changes the playing property but leaves the track position as is.', () => {
    const context = getContext();
    const buffer = getAudioBuffer(context);

    const sound = new Sound({
      buffer,
      context,
    });

    sound.setTrackPosition(2);
    sound.play();
    const trackPosition = sound.trackPosition;
    sound.pause();

    expect(sound.playing === false && sound.trackPosition === trackPosition).toBe(true);
  });

  it('Has a stop function which changes the playing property and resets the trackPosition property to 0.', () => {
    const context = getContext();
    const buffer = getAudioBuffer(context);

    const sound = new Sound({
      buffer,
      context,
    });

    sound.setTrackPosition(3);
    sound.play();
    sound.stop();

    expect(sound.playing === false && sound.trackPosition === 0).toBe(true);
  });

  it('Has a rewind function which decreases the trackPosition property.', () => {
    const context = getContext();
    const buffer = getAudioBuffer(context);

    const sound = new Sound({
      buffer,
      context,
    });

    const origPosition = 16;
    sound.setTrackPosition(origPosition);
    const toRewind = 5;
    sound.rewind(toRewind);

    expect(sound.trackPosition).toBe(origPosition - toRewind);
  });

  it('Has a fastForward function which increases the trackPosition property.', () => {
    const context = getContext();
    const buffer = getAudioBuffer(context);

    const sound = new Sound({
      buffer,
      context,
    });

    const origPosition = 12;
    sound.setTrackPosition(origPosition);
    const toFastForward = 5;
    sound.fastForward(toFastForward);

    expect(sound.trackPosition).toBe(origPosition + toFastForward);
  });
});
