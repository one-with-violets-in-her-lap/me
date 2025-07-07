import pinkTreeGlbModelUrl from '@/assets/3d-models/pink-tree.glb?url'
import { NotInitializedError } from '@/lib/utils/errors'

import * as THREE from 'three'
import { type GLTF, GLTFLoader } from 'three/examples/jsm/Addons.js'

export class PinkTree3dObject {
    private gltfModel?: GLTF
    private mixer?: THREE.AnimationMixer

    private readonly ANIMATION_SPEED = 0.6

    constructor(private readonly gltfLoader: GLTFLoader) {}

    async initialize() {
        this.gltfModel = await this.gltfLoader.loadAsync(pinkTreeGlbModelUrl)

        this.startAnimation()

        return this.gltfModel
    }

    update(deltaTime: number) {
        if (!this.mixer) {
            throw new NotInitializedError()
        }

        this.mixer.update(deltaTime * this.ANIMATION_SPEED)
    }

    startAnimation() {
        if (!this.gltfModel) {
            throw new NotInitializedError()
        }

        const gltfModel = this.gltfModel

        this.mixer = new THREE.AnimationMixer(gltfModel.scene)
        const animation = this.mixer.clipAction(gltfModel.animations[0])
        animation.play()
    }
}
