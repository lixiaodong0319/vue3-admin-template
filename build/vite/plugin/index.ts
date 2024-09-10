import { PluginOption } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import { configMockPlugin } from './mock'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

export function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean) {
  const {
    VITE_USE_IMAGEMIN,
    VITE_USE_MOCK,
    VITE_LEGACY,
    VITE_BUILD_COMPRESS,
    VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE
  } = viteEnv

  const vitePlugins: (PluginOption | PluginOption[])[] = [
    vue(),
    createSvgIconsPlugin({
      iconDirs: [
        resolve(__dirname, '../../../src/assets/svg/yuntun/fileType'),
        resolve(__dirname, '../../../src/assets/svg/yuntun/menu')
      ], // icon存放的目录
      symbolId: 'icon-[name]' // symbol的id
    })
  ]

  // 是否启用mock
  VITE_USE_MOCK && vitePlugins.push(configMockPlugin(isBuild))

  return vitePlugins
}
