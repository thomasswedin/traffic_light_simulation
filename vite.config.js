import { defineConfig } from "vite";


export default defineConfig(({ mode }) => {
  return {
    build: {
      manifest: true,
      rollupOptions: {
        input: {
          app: './index.html', // default
        },
        output: {
          assetFileNames: (assetInfo) => {
            if (assetInfo.name == "index.css") return "css/styles_client.css";
            return '[ext]/[name][extname]';
          },
          chunkFileNames: 'dynamic/[name]-[hash].js',
          entryFileNames: 'client.js',
        }
      },
      lib: {
        entry: 'src/main.ts',
        fileName: 'client',
        formats: ['es'],
      }
    },
    server: {
      host: "127.0.0.1",
      port: 3000,
      open:true
    },
  };
});