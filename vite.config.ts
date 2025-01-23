import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { viteStaticCopy } from 'vite-plugin-static-copy'
// https://vite.dev/config/

console.log('VITE_CLIENT_ID:', process.env.VITE_CLIENT_ID);
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: 'public/manifest.json',
          dest: '.',
          transform(content) {
            const manifest = JSON.parse(content.toString());
            manifest.oauth2.client_id = env.VITE_CLIENT_ID;
            return JSON.stringify(manifest, null, 2);
          },
        }
      ],
    }),
  ],
  build: {
    outDir: 'build',
    rollupOptions: {
      input: {
        main: './index.html',
      },
      external: ["https://apis.google.com/js/api.js", "https://apis.google.com/*"],
    },
  }
}

});
