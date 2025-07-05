import bloomFragmentShader from '@/assets/shaders/bloom.frag?raw'
import bloomVertexShader from '@/assets/shaders/bloom.vert?raw'

import * as THREE from 'three'
import {
    EffectComposer,
    RenderPass,
    ShaderPass,
    UnrealBloomPass,
} from 'three/examples/jsm/Addons.js'

export class BloomEffectRenderer {
    private bloomPass: UnrealBloomPass
    private bloomComposer: EffectComposer
    private finalComposer: EffectComposer

    constructor(
        scene: THREE.Scene,
        camera: THREE.Camera,
        renderer: THREE.WebGLRenderer,
        params = {
            exposure: 1,
            bloomStrength: 5,
            bloomThreshold: 0,
            bloomRadius: 0,
        },
    ) {
        const renderScene = new RenderPass(scene, camera)

        this.bloomPass = new UnrealBloomPass(
            new THREE.Vector2(window.innerWidth, window.innerHeight),
            0.01,
            0.0005,
            0,
        )
        this.bloomPass.threshold = params.bloomThreshold
        this.bloomPass.strength = params.bloomStrength
        this.bloomPass.radius = params.bloomRadius

        this.bloomComposer = new EffectComposer(renderer)
        this.bloomComposer.renderToScreen = false
        this.bloomComposer.addPass(renderScene)
        this.bloomComposer.addPass(this.bloomPass)

        const finalPass = new ShaderPass(
            new THREE.ShaderMaterial({
                uniforms: {
                    baseTexture: { value: null },
                    bloomTexture: { value: this.bloomComposer.renderTarget2.texture },
                },
                vertexShader: bloomVertexShader,
                fragmentShader: bloomFragmentShader,
                defines: {},
            }),
            'baseTexture',
        )
        finalPass.needsSwap = true

        this.finalComposer = new EffectComposer(renderer)
        this.finalComposer.addPass(renderScene)
        this.finalComposer.addPass(finalPass)
    }

    render() {
        this.bloomComposer.render()
        this.finalComposer.render()
    }

    handleResize(width: number, height: number) {
        this.bloomPass.setSize(width, height)

        this.finalComposer.renderTarget1.setSize(width, height)
        this.finalComposer.renderTarget2.setSize(width, height)

        this.bloomComposer.renderTarget1.setSize(width, height)
        this.bloomComposer.renderTarget2.setSize(width, height)
    }
}
