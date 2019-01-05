import {
  assert,
} from '../assertions/assert';
import {
  ISoundGroupIdentifier,
} from '../interfaces/ISoundGroupIdentifier';
import {
  TSoundGroupIdentifierArg,
} from '../typeAliases/TSoundGroupIdentifierArg';

export function makeSoundGroupIdentifier(value: TSoundGroupIdentifierArg): ISoundGroupIdentifier {
  assert(value);
  if (typeof value === 'string') {
    /* Allow 'groupName.soundName' strings and coerce them to
     * ISoundGroupIdentifiers. */
    const split = value.split('.');
    if (split.length === 1) {
      /* Also interpret 'soundName' as 'default.soundName'. */
      return {
        groupName: 'default',
        soundName: split[0],
      };
    }

    return {
      groupName: split[0],
      soundName: split[1],
    };
  } else if (Array.isArray(value) && value.length === 2) {
    return {
      groupName: value[0],
      soundName: value[1],
    };
  } else if (typeof value === 'object' &&
    'groupName' in value &&
    'soundName' in value)
  {
    return value;
  }

  throw new Error();
}
