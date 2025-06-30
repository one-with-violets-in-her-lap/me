import pinkTreeGlbModelUrl from '@/assets/3d-models/pink-tree.glb?url'

import * as THREE from 'three'
import { type GLTF, GLTFLoader } from 'three/examples/jsm/Addons.js'
import { NotInitializedError } from '@/lib/utils/errors'

export class PinkTree3dObject {
    private gltfModel?: GLTF

    private readonly ANIMATION_SPEED = 0.8

    constructor(private readonly gltfLoader: GLTFLoader) {}

    async initialize() {
        this.gltfModel = await this.gltfLoader.loadAsync(pinkTreeGlbModelUrl)
        return this.gltfModel
    }

    update(deltaTime: number) {}
}
