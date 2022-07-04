import { resolve } from 'path';

import { defineConfig, loadEnv } from 'vite';

const root = resolve(__dirname, 'src/pages');
const outDir = resolve(__dirname, '../../dist/apps/vanilla');

// https://vitejs.dev/config/
export default defineConfig(({mode}) => {
const env = loadEnv(mode, process.cwd(), '');

  return {
    root,
      plugins: [],
        resolve: {
      alias: {
        '@js-camp': resolve(__dirname, '../../libs'),
    },
    },
    build: {
      outDir,
        emptyOutDir: true,
          rollupOptions: {
        input: [
          resolve(root, 'index.html'),
          resolve(root, 'example', 'index.html'),
          resolve(root, 'example', 'nested', 'index.html'),
          resolve(root, 'register', 'index.html')
        ],
      },
    },
    define: {
      ENV: {
        baseUrl: env.BASE_URL
      }
    }
  }
});
