import { MeshBuilder, StandardMaterial, Mesh, HemisphericLight, Vector3, Engine } from '@babylonjs/core';
import Scene from '../babylon/scene';
import Camera from '../babylon/camera';

export default class Scene2 {
    private name = 'scene2';
    scene: any;
    sceneModel: any;
    light: any;
    camera: any;

    constructor(engine: Engine, canvas: HTMLCanvasElement) {
        this.sceneModel = new Scene(engine);
        this.scene = this.sceneModel.scene;
        this.camera = new Camera(this.sceneModel.scene, canvas);
        this.initial();
    }

    initial() {
        const ground = MeshBuilder.CreateGround('ground', { height: 18, width: 180, subdivisions: 4 }, this.scene);
        const groundMaterial = new StandardMaterial('groundMaterial', this.scene);
        ground.material = groundMaterial;
        this.light = new HemisphericLight('light', new Vector3(1, 1, 0), this.scene);
    }

    render() {
        this.scene?.render();
    }
    dispose() {
        this?.scene.getActiveMeshes().forEach((mesh: Mesh) => mesh.dispose());
        this?.scene.dispose();
    }
}
