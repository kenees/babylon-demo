import { Vector3, ArcRotateCamera, Scene } from '@babylonjs/core';

export default class Camera {
    constructor(scene: Scene, canvas: HTMLCanvasElement) {
        const camera = new ArcRotateCamera('Camera', 0, 1.05, 50, Vector3.Zero(), scene);
        camera.position.set(1.3, 23, -44);

        camera.panningDistanceLimit = 0.0001;
        camera.attachControl(canvas, true);
        return camera;
    }
}
