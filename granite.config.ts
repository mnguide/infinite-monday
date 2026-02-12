import { defineConfig } from '@apps-in-toss/web-framework/config';

export default defineConfig({
  appName: 'infinite-monday',
  brand: {
    displayName: '무한 월요일',
    primaryColor: '#3182F6',
    icon: 'https://static.toss.im/appsintoss/8947/a2810794-0213-437e-b649-e939fb72035e.png',
    bridgeColorMode: 'basic'
  },
  web: {
    host: 'localhost',
    port: 5173,
    commands: {
      dev: 'vite --host',
      build: 'tsc -b && vite build',
    },
  },
  permissions: [],
  outdir: 'dist',
  webViewProps: {
    type: 'game',
    overScrollMode: 'never',
  },
});
