import {makeScene2D} from "@motion-canvas/2d";
import {Circle, Line, Rect, Txt} from "@motion-canvas/2d/lib/components";
import {beginSlide, createRef, range} from "@motion-canvas/core/lib/utils";
import {easeInCubic} from "@motion-canvas/core/lib/tweening";
import {all, waitFor} from "@motion-canvas/core/lib/flow";
import {createSignal} from "@motion-canvas/core/lib/signals";

export default makeScene2D(function* (view) {
    let boxWidth = 500;
    let boxHeight = 120;
    let boxRadius = 20;
    let spacingFactor = 1.4
    let moveToTop = -200;

    let circleRadius = 30;
    let smallerCircleRadius = circleRadius - 10;

    const event = createRef<Rect>()
    const runner1 = createRef<Rect>()
    const runner2 = createRef<Rect>()

    const eventCircleBlue = createRef<Circle>()
    const eventCircleWhite = createRef<Circle>()
    const eventText = createRef<Txt>()

    const runner1CircleBlueLeft = createRef<Circle>()
    const runner1CircleWhiteLeft = createRef<Circle>()
    const runner1CircleBlueRight = createRef<Circle>()
    const runner1CircleWhiteRight = createRef<Circle>()
    const runner1Text = createRef<Txt>()
    const runner1Content = createRef<Rect>()

    const connectorLine = createRef<Line>()

    const runner2CircleBlueLeft = createRef<Circle>()
    const runner2CircleWhiteLeft = createRef<Circle>()
    const runner2Text = createRef<Txt>()
    const runner2Content = createRef<Rect>()

    const connectorLength = createSignal(0);

    //yield* beginSlide('first slide');

    // region DRAWING
    yield view.add(
        <Rect
            ref={event}
            x={boxWidth * -spacingFactor}
            y={moveToTop}
            fill="#0A69DB"
            width={0}
            height={0}
            radius={boxRadius}
        >
            <Line
                ref={connectorLine}
                stroke="#AEB1B9"
                lineWidth={7}
                points={range(340).map(i => () =>
                    [
                        connectorLength() * i / 340, 0,
                    ])}
                zIndex={-1}
            >
            </Line>
        </Rect>
    )

    yield view.add(
        <Rect
            ref={event}
            x={boxWidth * -spacingFactor}
            y={moveToTop}
            fill="#0A69DB"
            zIndex={10}
            width={boxWidth}
            height={boxHeight}
            radius={boxRadius}
        >
            <Txt ref={eventText} text="Event" fill="#FFFFFF"/>

            <Circle
                ref={eventCircleBlue}
                width={circleRadius}
                height={circleRadius}
                fill="#0A69DB"
                zIndex={10}
                x={boxWidth / 2}>
                <Circle ref={eventCircleWhite} width={smallerCircleRadius} height={smallerCircleRadius} fill="#FFFFFF"/>
            </Circle>
        </Rect>
    )

    yield view.add(
        <Rect
            ref={runner1}
            x={0}
            y={moveToTop}
            fill="#0A69DB"
            zIndex={10}
            width={boxWidth}
            height={boxHeight}
            radius={[boxRadius, boxRadius, 0, 0]}
        >
            <Txt ref={runner1Text} text="Runner 1" fill="#FFFFFF"/>

            <Circle
                ref={runner1CircleBlueLeft}
                width={circleRadius}
                height={circleRadius}
                fill="#0A69DB"
                x={() => runner1().width() / -2}>
                <Circle ref={runner1CircleWhiteLeft}
                        width={smallerCircleRadius}
                        height={smallerCircleRadius}
                        fill="#FFFFFF"/>
            </Circle>

            <Circle
                ref={runner1CircleBlueRight}
                width={circleRadius}
                height={circleRadius}
                fill="#0A69DB"
                x={() => runner1().width() / 2}>
                <Circle ref={runner1CircleWhiteRight} width={smallerCircleRadius} height={smallerCircleRadius}
                        fill="#FFFFFF"/>
            </Circle>


            <Rect
                ref={runner1Content}
                y={boxHeight * 2}
                fill="#FFFFFF"
                width={boxWidth}
                height={boxHeight * 3}
                radius={[0, 0, boxRadius, boxRadius]}
            >
            </Rect>
        </Rect>
    )

    yield view.add(
        <Rect
            ref={runner2}
            x={boxWidth * spacingFactor}
            y={moveToTop}
            fill="#0A69DB"
            zIndex={10}
            width={boxWidth}
            height={boxHeight}
            radius={[boxRadius, boxRadius, 0, 0]}
        >
            <Txt ref={runner2Text} text="Runner 2" fill="#FFFFFF"/>

            <Circle
                ref={runner2CircleBlueLeft}
                width={circleRadius}
                height={circleRadius}
                fill="#0A69DB"
                zIndex={-1}
                x={boxWidth / -2}>
                <Circle ref={runner2CircleWhiteLeft} width={smallerCircleRadius} height={smallerCircleRadius}
                        fill="#FFFFFF"/>
            </Circle>

            <Rect
                ref={runner2Content}
                y={boxHeight * 2}
                fill="#FFFFFF"
                width={boxWidth}
                height={boxHeight * 3}
                radius={[0, 0, boxRadius, boxRadius]}
            >
            </Rect>
        </Rect>
    )

    // endregion

    //------------------//
    // ANIMATIONS
    //------------------//

    // region SAVE POSITIONS
    event().save();
    eventCircleBlue().save();
    eventCircleWhite().save();
    eventText().save();

    yield* runner1().radius(boxRadius, 0)
    runner1().save();
    runner1Text().save()
    runner1CircleWhiteRight().save();
    runner1CircleBlueRight().save();
    runner1CircleWhiteLeft().save();
    runner1CircleBlueLeft().save();
    runner1Content().save();

    yield* runner2().radius(boxRadius, 0)
    runner2().save();
    runner2Text().save()
    runner2CircleWhiteLeft().save();
    runner2CircleBlueLeft().save();
    runner2Content().save();

    //endregion

    // region REMOVE CONTENT
    yield* event().width(0, 0)
    yield* eventCircleBlue().width(0, 0)
    yield* eventCircleWhite().width(0, 0)
    yield* eventCircleWhite().height(0, 0)
    yield* eventText().opacity(0, 0)

    yield* runner1().width(0, 0)
    yield* runner1Text().opacity(0, 0)
    yield* runner1CircleWhiteRight().width(0, 0)
    yield* runner1CircleWhiteRight().height(0, 0)
    yield* runner1CircleBlueRight().width(0, 0)
    yield* runner1CircleBlueRight().height(0, 0)
    yield* runner1CircleWhiteLeft().width(0, 0)
    yield* runner1CircleWhiteLeft().height(0, 0)
    yield* runner1CircleBlueLeft().height(0, 0)
    yield* runner1CircleBlueLeft().width(0, 0)
    yield* runner1Content().position.y(boxHeight / 2, 0);
    yield* runner1Content().height(0, 0)

    yield* runner2().width(0, 0)
    yield* runner2Text().opacity(0, 0)
    yield* runner2CircleWhiteLeft().width(0, 0)
    yield* runner2CircleWhiteLeft().height(0, 0)
    yield* runner2CircleBlueLeft().height(0, 0)
    yield* runner2CircleBlueLeft().width(0, 0)
    yield* runner2Content().position.y(boxHeight / 2, 0);
    yield* runner2Content().height(0, 0)
    // endregion


    // region 1st BLUE THINGY - Event
    yield* event().restore(1, easeInCubic)
    yield* eventText().restore(0.3, easeInCubic)

    yield* all(
        eventCircleBlue().restore(0.2, easeInCubic),
        eventCircleWhite().restore(0.2, easeInCubic)
    )
    // endregion

    // region 2nd BLUE THINGY - Runner 1
    yield* all(
        runner1().restore(1, easeInCubic),
        runner1CircleBlueRight().restore(1, easeInCubic),
        runner1CircleBlueLeft().restore(1, easeInCubic),
        runner1CircleWhiteRight().restore(1, easeInCubic),
        runner1CircleWhiteLeft().restore(1, easeInCubic),

        connectorLength(boxWidth, 1.3)
    )

    yield* runner1Text().restore(0.7, easeInCubic)
    // endregion

    // region 3rd BLUE THINGY - Runner 2
    yield* runner2().restore(1, easeInCubic)
    yield* runner2Text().restore(0.3, easeInCubic)

    yield* all(
        runner2CircleBlueLeft().restore(0.2, easeInCubic),
        runner2CircleWhiteLeft().restore(0.2, easeInCubic)
    )
    // endregion

    yield* connectorLength(boxWidth * 3, 2, easeInCubic)


    yield* waitFor(3)

    yield* beginSlide('second slide');

    yield* runner1().radius([boxRadius, boxRadius, 0, 0], 0.5, easeInCubic)
    yield* all(
        runner1Content().position.y(boxHeight * 2, 1),
        runner1Content().height(boxHeight * 3, 1)
    )

    yield* runner2().radius([boxRadius, boxRadius, 0, 0], 0.5, easeInCubic)

    yield* all(
        runner2Content().position.y(boxHeight * 2, 1),
        runner2Content().height(boxHeight * 3, 1)
    )

    yield* waitFor(10)
});
