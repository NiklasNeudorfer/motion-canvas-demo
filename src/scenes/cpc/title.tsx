import {makeScene2D} from "@motion-canvas/2d";
import {beginSlide, createRef} from "@motion-canvas/core/lib/utils";
import {all, chain, sequence} from "@motion-canvas/core/lib/flow";
import {Rect, Txt} from "@motion-canvas/2d/lib/components";
import {SmoothSpring, spring} from "@motion-canvas/core/lib/tweening";
import {createSignal} from "@motion-canvas/core/lib/signals";

export default makeScene2D(function* (view) {

    const bgRadius = 70;
    const bg = "white"
    view.fill(bg)
    const enomicsColor = "rgb(0, 187, 255)"
    const logoLength = 500;

    const bgRef = createRef<Rect>()

    view.add(
        <Rect fill={"black"} width={() => view.width()} height={() => view.height()}>

            <Rect ref={bgRef} fill={bg} radius={bgRadius} smoothCorners
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

    const borderLength = createSignal(0)

    view.add(
        <>
            {/*<Txt fill={"orange"} text={"CPC"}*/}
            {/*     fontSize={700} fontFamily={"Open Sans"}/>*/}

            <Txt fill={"white"} shadowBlur={120} shadowColor={enomicsColor} ref={firstLetter} text={"C"} x={-435}
                 fontSize={700} fontFamily={"Open Sans"}/>
            <Txt fill={"white"} shadowBlur={120} shadowColor={enomicsColor} ref={secondLetter} text={"P"} fontSize={700}
                 fontFamily={"Open Sans"}/>
            <Txt fill={"white"} shadowBlur={120} shadowColor={enomicsColor} ref={thirdLetter} text={"C"} x={435}
                 fontSize={700} fontFamily={"Open Sans"}/>

            <Txt ref={firstText} y={-250} x={-200} fontSize={120} fontFamily={"Open Sans"}/>
            <Txt ref={secondText} fontSize={120} fontFamily={"Open Sans"}/>
            <Txt ref={thirdText} y={250} x={200} fontSize={120} fontFamily={"Open Sans"}/>


            <Rect shadowColor={"black"} shadowBlur={50} height={view.height()} width={() => borderLength()}
                  fill={"black"} rotation={30} y={-view.height()}/>
            <Rect shadowColor={"black"} shadowBlur={50} height={view.height()} width={() => borderLength()}
                  fill={"black"} rotation={30} y={view.height()}/>

            <Txt fill={"white"} fontFamily={"Open Sans"} text={"Presented by Neudorfer Niklas"} x={view.width() / -2 + 380}
                 y={view.height() / 2 - 60}/>
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
            firstLetter().fontSize(320, 1),
            secondLetter().fontSize(320, 1),
            thirdLetter().fontSize(320, 1),

            firstLetter().position.x(-800, 1),
            secondLetter().position.x(-200, 1),
            thirdLetter().position.x(200, 1),
        ),
        all(
            firstText().position.x(-450, 1),
            secondText().position.x(30, 1),
            thirdText().position.x(580, 1),
        ),
        all(
            firstLetter().fill(enomicsColor, 1),
            secondLetter().fill(enomicsColor, 1),
            thirdLetter().fill(enomicsColor, 1),

            firstLetter().shadowBlur(10, 1),
            secondLetter().shadowBlur(10, 1),
            thirdLetter().shadowBlur(10, 1),

            borderLength(view.width() * 2, 2)
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