import { defineConfig } from "vite";
import path from 'path';


export default defineConfig({
  base: '/three-test-assignment/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
});
