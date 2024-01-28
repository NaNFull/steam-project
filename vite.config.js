import path from 'path';

import react from '@vitejs/plugin-react-swc';
import svgr from 'vite-plugin-svgr';
import million from 'million/compiler';
import { defineConfig, loadEnv } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';
import tsconfigPaths from 'vite-tsconfig-paths';
import { visualizer } from "rollup-plugin-visualizer";

import { dependencies } from './package.json';

function renderChunks(deps) {
  let chunks = {};
  Object.keys(deps).forEach((key) => {
    if (['react', 'react-router-dom', 'react-dom'].includes(key)) return;
    chunks[key] = [key];
  });
  return chunks;
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, 'env');

  return {
    base: './',
    plugins: [
      visualizer({
        template: 'flamegraph',
        filename: 'temp/stats.html'
      }),
      million.vite({ auto: true }),
      react(),
      svgr({
        svgrOptions: {
          plugins: ['@svgr/plugin-jsx'],
          memo: true,
          typescript: false,
          svgo: true,
          svgoConfig: {
            plugins: [
              {
                name: 'removeViewBox',
                active: false
              }
            ]
          }
        }
      }),
      tsconfigPaths(),
      createHtmlPlugin({
        minify: true,
        inject: {
          data: {
            ...env,
            MODE: mode
          }
        }
      })
    ],
    css: {
      preprocessorOptions: {
        sass: {
          javascriptEnabled: true,
        },
      }
    },
    resolve: {
      alias: { '@src': path.resolve(__dirname, 'src') }
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            "react-vendor": ["react", "react-dom", "react-router-dom"],
          },
        },
      },
    },
    test: {
      globals: true,
      coverage: {
        reporter: ['text', 'json', 'html']
      }
    },
    server: {
      port: 8085,
      cors: true
    }
  };
});
