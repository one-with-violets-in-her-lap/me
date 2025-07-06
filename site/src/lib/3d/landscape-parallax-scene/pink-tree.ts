import pinkTreeGlbModelUrl from '@/assets/3d-models/pink-tree.glb?url'

import { type GLTF, GLTFLoader } from 'three/examples/jsm/Addons.js'

export class PinkTree3dObject {
    private gltfModel?: GLTF

    constructor(private readonly gltfLoader: GLTFLoader) {}

    async initialize() {
        this.gltfModel = await this.gltfLoader.loadAsync(pinkTreeGlbModelUrl)
        return this.gltfModel
    }

    update() {}
}
