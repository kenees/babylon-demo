import { Scene, Engine } from '@babylonjs/core';

interface Ifun {
    (evt: any, pickResult: any): void;
}

interface Ifun2 {
    (): void;
}

interface Ievent {
    [key: string]: Ifun;
}

interface Ianimate {
    [key: string]: Ifun2;
}

export default class {
    private scene: any;
    private events: Ievent = {};
    private animate: Ianimate = {};

    constructor(engine: Engine) {
        this.scene = new Scene(engine);
        this.bindEvent();
        this.beforeRender();
    }

    private bindEvent() {
        this.scene.onPointerDown = function (evt: any, pickResult: any) {
            for (const key in this.events) {
                this.events[key]?.(evt, pickResult);
            }
        };
    }

    private beforeRender() {
        const self = this;
        this.scene.registerBeforeRender(function () {
            for (const key in self.animate) {
                self.animate[key]?.();
            }
        });
    }

    public registerEvent(key: string, cbk: Ifun) {
        this.events[key] = cbk;
    }

    public unregisterEvent(key: string) {
        delete this.events?.[key];
    }

    public registerAnimate(key: string, cbk: Ifun2) {
        this.animate[key] = cbk;
    }

    public unregisterAnimate(key: string) {
        delete this.animate?.[key];
    }

    public render() {
        this.scene.render();
    }
}
