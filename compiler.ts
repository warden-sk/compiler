/*
 * Copyright 2023 Marek Kobida
 */

import esbuild from 'esbuild';
import fs from 'fs';
import path from 'path';
import compileBabel from './compileBabel';
import compileReact from './compileReact';
import htmlPlugin from './htmlPlugin';

const testPlugin = ({ name }: { name: string }): esbuild.Plugin => {
  return {
    name: 'test',
    setup(build) {
      build.onEnd(async $ => {
        await htmlPlugin({
          assets: Object.keys($.metafile?.outputs ?? {}),
          name,
          outputPath: path.resolve(build.initialOptions.outdir!),
          publicPath: 'http://127.0.0.1',
          template: compileReact,
        });
      });

      build.onLoad({ filter: /\.tsx?$/ }, async $ => {
        const code = (await fs.promises.readFile($.path)).toString();

        return {
          contents: compileBabel(code, $.path),
        };
      });
    },
  };
};

(async () => {
  await esbuild.build({
    bundle: true,
    entryPoints: ['private/index.tsx'],
    globalName: 'xyz',
    metafile: true,
    minify: true,
    outdir: 'public',
    plugins: [testPlugin({ name: 'xyz' })],
  });
})();
