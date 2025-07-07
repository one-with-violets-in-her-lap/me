import { defineField, defineType } from 'sanity'
import { photoType } from './photo'
import { songType } from './song'

export const postType = defineType({
    name: 'post',
    title: 'Post',
    type: 'document',
    fields: [
        defineField({
            name: 'markdownContent',
            title: 'Post in markdown',
            type: 'markdown',
            validation: (rule) => rule.required(),
        }),

        defineField({
            name: 'photo',
            type: 'reference',
            to: photoType,
        }),

        defineField({
            name: 'song',
            type: 'reference',
            to: songType,
        }),
    ],
})
