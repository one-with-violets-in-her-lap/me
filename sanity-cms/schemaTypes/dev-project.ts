import { defineField, defineType } from 'sanity'

export const devProjectType = defineType({
    name: 'dev-project',
    title: 'Dev project',
    type: 'document',
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
            name: 'technologiesUsed',
            title: 'Tech used',
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
    ],
})
