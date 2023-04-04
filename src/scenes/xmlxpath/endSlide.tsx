import {makeScene2D} from "@motion-canvas/2d";
import {beginSlide, createRef} from "@motion-canvas/core/lib/utils";
import {Circle, Img, Node, Polygon, Rect, Spline, Txt, Video} from "@motion-canvas/2d/lib/components";
import {all, chain, sequence, waitFor} from "@motion-canvas/core/lib/flow";
import {slideTransition} from "@motion-canvas/core/lib/transitions";
import {Direction} from "@motion-canvas/core/lib/types";
import {easeInBounce, easeOutCubic, SmoothSpring, spring} from "@motion-canvas/core/lib/tweening";

export default makeScene2D(function* (view) {

    const spline = createRef<Spline>();
    const bottomBrow = createRef<Node>()
    const topBrow = createRef<Node>()
    const eyes = createRef<Node>()

    const text = createRef<Txt>()

    view.add(
        <>
            <Txt ref={text} fill={"white"}
                 fontSize={120}
                 fontFamily={"Fira Code"}
                 y={() => view.height() / 2 - 100}
                 x={() => view.width() / -2 + 950}></Txt>

            <Node rotation={5}>

                <Spline
                    ref={spline}
                    zIndex={120}
                    lineWidth={32}
                    stroke={'white'}
                    points={[
                        [-150, -100],
                        [-50, -10],
                        [50, -10],
                        [150, -100],
                    ]}
                    end={0}
                />

                <Node ref={eyes} scale={0}>
                    <Circle fill={"white"} x={300} y={-90} height={120} width={120}></Circle>
                    <Circle fill={"white"} x={-300} y={-90} height={120} width={120}></Circle>
                </Node>


                <Node ref={topBrow} y={-120}>
                    <Rect fill={"black"} height={120} width={600} x={400} rotation={-20} y={-240}></Rect>
                    <Rect fill={"black"} height={120} width={600} x={-400} rotation={20} y={-240}></Rect>
                </Node>

                <Node ref={bottomBrow} y={120}>
                    <Rect fill={"black"} height={120} width={600} x={400} rotation={-20} y={-20}></Rect>
                    <Rect fill={"black"} height={120} width={600} x={-400} rotation={20} y={-20}></Rect>
                </Node>

            </Node>
        </>
    );

    yield* sequence(
        0.3,
        text().text("Thanks for your attention!", 2),
        spring(SmoothSpring, 0, 100, value => {
            eyes().scale(value / 100);
        }),
        spline().end(1, 1.5, easeOutCubic)
    );

    yield* beginSlide("eyes sqinch")
    yield* all(
        topBrow().position.y(0, 1),
        bottomBrow().position.y(0, 1)
    )


    yield* beginSlide("end")
});