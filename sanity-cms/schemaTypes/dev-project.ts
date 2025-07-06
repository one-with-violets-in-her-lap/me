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
        }),

        defineField({
            name: 'description',
            title: 'Description',
            type: 'string',
            placeholder: 'Sign up for our waiting list',
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
        }),
    ],
})
