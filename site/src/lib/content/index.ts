import { createClient } from '@sanity/client'
import { ContentClientError } from '@/lib/utils/errors'
import type { DevProject, MyMetadata, Post, Photo, Song } from './types'

const sanityClient = createClient({
    projectId: import.meta.env.SANITY_CMS_PROJECT_ID,
    dataset: import.meta.env.SANITY_CMS_DATASET,
})

export const contentApiClient = {
    async fetchPosts(): Promise<Post[]> {
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

    async fetchDevProjects(): Promise<DevProject[]> {
        return await sanityClient.fetch(`
            *[_type == 'dev-project'] {
              ...,
              logo {
                ...,
                asset ->
	      }
            }
        `)
    },
}

export type { Post, DevProject, MyMetadata, Photo, Song }

