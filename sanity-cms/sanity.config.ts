import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { markdownSchema } from 'sanity-plugin-markdown'
import { sanityStructureConfig } from './src/structure'
import { schemaTypes } from './src/schemaTypes'

if (
    !process.env.SANITY_STUDIO_PROJECT_ID ||
    !process.env.SANITY_STUDIO_DATASET
) {
    throw new Error(
        'Env vars SANITY_STUDIO_PROJECT_ID and SANITY_STUDIO_DATASET must be specified',
    )
}

export default defineConfig({
    name: 'default',
    title: 'teeth',

    projectId: process.env.SANITY_STUDIO_PROJECT_ID,
    dataset: process.env.SANITY_STUDIO_DATASET,

    plugins: [
        structureTool(sanityStructureConfig),
        visionTool(),
        markdownSchema(),
    ],

    schema: {
        types: schemaTypes,
    },
})
