import { strapi, type API } from '@strapi/client'
import type { StrapiImage } from '@/lib/strapi-utils'

export interface Post extends API.Document {
    content: string
    photo?: Photo
}

export interface Photo extends API.Document {
    name: string
    description: string
    takenDate: string
    image: StrapiImage
}

const strapiClient = strapi({
    baseURL: import.meta.env.PUBLIC_STRAPI_CMS_BASE_URL + '/api',
    auth: import.meta.env.PUBLIC_STRAPI_API_TOKEN,
})

export const contentApiClient = {
    async fetchPosts() {
        return (await strapiClient.collection('posts').find({
            populate: 'photo.image',
        })) as API.DocumentResponseCollection<Post>
    },
}
