import { Mesh } from '@babylonjs/core';
import { SkyMaterial } from '@babylonjs/materials';

export default class {
    constructor(scene: any) {
        const skybox = Mesh.CreateBox('SkyBox', 1000, scene, false, Mesh.BACKSIDE);
        const skyMaterial = new SkyMaterial('skyMaterial', scene);
        skyMaterial.inclination = 0.1;
        skyMaterial.luminance = 1;
        skybox.material = skyMaterial;

        return skybox;
    }
}
