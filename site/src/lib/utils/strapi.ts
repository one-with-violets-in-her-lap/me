export interface StrapiDocument {
    documentId: string
    createdAt: string
    updatedAt: string
}

export interface StrapiMedia extends StrapiDocument {
    alternativeText: string | null
    caption: string | null
    width: number
    height: number

    size: number
    url: string
}

export interface StrapiImage extends StrapiMedia {
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
}
