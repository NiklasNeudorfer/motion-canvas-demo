import {makeScene2D} from '@motion-canvas/2d/lib/scenes';
import {createRef, range} from '@motion-canvas/core/lib/utils';
import {Line} from "@motion-canvas/2d/lib/components";
import {createSignal} from "@motion-canvas/core/lib/signals";

export default makeScene2D(function* (view) {
    //const windowMain = createRef<Rect>()
    const lineRef = createRef<Line>()
    const length = createSignal(0);

    yield view.add(
        <Line
            ref={lineRef}
            points={range(340).map(i => () => [
                length() * i / 340, 0,
            ])}
            x={0}
            y={0}
            lineDash={[20, 20]}
            endArrow
            lineWidth={8}
            radius={0}
            stroke={'#242424'}
        />
    );


    // Mave the Line move
    yield* length(view.width(), 2)

});
