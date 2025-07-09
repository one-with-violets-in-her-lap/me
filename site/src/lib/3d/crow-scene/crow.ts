import crowModel from '@/assets/3d-models/crow.glb?url'

import * as THREE from 'three'
import type { GLTF, GLTFLoader } from 'three/examples/jsm/Addons.js'
import { animate } from 'motion'
import { NotInitializedError } from '@/lib/utils/errors'

export class Crow3dObject {
    private gltfModel?: GLTF
    private mixer?: THREE.AnimationMixer

    private readonly ANIMATION_SPEED = 0.8

    constructor(private readonly gltfLoader: GLTFLoader) {}

    async initialize() {
        this.gltfModel = await this.gltfLoader.loadAsync(crowModel)

        this.gltfModel.scene.traverse(child => {
            if (child instanceof THREE.Mesh) {
                child.castShadow = true

                const newMaterial = new THREE.MeshStandardMaterial({
                    color: 0xffffff,
                    metalness: 1,
                })

                // If the original material had a map (texture), reapply it
                if (child.material.map) {
                    newMaterial.map = child.material.map
                }

                child.material = newMaterial
            }
        })

        return this.gltfModel
    }

    update(deltaTime: number) {
        if (!this.mixer) {
            throw new NotInitializedError()
        }

        this.mixer.update(deltaTime * this.ANIMATION_SPEED)
    }

    flyByAndDispose() {
        if (!this.gltfModel) {
            throw new NotInitializedError()
        }

        const gltfModel = this.gltfModel

        this.gltfModel.scene.position.y = THREE.MathUtils.randFloat(0, 2)
        this.gltfModel.scene.position.x = THREE.MathUtils.randFloat(-10, -6)
        this.gltfModel.scene.position.z = -20
        this.gltfModel.scene.scale.set(0.02, 0.02, 0.02)

        this.mixer = new THREE.AnimationMixer(gltfModel.scene)
        const animation = this.mixer.clipAction(gltfModel.animations[0])
        animation.play()
        this.mixer.timeScale = -1
        this.mixer.setTime(0.3)

        animate(
            gltfModel.scene.position,
            { x: 16, z: THREE.MathUtils.randFloat(-2, 2) },
            { duration: 2.3 },
        )
        animate(
            gltfModel.scene.position,
            { y: THREE.MathUtils.randFloat(2, 3) },
            { duration: 1.2, delay: 0.5 },
        )
        animate(gltfModel.scene.rotation, { y: -0.3 }, { duration: 1.5 })
    }

    flyAwayAndDispose() {
        if (!this.gltfModel) {
            throw new NotInitializedError()
        }

        const gltfModel = this.gltfModel

        this.gltfModel.scene.position.y = THREE.MathUtils.randFloat(-3, -2)
        this.gltfModel.scene.position.x = THREE.MathUtils.randFloat(9, 12)
        this.gltfModel.scene.position.z = -15
        this.gltfModel.scene.scale.set(0.03, 0.03, 0.03)

        this.mixer = new THREE.AnimationMixer(gltfModel.scene)
        const animation = this.mixer.clipAction(gltfModel.animations[0])
        animation.play()
        this.mixer.timeScale = -1
        this.mixer.setTime(0.3)

        animate(
            gltfModel.scene.position,
            {
                x: THREE.MathUtils.randFloat(-7, 2),
                z: -26,
                y: THREE.MathUtils.randFloat(1, 5),
            },
            {
                duration: 2.2,
                onComplete: () => {
                    this.dispose()
                },
            },
        )
    }

    startArrivalAnimation() {
        if (!this.gltfModel) {
            throw new NotInitializedError()
        }

        const gltfModel = this.gltfModel

        this.gltfModel.scene.position.y = 4
        this.gltfModel.scene.position.x = 10
        this.gltfModel.scene.position.z = -20
        this.gltfModel.scene.scale.set(0.04, 0.04, 0.04)

        this.mixer = new THREE.AnimationMixer(gltfModel.scene)
        const animation = this.mixer.clipAction(gltfModel.animations[0])
        animation.play()
        this.mixer.timeScale = -1
        this.mixer.setTime(0.2)

        animate(gltfModel.scene.position, { x: 1.5, z: 0 }, { duration: 3 })

        animate(
            gltfModel.scene.position,
            { y: 1.2 },
            {
                duration: 0.8,
                delay: 3,
                onComplete: () => {
                    animate(
                        gltfModel.scene.rotation,
                        { y: 0.6, x: 0 },
                        { duration: 0.3 },
                    )
                },
            },
        )

        animate(
            gltfModel.scene.rotation,
            { y: -0.3, x: 0.6 },
            {
                duration: 0.6,
                delay: 0.3,
            },
        )
    }

    dispose() {
        this.gltfModel?.scene.clear()
    }
}
