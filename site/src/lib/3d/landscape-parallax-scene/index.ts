import * as THREE from 'three'
import { GLTFLoader, OrbitControls } from 'three/examples/jsm/Addons.js'
import { PinkTree3dObject } from '@/lib/3d//landscape-parallax-scene/pink-tree'
import { BloomEffectRenderer } from '@/lib/3d//landscape-parallax-scene/bloom-effect-renderer'

export class LandscapeParallax3dScene {
    private readonly clock: THREE.Clock
    private readonly scene: THREE.Scene
    private readonly camera: THREE.Camera
    private readonly renderer: THREE.WebGLRenderer
    private readonly controls: OrbitControls | null = null

    private readonly gltfLoader: GLTFLoader

    private pinkTree: PinkTree3dObject

    private readonly bloomEffectRenderer: BloomEffectRenderer

    constructor(private readonly canvas: HTMLCanvasElement) {
        this.clock = new THREE.Clock()

        this.scene = new THREE.Scene()
        this.scene.background = new THREE.Color('#282323')

        this.camera = new THREE.PerspectiveCamera(
            75,
            canvas.clientWidth / canvas.clientHeight,
            0.1,
            1000,
        )
        this.camera.position.z = 3
        this.camera.position.y = -1
        this.camera.position.x = -5
	this.camera.rotation.x = 0.8

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

        // this.controls = new OrbitControls(this.camera, this.renderer.domElement)

        this.gltfLoader = new GLTFLoader()

        this.pinkTree = new PinkTree3dObject(this.gltfLoader)

        this.bloomEffectRenderer = new BloomEffectRenderer(
            this.scene,
            this.camera,
            this.renderer,
            this.canvas,
        )
    }

    async initialize() {
        const pinkTreeObject = await this.pinkTree.initialize()
        this.scene.add(pinkTreeObject.scene)

        this.renderer.setAnimationLoop(() => {
            const deltaTime = this.clock.getDelta()

            this.bloomEffectRenderer.render()

            // this.controls?.update()
        })
    }

    dispose() {
        this.scene.clear()
        this.renderer.dispose()
    }
}
