import { strapi, type API } from '@strapi/client'
import type { StrapiDocument, StrapiImage, StrapiMedia } from '@/lib/strapi-utils'

export interface Post extends StrapiDocument {
    content: string
    photo: Photo | null
    song: Song | null
}

export interface Photo extends StrapiDocument {
    name: string
    description: string
    takenDate: string
    image: StrapiImage
}

export interface Song extends StrapiDocument {
    name: string
    description: string
    secondsDuration: number
    bitrateKbps: number
    audioFile: StrapiMedia
    thumbnail: StrapiImage
}

const strapiClient = strapi({
    baseURL: import.meta.env.PUBLIC_STRAPI_CMS_BASE_URL + '/api',
    auth: import.meta.env.PUBLIC_STRAPI_API_TOKEN,
})

export const contentApiClient = {
    async fetchPosts() {
        return (await strapiClient.collection('posts').find({
            populate: ['photo.image', 'song.audioFile', 'song.thumbnail'],
        })) as API.DocumentResponseCollection<Post>
    },
}
