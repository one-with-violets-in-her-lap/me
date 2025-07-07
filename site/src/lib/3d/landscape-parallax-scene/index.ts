import * as THREE from 'three'
import { scroll } from 'motion'
import { GLTFLoader, OrbitControls } from 'three/examples/jsm/Addons.js'
import { PinkTree3dObject } from '@/lib/3d//landscape-parallax-scene/pink-tree'
import { BloomEffectRenderer } from '@/lib/3d/landscape-parallax-scene/bloom-effect-renderer'
import { animate } from 'motion/react'

export class LandscapeParallax3dScene {
    private readonly clock: THREE.Clock
    private readonly scene: THREE.Scene
    private readonly camera: THREE.PerspectiveCamera
    private readonly renderer: THREE.WebGLRenderer
    private readonly controls: OrbitControls | null = null

    private readonly gltfLoader: GLTFLoader

    private pinkTree: PinkTree3dObject

    private readonly bloomEffectRenderer: BloomEffectRenderer

    private readonly abortController: AbortController

    constructor(
        private readonly canvas: HTMLCanvasElement,
        enableOrbitContorlsForDebug = false,
    ) {
        this.clock = new THREE.Clock()

        this.scene = new THREE.Scene()
        this.scene.background = new THREE.Color('#282323')

        this.camera = new THREE.PerspectiveCamera(
            75,
            canvas.clientWidth / canvas.clientHeight,
            0.1,
            1000,
        )
        this.camera.position.z = 1
        this.camera.position.y = -1
        this.camera.position.x = -6
        this.camera.rotation.x = 1
        this.camera.rotation.y = 1

        this.renderer = new THREE.WebGLRenderer({
            canvas,
            alpha: true,
        })
        this.renderer.toneMapping = THREE.ReinhardToneMapping
        this.renderer.setPixelRatio(window.devicePixelRatio)
        this.renderer.setSize(canvas.clientWidth, canvas.clientHeight)
        this.renderer.shadowMap.enabled = true

        const ambientLight = new THREE.AmbientLight('white', 1)
        ambientLight.position.set(10, 10, 10)
        this.scene.add(ambientLight)

        const light = new THREE.DirectionalLight('#fff', 8)
        light.position.set(2, 11, -5)
        light.castShadow = true
        light.shadow.intensity = 0.4
        this.scene.add(light)

        const lightHelper = new THREE.DirectionalLightHelper(light)
        this.scene.add(lightHelper)

        if (enableOrbitContorlsForDebug) {
            this.controls = new OrbitControls(this.camera, this.renderer.domElement)
        }

        this.gltfLoader = new GLTFLoader()

        this.pinkTree = new PinkTree3dObject(this.gltfLoader)

        this.bloomEffectRenderer = new BloomEffectRenderer(
            this.scene,
            this.camera,
            this.renderer,
        )

        this.abortController = new AbortController()
    }

    async initialize() {
        const pinkTreeObject = await this.pinkTree.initialize()
        this.scene.add(pinkTreeObject.scene)

        window.addEventListener('resize', () => this.handleResize(), {
            signal: this.abortController.signal,
        })

        this.renderer.setAnimationLoop(() => {
            const deltaTime = this.clock.getDelta()

            this.pinkTree.update(deltaTime)

            this.bloomEffectRenderer.render()

            this.controls?.update()
        })

        scroll(animate(this.camera.position, { y: [-1, 20], x: [-6, -5] }))
        scroll(animate(this.camera.rotation, { x: [1, -4] }))
    }

    startIntroAnimation() {
        animate(this.camera.rotation, { y: 0 }, { duration: 2, type: 'spring' })
    }

    dispose() {
        this.scene.clear()
        this.renderer.dispose()

        this.abortController.abort()
    }

    private handleResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight
        this.camera.updateProjectionMatrix()

        this.renderer.setSize(window.innerWidth, window.innerHeight)

        this.canvas.style.width = window.innerWidth + 'px'
        this.canvas.style.height = window.innerHeight + 'px'

        this.bloomEffectRenderer.handleResize(window.innerWidth, window.innerHeight)
    }
}
