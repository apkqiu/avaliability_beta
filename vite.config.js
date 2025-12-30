import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import VueRouter from "unplugin-vue-router/vite"
import vueJsx from "@vitejs/plugin-vue-jsx";
// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [VueRouter(),vue()],
    base: "/avaliability_beta/",
    css: {
      preprocessorOptions: {
        scss: {
          silenceDeprecations: [
            'import',
            'color-functions',
            'global-builtin',
            'if-function'
          ],
        },
      },
    },
    resolve: {
      // 配置路径别名@
      alias: {
        '@': path.resolve(__dirname, './src'),
        '~': path.resolve(__dirname, './public'),
      }
    }
  }
})
