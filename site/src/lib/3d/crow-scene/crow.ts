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
        this.gltfModel.scene.scale.set(0.04, 0.04, 0.04)
        this.gltfModel.scene.position.y = 4
        this.gltfModel.scene.position.x = 10
        this.gltfModel.scene.position.z = -20

        this.gltfModel.scene.traverse(child => {
            if (child instanceof THREE.Mesh) {
                child.castShadow = true

                const newMaterial = new THREE.MeshStandardMaterial({
                    color: 0xffffff,
                    metalness: 1.2,
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
}
