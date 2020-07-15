import {
  playAudioSource, 
  strings,
} from '../../src/Sound/playAudioSource';

describe('playAudioSource unit tests.', () => {
  it('Throws if the sound argument is not provided.', () => {
    // @ts-ignore
    const func = () => playAudioSource();
    expect(func).toThrow(strings.SOUND_INVALID);
  });

  it('Throws if the sound is playing.', () => {
    // @ts-ignore
    const func = () => playAudioSource({ isPlaying: jest.fn(() => true) });
    expect(func).toThrow(strings.SOUND_PLAYING);
  });

  it('Gets the sound\'s track position.', () => {
    const mock = jest.fn();
    playAudioSource(
      {
        isPlaying: jest.fn(),
        getSourceNode: jest.fn(() => ({ start: jest.fn() })),
        getTrackPosition: mock,
      } as any,
      { play: jest.fn() } as any,
    );

    expect(mock).toBeCalledTimes(1);
  });

  it('Calls the sound\'s updateAudioElement method.', () => {
    const updateMock = jest.fn();

    const sound = {
      getTrackPosition: jest.fn(() => 3),
      isPlaying: jest.fn(),
      updateAudioElementVolume: updateMock,
    } as any;

    const audio = { play: jest.fn() } as any;
    playAudioSource(sound, audio);

    expect(updateMock).toBeCalledTimes(1);
  });

  it('Throws if the audioElement argument is not present.', () => {
    const updateMock = jest.fn();

    const sound = {
      getTrackPosition: jest.fn(() => 3),
      isPlaying: jest.fn(),
      updateAudioElementVolume: updateMock,
    } as any;

    // @ts-ignore
    const func = () => playAudioSource(sound);

    expect(func).toThrow(strings.AUDIO_ELEMENT_INVALID);
  });

  it('Calls the sound\'s updateAudioElement method.', () => {
    const updateMock = jest.fn();

    const sound = {
      getTrackPosition: jest.fn(() => 3),
      isPlaying: jest.fn(),
      updateAudioElementVolume: updateMock,
    } as any;

    const audio = { play: jest.fn() } as any;

    playAudioSource(sound, audio);

    expect(updateMock).toBeCalledTimes(1);
  });

  it('Sets the audio element\'s currentTime property to the track position.', () => {
    const trackPosition = 5;
    const sound = {
      getTrackPosition: jest.fn(() => trackPosition),
      isPlaying: jest.fn(),
      updateAudioElementVolume: jest.fn(),
    } as any;

    const audio = { play: jest.fn() } as any;

    playAudioSource(sound, audio);

    expect(audio.currentTime).toBe(trackPosition);
  });

  it('Calls play on the audio element.', () => {
    const playMock = jest.fn();
    const sound = {
      getTrackPosition: jest.fn(() => 6),
      isPlaying: jest.fn(),
      updateAudioElementVolume: jest.fn(),
    } as any;

    const audio = { play: playMock } as any;

    playAudioSource(sound, audio);

    expect(playMock).toBeCalledTimes(1);
  });
});
