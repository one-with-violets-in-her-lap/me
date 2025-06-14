import type { API } from '@strapi/client'

export interface StrapiImage {
    alternativeText: string | null
    caption: string | null
    width: number
    height: number
    formats: {
        thumbnail: {
            width: number
            height: number
            size: number
            url: string
        }
        small: {
            width: number
            height: number
            size: number
            url: string
        }
        large: {
            width: number
            height: number
            size: number
            url: string
        }
        medium: {
            width: number
            height: number
            size: number
            url: string
        }
    }

    size: number
    url: string
}
