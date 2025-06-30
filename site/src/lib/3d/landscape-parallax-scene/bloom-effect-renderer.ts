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
    private finalComposer: EffectComposer
    private bloomComposer: EffectComposer

    constructor(
        scene: THREE.Scene,
        camera: THREE.Camera,
        renderer: THREE.WebGLRenderer,
        canvas: HTMLCanvasElement,
        params = {
            exposure: 1,
            bloomStrength: 5,
            bloomThreshold: 0,
            bloomRadius: 0,
        },
    ) {
        const renderScene = new RenderPass(scene, camera)

        const bloomPass = new UnrealBloomPass(
            new THREE.Vector2(canvas.clientWidth, canvas.clientHeight),
            0.01,
            0.0005,
            0,
        )
        bloomPass.threshold = params.bloomThreshold
        bloomPass.strength = params.bloomStrength
        bloomPass.radius = params.bloomRadius

        this.bloomComposer = new EffectComposer(renderer)
        this.bloomComposer.renderToScreen = false
        this.bloomComposer.addPass(renderScene)
        this.bloomComposer.addPass(bloomPass)

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
}

