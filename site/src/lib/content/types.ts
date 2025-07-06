import type {
    SanityAssetDocument,
    SanityDocument,
    SanityImageAssetDocument,
} from '@sanity/client'

export interface MyMetadata extends SanityDocument {
    personStatus: 'sleeping' | 'taking a walk' | 'online' | 'self-loathing'
    health: number
    age: number
}

export interface Post extends SanityDocument {
    markdownContent: string
    photo: Photo | null
    song: Song | null
}

export interface Photo extends SanityDocument {
    name: string
    description: string
    takenDate: string
    image: { asset: SanityImageAssetDocument }
    imageAlternativeText: string
}

export interface Song extends SanityDocument {
    name: string
    description: string
    secondsDuration: number
    bitrateKbps: number
    audioFile: { asset: SanityImageAssetDocument }
    thumbnail: { asset: SanityAssetDocument }
}

export interface DevProject extends SanityDocument {
    name: string
    description: string
    logo: { asset: SanityImageAssetDocument }
    technologiesUsed: string[]
    sourceCodeLink: string
    previewLink: string
}
