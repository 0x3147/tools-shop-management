import vue from '@vitejs/plugin-vue'
import { VueHooksPlusResolver } from '@vue-hooks-plus/resolvers'
import path from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: ['vue', 'vue-router', 'pinia']
    }),
    Components({
      resolvers: [NaiveUiResolver(), VueHooksPlusResolver()]
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
})
