import {
  assert,
} from 'ts-assertions';
import {
  IBaseNode,
} from '../Node/IBaseNode';

export const strings = {
  ASSERTION_FAILURE:
    'The method %METHOD_NAME% requires the %NODE_TYPE% calling it to be in ' +
    'HTML Audio mode.',

  NODE_INVALID:
    'The node argument was not provided to assertNodeIsHtmlAudio.',
};

export function assertNodeIsHtmlAudio<T extends IBaseNode>(
  node: T,
  methodName?: keyof T,
)
{
  assert(
    node,
    strings.NODE_INVALID,
  );

  const methodNameStr = String(methodName || '(not provided)');
  assert(
    !node.isWebAudio(),
    strings.ASSERTION_FAILURE
      .replace('%METHOD_NAME%', methodNameStr)
      .replace('%NODE_TYPE%', node.type),
  );

  return true;
}
