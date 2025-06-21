import { HttpResponseError } from '@/lib/utils/errors'

export interface LastFmTrack {
    mbid: string

    artist: {
        mbid: string
        '#text': string
    }

    image: [
        {
            size: 'small'
            '#text': string
        },
        {
            size: 'medium'
            '#text': string
        },
    ]

    name: string

    /**
     * Scrobble date
     */
    date: {
        /**
         * Unix timestamp
         */
        uts: string
        '#text': string
    }

    url: string
}

export const lastFmClient = {
    async fetchLastTrack(
        username: string,
        apiKey: string,
    ): Promise<LastFmTrack | null> {
        const response = await fetch(
            `https://ws.audioscrobbler.com/2.0?method=user.getrecenttracks&user=${username}&format=json&api_key=${apiKey}`,
        )

        const data = await response.json()

        if (!response.ok) {
            throw new HttpResponseError(response.status, JSON.stringify(data))
        }

        if (data.recenttracks.track.length === 0) {
            return null
        }

        return data.recenttracks.track[0]
    },
}
