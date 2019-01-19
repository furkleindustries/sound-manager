import {
  playAudioSource, 
} from '../../src/Sound/playAudioSource';
import {
  strings,
} from '../../src/Sound/strings';

describe('playAudioSource unit tests.', () => {
  it('Throws if the sound argument is not provided.', () => {
    // @ts-ignore
    const func = () => playAudioSource();
    expect(func).toThrow(strings.PLAY_AUDIO_SOURCE_SOUND_INVALID);
  });

  it('Throws if the sound is playing.', () => {
    // @ts-ignore
    const func = () => playAudioSource({ isPlaying: jest.fn(() => true) });
    expect(func).toThrow(strings.PLAY_AUDIO_SOURCE_SOUND_PLAYING);
  });

  it('Gets the sound\'s track position.', () => {
    const mock = jest.fn();
    playAudioSource({
      isPlaying: jest.fn(),
      getSourceNode: jest.fn(() => ({ start: jest.fn() })),
      getTrackPosition: mock,
      isWebAudio: jest.fn(() => true),
    } as any,
    {
      play: jest.fn(),
    } as any);

    expect(mock).toBeCalledTimes(1);
  });

  it('Calls the sound\'s getSourceNode method if it is in web mode, and passes the track position to the start method of the source node.', () => {
    const startMock = jest.fn();
    const gsnMock = jest.fn(() => ({ start: startMock }));
    const trackPosition = 2;

    const sound = {
      getSourceNode: gsnMock,
      getTrackPosition: jest.fn(() => trackPosition),
      isPlaying: jest.fn(),
      isWebAudio: jest.fn(() => true),
    } as any;

    playAudioSource(sound);

    expect(gsnMock).toBeCalledTimes(1);
    expect(startMock).toBeCalledTimes(1);
    expect(startMock).toBeCalledWith(trackPosition);
  });

  it('Calls the sound\'s updateAudioElement method if it is in HTML mode.', () => {
    const updateMock = jest.fn();

    const sound = {
      getTrackPosition: jest.fn(() => 3),
      isPlaying: jest.fn(),
      isWebAudio: jest.fn(),
      updateAudioElementVolume: updateMock,
    } as any;

    const audio = { play: jest.fn() } as any;

    playAudioSource(sound, audio);

    expect(updateMock).toBeCalledTimes(1);
  });

  it('Throws if it is in HTML mode and the audioElement argument is not present.', () => {
    const updateMock = jest.fn();

    const sound = {
      getTrackPosition: jest.fn(() => 3),
      isPlaying: jest.fn(),
      isWebAudio: jest.fn(),
      updateAudioElementVolume: updateMock,
    } as any;

    // @ts-ignore
    const func = () => playAudioSource(sound);

    expect(func).toThrow(strings.PLAY_AUDIO_SOURCE_AUDIO_ELEMENT_INVALID);
  });

  it('Calls the sound\'s updateAudioElement method if it is in HTML mode.', () => {
    const updateMock = jest.fn();

    const sound = {
      getTrackPosition: jest.fn(() => 3),
      isPlaying: jest.fn(),
      isWebAudio: jest.fn(),
      updateAudioElementVolume: updateMock,
    } as any;

    const audio = { play: jest.fn() } as any;

    playAudioSource(sound, audio);

    expect(updateMock).toBeCalledTimes(1);
  });

  it('Sets the audio element\'s currentTime property to the track position if the Sound is in HTML mode.', () => {
    const trackPosition = 5;
    const sound = {
      getTrackPosition: jest.fn(() => trackPosition),
      isPlaying: jest.fn(),
      isWebAudio: jest.fn(),
      updateAudioElementVolume: jest.fn(),
    } as any;

    const audio = { play: jest.fn() } as any;

    playAudioSource(sound, audio);

    expect(audio.currentTime).toBe(trackPosition);
  });

  it('Calls play on the audio element if the Sound is is in HTML mode.', () => {
    const playMock = jest.fn();
    const sound = {
      getTrackPosition: jest.fn(() => 6),
      isPlaying: jest.fn(),
      isWebAudio: jest.fn(),
      updateAudioElementVolume: jest.fn(),
    } as any;

    const audio = { play: playMock } as any;

    playAudioSource(sound, audio);

    expect(playMock).toBeCalledTimes(1);
  });
});
