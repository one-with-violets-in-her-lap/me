import crowModel from '@/assets/3d-models/crow.glb?url'

import * as THREE from 'three'
import { GLTFLoader, OrbitControls, type GLTF } from 'three/examples/jsm/Addons.js'
import { animate } from 'motion'
import { NotInitializedError } from '@/lib/utils/errors'

export class Crow3dObject {
    private gltfModel?: GLTF
    private mixer?: THREE.AnimationMixer

    private readonly ANIMATION_SPEED = 0.8

    constructor(private readonly gltfLoader: GLTFLoader) {}

    async initialize() {
        this.gltfModel = await this.gltfLoader.loadAsync(crowModel)
        this.gltfModel.scene.scale.set(0.04, 0.04, 0.04)
        this.gltfModel.scene.position.y = 4
        this.gltfModel.scene.position.x = 10
        this.gltfModel.scene.position.z = -20

        this.gltfModel.scene.traverse(child => {
            if (child instanceof THREE.Mesh) {
                child.castShadow = true
                child.receiveShadow = true

                const newMaterial = new THREE.MeshStandardMaterial({
                    color: 0xffffff,
                    metalness: 0.2,
                    roughness: 0.6,
                })

                // If the original material had a map (texture), reapply it
                if (child.material.map) {
                    newMaterial.map = child.material.map
                }

                child.material = newMaterial
            }
        })

        this.startAnimation()

        return this.gltfModel
    }

    update(deltaTime: number) {
        if (!this.mixer) {
            throw new NotInitializedError()
        }

        this.mixer.update(deltaTime * this.ANIMATION_SPEED)
    }

    private startAnimation() {
        if (!this.gltfModel) {
            throw new NotInitializedError()
        }

        const gltfModel = this.gltfModel

        this.mixer = new THREE.AnimationMixer(gltfModel.scene)
        const animation = this.mixer.clipAction(gltfModel.animations[0])
        animation.play()
        this.mixer.timeScale = -1
        this.mixer.setTime(0.2)

        animate(gltfModel.scene.position, { x: 0, z: 0 }, { duration: 3 })

        animate(
            gltfModel.scene.position,
            { y: 1.2 },
            {
                duration: 0.8,
                delay: 3,
                onComplete: () => {
                    animate(
                        gltfModel.scene.rotation,
                        { y: 0, x: 0 },
                        { duration: 0.3 },
                    )
                },
            },
        )

        animate(
            gltfModel.scene.rotation,
            { y: -0.3, x: 0.5 },
            {
                duration: 0.6,
                delay: 0.3,
            },
        )
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

        const ambientLight = new THREE.AmbientLight('white', 0.2)
        ambientLight.position.set(10, 10, 10)
        this.scene.add(ambientLight)

        this.pointLight = new THREE.PointLight(0xffffff, 6, 0, 0)
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

            this.crow.update(deltaTime)

            this.controls.update()
            this.renderer.render(this.scene, this.camera)
        })
    }
}
