import { MeshBuilder, StandardMaterial, Mesh, HemisphericLight, Vector3, Color3, Engine } from '@babylonjs/core';
import Scene from '../babylon/scene';
import Camera from '../babylon/camera';
import SkyBox from '../babylon/skybox';

export default class Scene1 {
    private name = 'scene1';
    scene: any;
    sceneModel: any;
    light: any;
    camera: any;
    skybox: any;

    constructor(engine: Engine, canvas: HTMLCanvasElement) {
        this.sceneModel = new Scene(engine);
        this.scene = this.sceneModel.scene;
        this.camera = new Camera(this.sceneModel.scene, canvas);
        this.skybox = new SkyBox(this.sceneModel.scene);
        this.initial();
    }

    initial() {
        const ground = MeshBuilder.CreateGround('ground', { height: 180, width: 180, subdivisions: 4 }, this.scene);
        const groundMaterial = new StandardMaterial('groundMaterial', this.scene);
        // groundMaterial.diffuseColor = new Color3(0, 0, 0);
        ground.material = groundMaterial;
        this.light = new HemisphericLight('light', new Vector3(1, 1, 0), this.scene);

        // 圆圈
        const torus = MeshBuilder.CreateTorus('torus', {
            thickness: 0.25,
            diameter: 11,
        });
        torus.position.x = -10;
        torus.position.y = 1.65;
        torus.rotation.z = Math.PI / 2;

        const torusMaterial = new StandardMaterial('torusMaterial', this.scene);
        torusMaterial.diffuseColor = new Color3(1, 1, 1);
        torus.material = torusMaterial;

        // 球
        const sphere = MeshBuilder.CreateSphere('sphere', {}, this.scene);
        sphere.position.x = 6;
        sphere.position.y = 1.2;
        let flag = false;

        document.body.addEventListener('dblclick', () => {
            flag = true;
        });

        let sphereX = 6;
        let ratio = 0.1;
        this.scene.registerBeforeRender(function () {
            torus.position.z = 10 * Math.sin(ratio);
            ratio += 0.02;

            //运动到边界，没有碰撞到
            if (flag && sphere.position.x < -12) {
                console.log('失败');
                flag = false;
                setTimeout(() => {
                    sphere.position.x = 6;
                    sphereX = 6;
                }, 1000);
            }

            //发射，运动中
            if (flag) {
                sphere.position.x = sphereX;
                sphereX -= 0.5;
            }

            //碰撞了
            if (sphere.intersectsMesh(torus, false) && flag) {
                console.log('碰撞了', sphere.position);
                torusMaterial.diffuseColor = new Color3(1, 0, 0);

                flag = false;
                setTimeout(() => {
                    sphere.position.x = 6;
                    sphereX = 6;
                    torusMaterial.diffuseColor = new Color3(1, 1, 1);
                }, 1000);
            }
        });
    }

    render() {
        this.scene.render();
    }
    dispose() {
        this?.scene.getActiveMeshes().forEach((mesh: Mesh) => mesh.dispose());
        this?.scene.dispose();
    }
}
