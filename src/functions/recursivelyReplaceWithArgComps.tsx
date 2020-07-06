import * as React from 'react';

export const recursivelyReplaceWithArgComps = (
  map: Record<string, React.ComponentType> = {},
  element: React.ReactElement<Record<string, any> & { children?: React.ReactNode }>,
) => {
  const mapKeys = Object.keys(map);
  const recursor = recursivelyReplaceWithArgComps.bind(null, map);
  return React.cloneElement(
    element,
    element.props,
    React.Children.toArray(element).map((child) => {
      if (React.isValidElement(child)) {
        return React.cloneElement(
          mapKeys.includes(child.type as any) ?
            mapKeys[String(child.type)] :
            child,

          child.props,
          React.Children.toArray(recursor),
        );
      }

      return child;
    }),
  );
};
