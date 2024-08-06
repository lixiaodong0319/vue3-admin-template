import type { UserConfig, ConfigEnv } from 'vite'

import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import dayjs from 'dayjs'
import pkg from './package.json'
import { wrapperEnv } from './build/utils'
import { createProxy } from './build/vite/proxy'
import { OUTPUT_DIR } from './build/constant'
import { createVitePlugins } from './build/vite/plugin'

const { dependencies, devDependencies, name, version } = pkg
const __APP_INFO__ = {
  pkg: { dependencies, devDependencies, name, version },
  lastBuildTime: dayjs().format('YYYY-MM-DD HH:mm:ss')
}

export default defineConfig(({ command, mode }: ConfigEnv): UserConfig => {
  const root = process.cwd()

  const env = loadEnv(mode, root)

  const viteEnv = wrapperEnv(env)

  const { VITE_PORT, VITE_PUBLIC_PATH, VITE_PROXY, VITE_DROP_CONSOLE } = viteEnv

  const isBuild = command === 'build'

  return {
    base: VITE_PUBLIC_PATH,
    root,
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '#': fileURLToPath(new URL('./types', import.meta.url))
      }
    },
    server: {
      // https: true,
      host: true,
      port: VITE_PORT,
      proxy: createProxy(VITE_PROXY)
    },
    esbuild: {
      pure: VITE_DROP_CONSOLE ? ['console.log', 'debugger'] : []
    },
    build: {
      target: 'es2015',
      cssTarget: 'chrome80',
      outDir: OUTPUT_DIR,
      chunkSizeWarningLimit: 2000
    },
    define: {
      __INTLIFY_PROD_DEVTOOLS__: false,
      __APP_INFO__: JSON.stringify(__APP_INFO__)
    },
    plugins: createVitePlugins(viteEnv, isBuild)
  }
})
