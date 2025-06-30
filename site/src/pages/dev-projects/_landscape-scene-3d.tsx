import { motion, useScroll } from 'motion/react'
import { useEffect, useRef } from 'react'
import { LandscapeParallax3dScene } from '@/lib/3d/landscape-parallax-scene'

export function LandscapeParallaxScene3d() {
    const { scrollY } = useScroll()

    const canvas = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        let scene: LandscapeParallax3dScene | undefined = undefined
        let unmounted = false

        initializeScene().then(landscapeScene => {
            scene = landscapeScene

            if (unmounted) {
                console.log('Component is already unmounted after landscape scene initialization. Disposing...')
                scene.dispose()
            }
        })

        return () => {
            console.log('Component unmounted. Disposing if scene initialization is completed')
            unmounted = true
            scene?.dispose()
        }
    }, [])

    async function initializeScene() {
        if (!canvas.current) {
            throw new Error('Canvas with ref `canvas` cannot be found')
        }

        const landscapeScene = new LandscapeParallax3dScene(canvas.current)

        await landscapeScene.initialize()

        return landscapeScene
    }

    return <motion.canvas
        ref={canvas}
        style={{ y: scrollY }}
        className="absolute top-0 left-0 h-screen w-full"
    ></motion.canvas>
}

