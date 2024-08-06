import { defineStore } from 'pinia'
import { store } from '@/store'
import { ProjectConfig } from '#/config'
import { ThemeEnum } from '@/enums/appEnum'
import type { BeforeMiniState } from '#/store'
import { Persistent } from '@/utils/cache/persistent'
import { APP_DARK_MODE_KEY_, PROJ_CFG_KEY } from '@/enums/cacheEnum'

interface AppState {
  darkMode?: ThemeEnum
  pageLoading: boolean
  projectConfig: ProjectConfig | null
  beforeMiniInfo: BeforeMiniState
}

export const useAppStore = defineStore({
  id: 'app',
  state: (): AppState => ({
    darkMode: undefined,
    pageLoading: false,
    projectConfig: Persistent.getLocal(PROJ_CFG_KEY),
    beforeMiniInfo: {}
  }),
  getters: {
    getProjectConfig(): ProjectConfig {
      return this.projectConfig || ({} as ProjectConfig)
    }
  }
})

export function useAppStoreWithOut() {
  return useAppStore(store)
}
