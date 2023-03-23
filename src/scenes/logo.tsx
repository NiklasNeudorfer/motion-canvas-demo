import {makeScene2D} from "@motion-canvas/2d";
import {Circle, Line} from "@motion-canvas/2d/lib/components";
import {chain} from "@motion-canvas/core/lib/flow";
import {beginSlide, createRef, range} from "@motion-canvas/core/lib/utils";
import {SmoothSpring, spring} from "@motion-canvas/core/lib/tweening";
import {createSignal} from "@motion-canvas/core/lib/signals";

export default makeScene2D(function* (view) {

    const logoGreen = createRef<Circle>()

    beginSlide("Logo")

    let radius = 300;
    let elements = 340;
    let margin = 30
    let lineDownLength = createSignal(0)
    let lineUpLength = createSignal(0)

    let lineWidth = 30;
    let checkMarkCenterOffset = 0.2;


    yield view.add(
        <Circle
            ref={logoGreen}
            fill="lime"
            height={radius}
            width={radius}
        >
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
                y={() => -logoGreen().height() / 2}
                points={
                    range(elements).map(i => () => [
                        ((lineUpLength() * i / elements) - lineWidth / 3), // - logoGreen().width() * checkMarkCenterOffset,
                        -lineUpLength() * i / elements + lineDownLength() * 2
                    ])}
            />
        </Circle>
    )

    yield* spring(SmoothSpring, 0, 300, value => {
        logoGreen().height(value);
        logoGreen().width(value);
    });


    yield* chain(
        lineDownLength((logoGreen().width() / 2) - logoGreen().width() * checkMarkCenterOffset, 1),
        lineUpLength(logoGreen().width() / 2 + logoGreen().width() * checkMarkCenterOffset, 1)
    )
    beginSlide("Logo2")
})
