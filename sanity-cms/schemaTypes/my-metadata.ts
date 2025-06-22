import { defineField, defineType } from 'sanity'

export const myMetadataType = defineType({
    name: 'my-metadata',
    type: 'document',
    title: 'Metadata about me',
    fields: [
        defineField({
            name: 'personStatus',
            title: 'Status',
            type: 'string',
            options: {
                list: ['sleeping', 'taking a walk', 'online', 'self-loathing'],
            },
            validation: (rule) => rule.required(),
        }),

        defineField({
            name: 'health',
            title: 'Health',
            type: 'number',
            validation: (rule) => rule.min(0).max(100),
        }),

        defineField({
            name: 'age',
            title: 'Age',
            type: 'number',
            validation: (rule) => rule.min(0),
        }),
    ],
})
