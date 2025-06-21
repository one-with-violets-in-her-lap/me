interface ImportMetaEnv {
    readonly LAST_FM_API_KEY: string
    readonly LAST_FM_USERNAME: string

    readonly STRAPI_CMS_BASE_URL: string
    readonly STRAPI_API_TOKEN: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
