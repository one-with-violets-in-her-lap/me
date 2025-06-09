// @ts-check
import { fileURLToPath } from 'url'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'

import react from '@astrojs/react'

import { customRouting } from '@inox-tools/custom-routing';

// https://astro.build/config
export default defineConfig({
    vite: {
        plugins: [tailwindcss()],
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url)),
            },
        },
    },

    integrations: [react(), customRouting({
        '/': './src/pages/index.astro'
    })],
})