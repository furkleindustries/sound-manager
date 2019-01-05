module.exports = {
  lib: 'lib.dom.d.ts,lib.esnext.d.ts',
  mode: 'file',
  out: './typedocs',
  include: './src/**/*',
  exclude: [
    '**/node_modules/**/*.*',
    './tests/**/*',
  ],
};
