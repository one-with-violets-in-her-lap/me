import { defineField, defineType } from 'sanity'

export const songType = defineType({
    name: 'song',
    title: 'Song',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Name',
            type: 'string',
            placeholder: 'song.mp3',
            validation: (rule) => rule.required(),
        }),

        defineField({
            name: 'audioFile',
            title: 'MP3 file',
            type: 'file',
            options: {
                accept: 'audio/mpeg',
            },
            validation: (rule) => rule.required().assetRequired(),
        }),

        defineField({
            name: 'dateWasMade',
            title: 'Date the song was made',
            type: 'date',
            placeholder: 'yyyy-mm-dd',
        }),

        defineField({
            name: 'secondsDuration',
            title: 'Duration in seconds',
            type: 'number',
            placeholder: 'Number',
            validation: (rule) => rule.required().greaterThan(0),
        }),

        defineField({
            name: 'thumbnail',
            type: 'image',
        }),

        defineField({
            name: 'bitrateKbps',
            type: 'number',
            validation: (rule) => rule.required().greaterThan(0),
        }),
    ],
})
