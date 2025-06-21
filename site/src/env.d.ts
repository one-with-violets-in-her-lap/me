interface ImportMetaEnv {
    readonly LAST_FM_API_KEY: string
    readonly LAST_FM_USERNAME: string

    readonly PUBLIC_STRAPI_CMS_BASE_URL: string
    readonly PUBLIC_STRAPI_API_TOKEN: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
