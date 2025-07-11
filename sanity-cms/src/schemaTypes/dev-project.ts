import { defineField, defineType } from 'sanity'
import {
    orderRankField,
    orderRankOrdering,
} from '@sanity/orderable-document-list'

export const devProjectType = defineType({
    name: 'dev-project',
    title: 'Dev project',
    type: 'document',
    orderings: [orderRankOrdering],
    fields: [
        defineField({
            name: 'logo',
            type: 'image',
            validation: (rule) => rule.required().assetRequired(),
        }),

        defineField({
            name: 'name',
            title: 'Name',
            type: 'string',
            placeholder: 'AI todo list',
            validation: (rule) => rule.required().min(1),
        }),

        defineField({
            name: 'description',
            title: 'Description',
            type: 'string',
            placeholder: 'Sign up for our waiting list',
            validation: (rule) => rule.required().min(1),
        }),

        defineField({
            name: 'tags',
            title: 'Tags',
            description: 'Tech used, skills applied, etc.',
            type: 'array',
            of: [{ type: 'string' }],
        }),

        defineField({
            name: 'sourceCodeLink',
            title: 'Source code link',
            placeholder: 'https://github.com/...',
            type: 'string',
            validation: (rule) => rule.required().min(1),
        }),

        defineField({
            name: 'previewLink',
            title: 'Preview link',
            placeholder: 'https://example.com',
            type: 'string',
        }),

        orderRankField({ type: 'dev-project' }),
    ],
})
