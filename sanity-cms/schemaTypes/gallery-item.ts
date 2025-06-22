import { defineField, defineType } from 'sanity'

export const galleryItemType = defineType({
    name: 'gallery-item',
    title: 'Gallery item',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            type: 'string',
            placeholder: 'photo.jpg',
        }),

        defineField({
            name: 'datePhotoWasTook',
            placeholder: 'Date',
            type: 'datetime',
        }),

        defineField({
            name: 'image',
            type: 'image',
            validation: (rule) => rule.required().assetRequired(),
        }),

        defineField({
            name: 'imageAltText',
            type: 'string',
            placeholder: 'A dusty wooden table illuminated under soft light',
            validation: (rule) => rule.min(3),
        }),

        defineField({
            name: 'additionalInfo',
            title: 'Additional info in markdown',
            type: 'markdown',
        }),
    ],
})
