import type { Plugin } from 'vite';

import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

import { ViteEnv } from '../utils';
import { configHtmlPlugin } from './html';
import { configMockPlugin } from './mock';
import { configCompressPlugin } from './compress';
import { configStyleImportPlugin } from './styleImport';
import { configVisualizerConfig } from './visualizer';
import { configImageminPlugin } from './imagemin';

export function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean) {
  const { VITE_USE_MOCK, VITE_REPORT } = viteEnv;

  const vitePlugins: (Plugin | Plugin[])[] = [
    // have to
    vue(),
    // have to
    vueJsx(),
  ];

  // vite-plugin-html
  vitePlugins.push(configHtmlPlugin(viteEnv, isBuild));

  // vite-plugin-mock
  VITE_USE_MOCK && vitePlugins.push(configMockPlugin(isBuild));

  // vite-plugin-style-import
  vitePlugins.push(configStyleImportPlugin());

  // The following plugins only work in the production environment
  if (isBuild) {
    // rollup-plugin-visualizer
    VITE_REPORT && vitePlugins.push(configVisualizerConfig());
    //vite-plugin-imagemin
    vitePlugins.push(configImageminPlugin());

    // rollup-plugin-gzip
    vitePlugins.push(configCompressPlugin('gzip'));
  }

  return vitePlugins;
}
