import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [vue()],
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
        '@': path.resolve(__dirname, './src')
      }
    },
    ssr: {
      noExternal: ['@vue/runtime-dom']
    }
  }
})
