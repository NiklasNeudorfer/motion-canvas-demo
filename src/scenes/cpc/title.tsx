import {makeScene2D} from "@motion-canvas/2d";
import {beginSlide, createRef} from "@motion-canvas/core/lib/utils";
import {all, chain, sequence} from "@motion-canvas/core/lib/flow";
import {Rect, Txt} from "@motion-canvas/2d/lib/components";
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


    const firstLetter = createRef<Txt>()
    const secondLetter = createRef<Txt>()
    const thirdLetter = createRef<Txt>()

    const firstText = createRef<Txt>()
    const secondText = createRef<Txt>()
    const thirdText = createRef<Txt>()

    view.add(
        <>
            <Txt ref={firstLetter} text={"C"} x={-200} fontSize={320} fontFamily={"Open Sans"}/>
            <Txt ref={secondLetter} text={"P"} fontSize={320} fontFamily={"Open Sans"}/>
            <Txt ref={thirdLetter} text={"C"} x={200} fontSize={320} fontFamily={"Open Sans"}/>

            <Txt ref={firstText} y={-250} x={-200} fontSize={120} fontFamily={"Open Sans"}/>
            <Txt ref={secondText} fontSize={120} fontFamily={"Open Sans"}/>
            <Txt ref={thirdText} y={250} x={200} fontSize={120} fontFamily={"Open Sans"}/>
        </>
    )


    yield* chain(
        all(
            firstLetter().scale(0, 0),
            secondLetter().scale(0, 0),
            thirdLetter().scale(0, 0),
        ),
        sequence(
            0.3,
            spring(SmoothSpring, 0, 100, value => {
                firstLetter().scale(value / 100);
            }),
            spring(SmoothSpring, 0, 100, value => {
                secondLetter().scale(value / 100);
            }),
            spring(SmoothSpring, 0, 100, value => {
                thirdLetter().scale(value / 100);
            }),
        )
    )

    yield* beginSlide("Explain letters")
    yield* sequence(
        0.3,
        all(
            firstLetter().position.y(-250, 1),
            secondLetter().position.y(0, 0),
            thirdLetter().position.y(250, 1),

            firstLetter().position.x(-800, 1),
            secondLetter().position.x(-200, 1),
            thirdLetter().position.x(200, 1),
        ),
        all(
            firstText().position.x(-450, 1),
            secondText().position.x(30, 1),
            thirdText().position.x(580, 1),
            firstLetter().fill(enomicsColor, 1),
            secondLetter().fill(enomicsColor, 1),
            thirdLetter().fill(enomicsColor, 1),
        ),
        sequence(
            0.1,
            firstText().text("harging", 1),
            secondText().text("oint", 1),
            thirdText().text("ontroller", 1),
        )
    )


    yield* beginSlide("End Title ")

    yield* all(
        bgRef().radius([bgRadius, bgRadius, 0, 0], 1)
    )

});