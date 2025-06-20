import * as THREE from 'three'
import { GLTFLoader, OrbitControls } from 'three/examples/jsm/Addons.js'
import { Crow3dObject } from './crow'

export class Crow3dScene {
    private readonly clock: THREE.Clock
    private readonly scene: THREE.Scene
    private readonly camera: THREE.Camera
    private readonly renderer: THREE.WebGLRenderer

    private readonly gltfLoader: GLTFLoader

    private readonly controls: OrbitControls

    private readonly pointLight: THREE.PointLight
    private readonly crow: Crow3dObject
    private readonly platform: Platform3dObject

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

        const ambientLight = new THREE.AmbientLight('white', 0.5)
        ambientLight.position.set(10, 10, 10)
        this.scene.add(ambientLight)

        this.pointLight = new THREE.PointLight('#ffdbde', 6, 0, 0)
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

        this.crow = new Crow3dObject(this.gltfLoader)

        this.platform = new Platform3dObject()
        this.scene.add(this.platform.mesh)
    }

    async initialize() {
        const crowModel = await this.crow.initialize()
        this.scene.add(crowModel.scene)

        document.addEventListener('mousemove', event =>
            this.moveCameraAccordingToMousePosition(event.pageX),
        )
        document.addEventListener('touchmove', event =>
            this.moveCameraAccordingToMousePosition(event.touches[0].pageX),
        )

        this.renderer.setAnimationLoop(() => {
            const deltaTime = this.clock.getDelta()

            this.crow.update(deltaTime)

            this.controls.update()
            this.renderer.render(this.scene, this.camera)
        })
    }

    private moveCameraAccordingToMousePosition(x: number) {
        const middleX = window.innerWidth / 2

        const xMultiplier = -(middleX - x) / middleX

        this.camera.position.x = 3 * xMultiplier
        this.camera.position.z = THREE.MathUtils.clamp(6 * xMultiplier, 6, 8)
    }
}

export class Platform3dObject {
    readonly mesh: THREE.Mesh

    constructor() {
        const boxGeometry = new THREE.BoxGeometry(30, 30, 0.1)
        const material = new THREE.ShadowMaterial()

        this.mesh = new THREE.Mesh(boxGeometry, material)
        this.mesh.rotation.x = -1.2
        this.mesh.position.y = -2
        this.mesh.receiveShadow = true
    }
}
