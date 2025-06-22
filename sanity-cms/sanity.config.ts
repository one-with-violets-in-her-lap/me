import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'
import { markdownSchema } from 'sanity-plugin-markdown'

if (!process.env.SANITY_STUDIO_PROJECT_ID || !process.env.SANITY_STUDIO_DATASET) {
    throw new Error(
        'Env vars SANITY_STUDIO_PROJECT_ID and SANITY_STUDIO_DATASET must be specified',
    )
}

export default defineConfig({
    name: 'default',
    title: 'teeth',

    projectId: process.env.SANITY_STUDIO_PROJECT_ID,
    dataset: process.env.SANITY_STUDIO_DATASET,

    plugins: [structureTool(), visionTool(), markdownSchema()],

    schema: {
        types: schemaTypes,
    },
})
