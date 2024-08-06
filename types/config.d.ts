import { CacheTypeEnum } from '@/enums/cacheEnum'

export interface ProjectConfig {
  // Storage location of permission related information
  permissionCacheType: CacheTypeEnum
  // Whether to show the configuration button
  showSettingButton: boolean
  // Whether to show the theme switch button
  showDarkModeToggle: boolean
  // Configure where the button is displayed
  settingButtonPosition: SettingButtonPositionEnum
  // Permission mode
  permissionMode: PermissionModeEnum
  // Session timeout processing
  sessionTimeoutProcessing: SessionTimeoutProcessingEnum
  // Website gray mode, open for possible mourning dates
  grayMode: boolean
  // Whether to turn on the color weak mode
  colorWeak: boolean
  // Theme color
  themeColor: string

  // The main interface is displayed in full screen, the menu is not displayed, and the top
  fullContent: boolean
  // content width
  contentMode: ContentEnum
  // Whether to display the logo
  showLogo: boolean
  // Whether to show the global footer
  showFooter: boolean
  // menuType: MenuTypeEnum;
  headerSetting: HeaderSetting
  // menuSetting
  menuSetting: MenuSetting
  // Multi-tab settings
  multiTabsSetting: MultiTabsSetting
  // Animation configuration
  transitionSetting: TransitionSetting
  // pageLayout whether to enable keep-alive
  openKeepAlive: boolean
  // Show breadcrumbs
  showBreadCrumb: boolean
  // Show breadcrumb icon
  showBreadCrumbIcon: boolean
  // Use error-handler-plugin
  useErrorHandle: boolean
  // Whether to open back to top
  useOpenBackTop: boolean
  // Is it possible to embed iframe pages
  canEmbedIFramePage: boolean
  // Whether to delete unclosed messages and notify when switching the interface
  closeMessageOnSwitch: boolean
  // Whether to cancel the http request that has been sent but not responded when switching the interface.
  removeAllHttpPending: boolean
}

export interface GlobEnvConfig {
  // 站点名称
  VITE_GLOB_APP_TITLE: string
  // 服务接口地址
  VITE_GLOB_API_URL: string
  // 服务接口前缀
  VITE_GLOB_API_URL_PREFIX?: string
  // 项目缩写
  VITE_GLOB_APP_SHORT_NAME
  // 上传地址
  VITE_GLOB_UPLOAD_URL?: string
}

export interface GlobConfig {
  // 站点名称
  title: string
  // 服务接口地址
  apiUrl: string
  // 上传地址
  uploadUrl?: string
  // 服务接口前缀
  urlPrefix?: string
  // 项目缩写
  shortName: string
}
