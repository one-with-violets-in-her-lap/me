import pinkTreeGlbModelUrl from '@/assets/3d-models/pink-tree.glb?url'

import * as THREE from 'three'
import { GLTFLoader, OrbitControls, type GLTF } from 'three/examples/jsm/Addons.js'

export class LandscapeParallax3dScene {
    private readonly clock: THREE.Clock
    private readonly scene: THREE.Scene
    private readonly camera: THREE.Camera
    private readonly renderer: THREE.WebGLRenderer
    private readonly controls: OrbitControls

    private readonly gltfLoader: GLTFLoader

    private readonly pointLight: THREE.PointLight

    private pinkTreeModel?: GLTF

    constructor(canvas: HTMLCanvasElement) {
        this.clock = new THREE.Clock()

        this.scene = new THREE.Scene()

        this.camera = new THREE.PerspectiveCamera(
            75,
            canvas.clientWidth / canvas.clientHeight,
            0.1,
            1000,
        )
        this.camera.position.z = 6
        this.camera.position.y = 0.3
        this.camera.position.x = 2

        this.renderer = new THREE.WebGLRenderer({
            canvas,
            alpha: true,
        })
        this.renderer.setPixelRatio(window.devicePixelRatio)
        this.renderer.setSize(canvas.clientWidth, canvas.clientHeight)
        this.renderer.shadowMap.enabled = true

        const ambientLight = new THREE.AmbientLight('white', 10)
        ambientLight.position.set(10, 10, 10)
        this.scene.add(ambientLight)

        this.pointLight = new THREE.PointLight('#fff', 35, 0, 0)
        this.pointLight.position.set(-4, 3, 6)
        this.pointLight.castShadow = true
        this.pointLight.shadow.intensity = 0.4
        this.scene.add(this.pointLight)

        // const gridHelper = new THREE.GridHelper()
        // this.scene.add(gridHelper)

        const lightHelper = new THREE.PointLightHelper(this.pointLight)
        this.scene.add(lightHelper)

        this.controls = new OrbitControls(this.camera, this.renderer.domElement)

        this.gltfLoader = new GLTFLoader()
    }

    async initialize() {
        this.pinkTreeModel = await this.gltfLoader.loadAsync(pinkTreeGlbModelUrl)

        this.renderer.setAnimationLoop(() => {
            const deltaTime = this.clock.getDelta()

            this.controls.update()
            this.renderer.render(this.scene, this.camera)
        })
    }

    dispose() {
	this.scene.clear()
	this.renderer.dispose()
    }
}
