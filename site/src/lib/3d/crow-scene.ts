import crowModel from '@/assets/3d-models/crow.glb?url'

import * as THREE from 'three'
import { GLTFLoader, OrbitControls, type GLTF } from 'three/examples/jsm/Addons.js'

export class Crow3dObject {
    private gltfModel?: GLTF

    constructor(private readonly gltfLoader: GLTFLoader) {}

    async initialize() {
        this.gltfModel = await this.gltfLoader.loadAsync(crowModel)

        this.gltfModel.scene.scale.set(0.04, 0.04, 0.04)

        return this.gltfModel
    }
}

export class Crow3dScene {
    private readonly clock: THREE.Clock
    private readonly scene: THREE.Scene
    private readonly camera: THREE.Camera
    private readonly renderer: THREE.WebGLRenderer

    private readonly gltfLoader: GLTFLoader

    private readonly controls: OrbitControls

    private readonly pointLight: THREE.PointLight
    private readonly crow: Crow3dObject

    constructor(canvas: HTMLCanvasElement) {
        this.clock = new THREE.Clock()

        this.scene = new THREE.Scene()

        this.camera = new THREE.PerspectiveCamera(
            75,
            canvas.clientWidth / canvas.clientHeight,
            0.1,
            1000,
        )
        this.camera.position.z = 10

        this.renderer = new THREE.WebGLRenderer({
            canvas,
        })
        this.renderer.setClearColor('white')
        this.renderer.setPixelRatio(window.devicePixelRatio)
        this.renderer.setSize(canvas.clientWidth, canvas.clientHeight)
        this.renderer.shadowMap.enabled = true

        const ambientLight = new THREE.AmbientLight('white', 0.1)
        ambientLight.position.set(10, 10, 10)
        this.scene.add(ambientLight)

        this.pointLight = new THREE.PointLight(0xffffff, 5, 0, 0)
        this.pointLight.position.set(4, 5, 6)
        this.pointLight.castShadow = true
        this.pointLight.shadow.intensity = 0.2
        this.scene.add(this.pointLight)

        const gridHelper = new THREE.GridHelper()
        this.scene.add(gridHelper)

        const lightHelper = new THREE.PointLightHelper(this.pointLight)
        this.scene.add(lightHelper)

        this.controls = new OrbitControls(this.camera, this.renderer.domElement)

        this.gltfLoader = new GLTFLoader()

        this.crow = new Crow3dObject(this.gltfLoader)
    }

    async initialize() {
        const crowModel = await this.crow.initialize()
        this.scene.add(crowModel.scene)

        this.renderer.setAnimationLoop(() => {
            const deltaTime = this.clock.getDelta()

            this.controls.update()
            this.renderer.render(this.scene, this.camera)
        })
    }
}
