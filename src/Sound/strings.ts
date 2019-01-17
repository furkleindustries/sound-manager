export const strings = {
  CREATE_SOUND_BOTH_FAILED:
    'Generating HTML5 Audio failed too. Cannot construct Sound.',

  CREATE_SOUND_FALLBACK_WARNING:
    'Manager is not in Web Audio mode. Falling back to HTML5 Audio.',

  CREATE_SOUND_HTML_AUDIO_FAILED:
    'Generating HTML5 Audio failed. Cannot construct Sound.',

  CREATE_SOUND_OPTIONS_INVALID:
    'The options argument was not provided to createSound.',

  CREATE_SOUND_WEB_AUDIO_FAILED:
    'Loading Web Audio failed. Falling back to HTML5 audio.',

  CTOR_AUDIO_ELEMENT_INVALID:
    'The audioElement property of the argument object was not present. This ' +
    'must be included when the node is operating in HTML Audio mode.',

  CTOR_BUFFER_INVALID:
    'The buffer property of the argument object was not present. This must ' +
    'be included when the node is operating in Web Audio mode.',

  CTOR_GET_MANAGER_VOLUME_INVALID:
    'The getManagerVolume property of the argument object was not present. ' +
    'This must be included when the node is operating in HTML Audio mode.',

  CTOR_OPTIONS_INVALID:
    'The options argument was not present.',

  GET_DURATION_AUDIO_ELEMENT_INVALID:
    'The audio element was not present but is necessary for getting the ' +
    'duration when the node is operating in HTML Audio mode.',

  GET_DURATION_BUFFER_INVALID:
    'The buffer was not present but is necessary for getting the duration ' +
    'when the node is operating in Web Audio mode.',

  GET_FADE_GAIN_NODE_NODE_INVALID:
    'The fade gain node was not present.',

  GET_LOOP_AUDIO_ELEMENT_INVALID:
    'The audio element was not present but is necessary for getting the ' +
    'loop property when the node is operating in HTML Audio mode.',

  GET_SOURCE_NODE_NODE_INVALID:
    'The source node was not present.',

  GET_TRACK_POSITION_AUDIO_ELEMENT_INVALID:
    'The audio element was not present but is necessary for getting the ' +
    'track position when the node is operating in HTML Audio mode.',

  INITIALIZE_SOUND_FOR_WEB_AUDIO_BUFFER_INVALID:
    'The buffer was not present but is necessary for initializing Sound ' +
    'objects in Web Audio mode.',

  SET_LOOP_AUDIO_ELEMENT_INVALID:
    'The audio element was not present but is necessary for use of the ' +
    'setLoop property when the node is operating in HTML Audio mode.',

  SET_TRACK_POSITION_AUDIO_ELEMENT_INVALID:
    'The audio element was not present but is necessary for setting the ' +
    'track position when the node is operating in HTML Audio mode.',
};
