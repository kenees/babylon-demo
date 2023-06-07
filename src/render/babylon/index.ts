import { Engine } from '@babylonjs/core';
import Scene1 from '../scene1';
import Scene2 from '../scene2';

export default class {
    engine: any;
    scene: any;
    light: any;
    skybox: any;

    // my demo
    sceneList: Array<any> = [];

    activeScene = 0;

    initial(canvas: HTMLCanvasElement) {
        this.engine = new Engine(canvas, true);

        this.sceneList.push(new Scene1(this.engine, canvas));
        this.sceneList.push(new Scene2(this.engine, canvas));

        this.engine.runRenderLoop(() => {
            const _scene = this.sceneList[this.activeScene];
            if (_scene) {
                _scene?.render();
            }
        });
    }

    handleLogic() {
        // const ground = MeshBuilder.CreateGround(
        //     'ground',
        //     { height: 180, width: 180, subdivisions: 4 },
        //     this.scene.scene
        // );
        // const groundMaterial = new StandardMaterial('groundMaterial', this.scene.scene);
        // // groundMaterial.diffuseColor = new Color3(0, 0, 0);
        // ground.material = groundMaterial;
        //
        // // 圆圈
        // const torus = MeshBuilder.CreateTorus('torus', {
        //     thickness: 0.25,
        //     diameter: 11,
        // });
        // torus.position.x = -10;
        // torus.position.y = 1.65;
        // torus.rotation.z = Math.PI / 2;
        //
        // const torusMaterial = new StandardMaterial('torusMaterial', this.scene.scene);
        // torusMaterial.diffuseColor = new Color3(1, 1, 1);
        // torus.material = torusMaterial;
        //
        // // 球
        // const sphere = MeshBuilder.CreateSphere('sphere', {}, this.scene.scene);
        // sphere.position.x = 6;
        // sphere.position.y = 1.2;
        // let flag = false;
        //
        // document.body.addEventListener('dblclick', () => {
        //     flag = true;
        // });
        //
        // let sphereX = 6;
        // let ratio = 0.1;
        // this.scene.registerBeforeRender(function () {
        //     torus.position.z = 10 * Math.sin(ratio);
        //     ratio += 0.02;
        //
        //     //运动到边界，没有碰撞到
        //     if (flag && sphere.position.x < -12) {
        //         console.log('失败');
        //         flag = false;
        //         setTimeout(() => {
        //             sphere.position.x = 6;
        //             sphereX = 6;
        //         }, 1000);
        //     }
        //
        //     //发射，运动中
        //     if (flag) {
        //         sphere.position.x = sphereX;
        //         sphereX -= 0.5;
        //     }
        //
        //     //碰撞了
        //     if (sphere.intersectsMesh(torus, false) && flag) {
        //         console.log('碰撞了', sphere.position);
        //         torusMaterial.diffuseColor = new Color3(1, 0, 0);
        //
        //         flag = false;
        //         setTimeout(() => {
        //             sphere.position.x = 6;
        //             sphereX = 6;
        //             torusMaterial.diffuseColor = new Color3(1, 1, 1);
        //         }, 1000);
        //     }
        // });
    }

    changeScene(key: number) {
        this.activeScene = key;
    }
}
