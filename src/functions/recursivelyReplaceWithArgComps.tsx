import * as React from 'react';

export const recursivelyReplaceWithArgComps = (
  map: Record<string, React.ComponentType> = {},
  node: React.ReactNode,
): React.ReactNode => {
  const mapKeys = Object.keys(map);
  if (!React.isValidElement(node)) {
    return node;
  }

  return React.cloneElement(
    node,
    node.props,
    React.Children.toArray(node.props.children).map((child) => {
      if (React.isValidElement(child)) {
        return React.createElement(
          mapKeys.includes(child.type as string) ?
            map[child.type as string] :
            child.type,

          child.props,
          React.Children.toArray(child.props.children).map((subchild) => (
            recursivelyReplaceWithArgComps(map, subchild)
          )),
        );
      }

      return child;
    }),
  );
};