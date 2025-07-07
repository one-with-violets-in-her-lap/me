import { defineField, defineType } from 'sanity'

export const photoType = defineType({
    name: 'photo',
    title: 'Photo',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            type: 'string',
            placeholder: 'photo.jpg',
        }),

        defineField({
            name: 'takenDate',
            placeholder: 'Taken date',
            type: 'datetime',
        }),

        defineField({
            name: 'image',
            type: 'image',
            validation: (rule) => rule.required().assetRequired(),
        }),

        defineField({
            name: 'imageAlternativeText',
            type: 'string',
            placeholder: 'A dusty wooden table illuminated under soft light',
            validation: (rule) => rule.required().min(3),
        }),

        defineField({
            name: 'additionalInfo',
            title: 'Additional info in markdown',
            type: 'markdown',
        }),
    ],
})
