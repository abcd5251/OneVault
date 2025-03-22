import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@features': path.resolve(__dirname, './src/components/features'),
      '@common': path.resolve(__dirname, './src/components/common'),
      '@contexts': path.resolve(__dirname, './src/contexts'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@types': path.resolve(__dirname, './src/types'),
      '@config': path.resolve(__dirname, './src/config'),
      crypto: 'empty-module',
      assert: 'empty-module',
      http: 'empty-module',
      https: 'empty-module',
      os: 'empty-module',
      url: 'empty-module',
      zlib: 'empty-module',
      stream: 'empty-module',
      _stream_duplex: 'empty-module',
      _stream_passthrough: 'empty-module',
      _stream_readable: 'empty-module',
      _stream_writable: 'empty-module',
      _stream_transform: 'empty-module',
    },
  },
  define: {
    global: 'globalThis',
  },
});
