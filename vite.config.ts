import {defineConfig} from 'vite';
import motionCanvas from '@motion-canvas/vite-plugin';

export default defineConfig({
  plugins: [
    motionCanvas({
      project: [
        './src/project.ts',
        './src/leonie-project.ts',
        './src/gh-actions-project.ts',
        './src/xmlxpath-project.ts',
        './src/cpc-project.ts',
      ],
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        entryFileNames: '[name].js',
      },
    },
  },
});
