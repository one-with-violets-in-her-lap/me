import { defineField, defineType } from 'sanity'

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
    ],
})
