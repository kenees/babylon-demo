import React, { useState, useLayoutEffect, useCallback } from 'react';
import { useResizeDetector } from 'react-resize-detector';
import styles from './App.module.scss';
import Renderer from './render/babylon';

export default () => {
    const [ref, setRef] = useState<HTMLCanvasElement | null>(null);
    const resizeDetector = useResizeDetector();

    const [renderer] = useState(new Renderer());

    useLayoutEffect(() => {
        if (ref) {
            renderer.initial(ref);
        }
    }, [renderer, ref]);

    const changeScene = useCallback(
        (i: number) => {
            renderer.changeScene(i);
        },
        [renderer]
    );

    return (
        <div className={styles.container} ref={resizeDetector.ref}>
            <canvas ref={setRef} width={resizeDetector.width} height={resizeDetector.height} />
            <div className={styles.list}>
                <div className={styles.item} onClick={() => changeScene(0)}>
                    demo1
                </div>
                <div className={styles.item} onClick={() => changeScene(1)}>
                    demo1
                </div>
                <div className={styles.item} onClick={() => changeScene(2)}>
                    demo1
                </div>
                <div className={styles.item} onClick={() => changeScene(3)}>
                    demo1
                </div>
            </div>
        </div>
    );
};
