import {makeScene2D} from '@motion-canvas/2d/lib/scenes';
import {createRef, range} from '@motion-canvas/core/lib/utils';
import {waitFor} from '@motion-canvas/core/lib/flow';
import {Line, Rect} from "@motion-canvas/2d/lib/components";
import {easeOutCubic, tween} from "@motion-canvas/core/lib/tweening";
import {Direction} from "@motion-canvas/core/lib/types";
import {slideTransition} from "@motion-canvas/core/lib/transitions";
import {createSignal} from "@motion-canvas/core/lib/signals";

export default makeScene2D(function* (view) {
    const samples = 150;
    const width = 1524;
    const height = createSignal(0);
    const time = createSignal(0);
    const line = createRef<Line>();
    const bg = createRef<Rect>();

    view.add(

        <>
            <Line
                ref={line}
                lineWidth={150}
                stroke={'#fff'}
                points={range(samples).map(i => () => [
                    ((i - samples / 2) * width) / samples,
                    (Math.sin(time() + (Math.PI * i) / 50) * height()) / 2,
                ])}
            />,
            <Rect
                ref={bg}
                width={1920}
                height={1080}
                fill={'white'}
                opacity={0}
            />
        </>
    );
    // SLIDE IN
    yield* slideTransition(Direction.Right);

    // Amplitude
    yield height(500, 2)
    //yield* line().lineWidth(150, 1)

    // Mave the Line move
    yield* time(65,5)

    // Does nothing?
    //yield* waitUntil("Transition")

    // Make explosion effect so that the Line vanishes in the background
    yield line().lineWidth(250, 1)
    yield* waitFor(0.75)
    yield* bg().opacity(1,0.1)
    yield line().opacity(0,0)
    yield* tween (1.25, value => {
        bg().opacity(easeOutCubic(value, 1, 0));
    });
});
