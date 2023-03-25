import {makeScene2D} from "@motion-canvas/2d";
import {Circle, Line, Node, Txt} from "@motion-canvas/2d/lib/components";
import {all, chain, waitFor} from "@motion-canvas/core/lib/flow";
import {beginSlide, createRef, range} from "@motion-canvas/core/lib/utils";
import {easeInCubic, easeOutCubic, SmoothSpring, spring} from "@motion-canvas/core/lib/tweening";
import {createSignal} from "@motion-canvas/core/lib/signals";
import {slideTransition} from "@motion-canvas/core/lib/transitions";
import {Direction} from "@motion-canvas/core/lib/types";

export default makeScene2D(function* (view) {

    const logoGreen = createRef<Circle>()
    const logo = createRef<Node>()

    yield* beginSlide("Logo")

    let radius = 300;
    let elements = 340;
    let margin = 30
    let lineDownLength = createSignal(0)
    let lineUpLength = createSignal(0)

    let lineWidth = 30;
    let checkMarkCenterOffset = 0.2;


    view.add(
        <Node ref={logo}>
            <Circle
                ref={logoGreen}
                fill="lime"
                height={radius}
                width={radius}
            >
                <Node x={-20} y={-10}>
                    <Line
                        stroke="white"
                        lineWidth={lineWidth}
                        zIndex={10}
                        x={() => -logoGreen().width() / 2}
                        points={
                            range(elements).map(i => () => [
                                ((lineDownLength() * i / elements) + lineWidth / 3) + logoGreen().width() * checkMarkCenterOffset,
                                lineDownLength() * i / elements
                            ])}
                    />
                    <Line
                        stroke="white"
                        lineWidth={lineWidth}
                        zIndex={10}
                        y={() => -logoGreen().height() / 2 + 60}
                        points={
                            range(elements).map(i => () => [
                                ((lineUpLength() * i / elements) - lineWidth / 3), // - logoGreen().width() * checkMarkCenterOffset,
                                -lineUpLength() * i / elements + lineDownLength() * 2
                            ])}
                    />
                </Node>
            </Circle>
        </Node>
    )

    yield* chain(
        spring(SmoothSpring, 0, 300, value => {
            logoGreen().height(value);
            logoGreen().width(value);
        }),
        chain(
            lineDownLength((logoGreen().width() / 2) - logoGreen().width() * checkMarkCenterOffset, 1, easeInCubic),
            lineUpLength(logoGreen().width() / 2 + logoGreen().width() * checkMarkCenterOffset - 70, 1, easeOutCubic)
        )
    )

    yield* beginSlide("Text")


    const titleText = createRef<Txt>()

    view.add(
        <Txt fontFamily={'Fira Code'} x={140} ref={titleText} fontSize={150} fill={"white"}/>
    )


    yield* all(
        logo().position.x(-700, 1),
        titleText().text("GitHub Actions", 1),
    )

    yield* waitFor(3)
})
