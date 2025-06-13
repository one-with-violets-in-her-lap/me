import { strapi, type API } from '@strapi/client'

export interface Post extends API.Document {
    content: string
}

const strapiClient = strapi({
    baseURL: import.meta.env.PUBLIC_STRAPI_API_BASE_URL,
    auth: import.meta.env.PUBLIC_STRAPI_API_TOKEN,
})

export const contentApiClient = {
    async fetchPosts() {
        return (await strapiClient
            .collection('posts')
            .find()) as API.DocumentResponseCollection<Post>
    },
}
