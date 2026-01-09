import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import babel from '@rollup/plugin-babel'
import VueRouter from "unplugin-vue-router/vite"
import terser from '@rollup/plugin-terser'
import PostCssPresetEnv from 'postcss-preset-env'
import virtualArticle from './src/plugins/vfs'
import purgeCss from 'vite-plugin-purgecss'
import viteImagemin from 'vite-plugin-imagemin'
// https://vite.dev/config/
const BIG_BUNDLE = 0;
export default defineConfig({
  plugins: [
    VueRouter(),
    vue({
      // 关键配置：允许 Vue 编译 Markdown 文件
      include: [/.vue$/, /.md$/],
    }),
    purgeCss({
      content: [
        './index.html',
        './src/**/*.vue',
        './src/**/*.js',
        './src/**/*.ts',
      ]
    }),
    virtualArticle(),
    viteImagemin({
      gifsicle: { optimizationLevel: 3 },
      mozjpeg: { quality: 80 },
      pngquant: { quality: [0.8, 0.9] },
      svgo: {
        plugins: [
          { name: 'removeViewBox' },
          { name: 'removeEmptyAttrs', active: false }
        ]
      },
      // 添加 webp 转换
      webp: { quality: 80 }
    })
  ],
  base: "/avaliability_beta/",
  build: {
    minify: "terser",
    terserOptions: {
      compress: {
        arguments: true,
        arrows: true,
        drop_console: true,
        drop_debugger: true,
        inline: true,
        passes: 3,
        unused: true,
        dead_code: true,
      },
      mangle: {
        keep_classnames: false,
        keep_fnames: false,
        eval: true
      },
      format: {
        ascii_only: true,
        comments: false,
      },
      maxWorkers: 128,
    },
    rollupOptions: {
      plugins: [
        babel({
          babelHelpers: 'bundled',
          presets: [
            [
              '@babel/preset-env',
              {
                useBuiltIns: 'entry', // 注意这里只能使用 entry
                corejs: '3',
                targets: '>=0%',
              },
            ],
          ],
          plugins: [],
          compact: true
        }),
        terser()
      ],
      output: {
        compact: true,
      }
    },
    assetsInlineLimit: BIG_BUNDLE ? 25000000 : 0 //<- Browser supports 2.5MB

  },
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
    postcss: {
      plugins: [PostCssPresetEnv()]
    }
  },
  resolve: {
    // 配置路径别名@
    alias: {
      '@': path.resolve(__dirname, './src'),
      '#': path.resolve(__dirname, './public'),
    }
  }
}
)
