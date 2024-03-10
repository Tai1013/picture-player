interface ImportMetaEnv {
  readonly VITE_APP_LOGO: string
  readonly VITE_APP_BASE: string

  readonly VITE_AXIOS_MOCK?: string
  readonly VITE_AXIOS_MOCK_DELAY?: string
  readonly VITE_API_DEV_SID?: string
  readonly VITE_API_DEV_HOST?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
