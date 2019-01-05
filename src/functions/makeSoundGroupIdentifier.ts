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
    return structureSoundGroupIdentifier.apply(
      null,
      value.split('.') as [ string ] | [ string, string ],
    );
  } else if (Array.isArray(value) && value.length === 2) {
    return structureSoundGroupIdentifier(value[0], value[1]);
  } else if (typeof value === 'object' &&
    'groupName' in value &&
    'soundName' in value)
  {
    return value;
  }

  throw new Error();
}

export function structureSoundGroupIdentifier(soundName: string, groupName?: string): ISoundGroupIdentifier {
  if (groupName) {
    return {
      groupName,
      soundName,
    };
  }

  return {
    soundName,
    groupName: 'default',
  };
}
