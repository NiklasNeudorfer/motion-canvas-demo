import {makeScene2D} from "@motion-canvas/2d";
import {beginSlide} from "@motion-canvas/core/lib/utils";
import {Rect, Txt} from "@motion-canvas/2d/lib/components";
import {waitFor} from "@motion-canvas/core/lib/flow";
import {slideTransition} from "@motion-canvas/core/lib/transitions";
import {Direction} from "@motion-canvas/core/lib/types";

export default makeScene2D(function* (view) {

    view.fill("black");

    view.add(
        <Rect fill={"white"} radius={40} smoothCorners width={() => view.width()} height={() => view.height()}>
            <Txt fontSize={70} fill={"black"} fontFamily={'Fira Code'} text={"XQuery"}/>
        </Rect>
    )

    yield* slideTransition(Direction.Bottom, 1)

    yield* waitFor(3)

});