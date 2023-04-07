import {makeScene2D} from "@motion-canvas/2d";
import {CodeBlock, insert, lines} from "@motion-canvas/2d/lib/components/CodeBlock";
import {beginSlide, createRef} from "@motion-canvas/core/lib/utils";
import {slideTransition} from "@motion-canvas/core/lib/transitions";
import {Direction} from "@motion-canvas/core/lib/types";
import {all, chain, sequence, waitFor} from "@motion-canvas/core/lib/flow";
import {Img, Rect, Txt, Node} from "@motion-canvas/2d/lib/components";
import enomicsFont from "../../../images/cpc/EnomicsFont.jpg"
import {SmoothSpring, spring} from "@motion-canvas/core/lib/tweening";

export default makeScene2D(function* (view) {

    const bgRadius = 70;
    const bg = "white"
    view.fill(bg)
    const enomicsColor = "rgb(0, 187, 255)"
    const logoLength = 500;

    const bgRef = createRef<Rect>()

    view.add(
        <Rect fill={"black"} width={() => view.width()} height={() => view.height()}>

            <Rect ref={bgRef} fill={"white"} radius={bgRadius} smoothCorners
                  width={() => view.width()} height={() => view.height()}>
            </Rect>
        </Rect>
    )


    view.add(
        <Txt fontSize={120} fontFamily={"Open Sans"} text={"CPC - Charging Point Controller"}></Txt>
    )

    yield* waitFor(2)

    yield* beginSlide("End TITle ")

    yield* all(
        bgRef().radius([bgRadius, bgRadius, 0, 0], 1)
    )

});