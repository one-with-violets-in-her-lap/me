interface ImportMetaEnv {
    readonly LAST_FM_API_KEY: string
    readonly LAST_FM_USERNAME: string

    readonly SANITY_CMS_PROJECT_ID: string
    readonly SANITY_CMS_DATASET: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
