import { defineField, defineType } from 'sanity'

export const songType = defineType({
    name: 'song',
    title: 'Song',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            placeholder: 'song.mp3',
            validation: (rule) => rule.required(),
        }),

        defineField({
            name: 'file',
            title: 'MP3 file',
            type: 'file',
            options: {
                accept: 'audio/mpeg',
            },
            validation: (rule) => rule.required().assetRequired(),
        }),

        defineField({
            name: 'dateSongWasMade',
            title: 'Date the song was made',
            type: 'date',
            placeholder: 'Date',
        }),

        defineField({
            name: 'secondsDuration',
            title: 'Duration in seconds',
            type: 'number',
            placeholder: 'Number',
            validation: (rule) => rule.required().greaterThan(0),
        }),

        defineField({
            name: 'coverArt',
            type: 'image',
        }),

        defineField({
            name: 'additionalInfo',
            title: 'Additional info in markdown',
            type: 'markdown',
        }),
    ],
})
