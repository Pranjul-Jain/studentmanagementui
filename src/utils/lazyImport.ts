import React from 'react';

export function lazyImport(factory: () => Promise<any>, name:string) {
  return Object.create({
    [name]: React.lazy(() => factory().then((module) => ({ default: module[name] }))),
  });
}
