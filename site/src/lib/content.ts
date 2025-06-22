import {
    createClient,
    type SanityAssetDocument,
    type SanityDocument,
    type SanityImageAssetDocument,
} from '@sanity/client'
import { ContentClientError } from '@/lib/utils/errors'

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

const sanityClient = createClient({
    projectId: import.meta.env.SANITY_CMS_PROJECT_ID,
    dataset: import.meta.env.SANITY_CMS_DATASET,
})

export const contentApiClient = {
    async fetchPosts() {
        return await sanityClient.fetch(`
            *[_type == 'post'] {
              ...,
              photo -> {
                ...,

                image {
                  ...,
                  asset ->
                }
              },

              song -> {
                ...,

                thumbnail {
                  ...,
                  asset ->
                },

                audioFile {
                  ...,
                  asset ->
                }
              }
            }
        `)
    },

    async fetchMyMetadata() {
        const data: MyMetadata[] = await sanityClient.fetch(
            `*[_type == "my-metadata"]`,
        )

        if (data.length < 0) {
            throw new ContentClientError('No metadata records available')
        }

        return data[0]
    },
}
