import vue from '@vitejs/plugin-vue';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    vue()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    host: '0.0.0.0'
  },
  publicDir: "public",
  publicPath:'./',
  base: './',
  build: {
  //浏览器兼容性  "esnext"|"modules"
  target: "modules",
  //指定输出路径
  outDir: "dist",
  //生成静态资源的存放路径
  assetsDir: "static"}
});
