import {makeScene2D} from "@motion-canvas/2d";
import {beginSlide, createRef} from "@motion-canvas/core/lib/utils";
import {slideTransition} from "@motion-canvas/core/lib/transitions";
import {Direction} from "@motion-canvas/core/lib/types";
import {all, sequence, waitFor} from "@motion-canvas/core/lib/flow";
import {Img, Node, Rect, Txt} from "@motion-canvas/2d/lib/components";
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

            <Rect ref={bgRef} fill={"white"} radius={[0, 0, bgRadius, bgRadius]} smoothCorners
                  width={() => view.width()} height={() => view.height()}>
            </Rect>
        </Rect>
    )

    yield* slideTransition(Direction.Bottom, 2)


    yield* all(
        bgRef().radius(bgRadius, 1)
    )


    const enomics = createRef<Node>()
    const letterE = createRef<Txt>()
    const letterN = createRef<Txt>()
    const letterOLogo = createRef<Rect>()
    const letterM = createRef<Txt>()
    const letterI = createRef<Txt>()
    const letterC = createRef<Txt>()
    const letterS = createRef<Txt>()

    view.add(
        <Node ref={enomics} scale={0.5} x={125 - 230}>
            <Img src={enomicsFont} scale={10.2} opacity={0}/>

            {/*<Txt x={-420} fill={enomicsColor} y={30} fontSize={390} fontFamily={"Open Sans"} text={"EN"}></Txt>*/}

            <Txt x={-573} ref={letterE} fill={enomicsColor} y={30} fontSize={390} fontFamily={"Open Sans"}
                 text={"E"}></Txt>
            <Txt x={-310} ref={letterN} fill={enomicsColor} y={30} fontSize={390} fontFamily={"Open Sans"}
                 text={"N"}></Txt>


            {/*<Txt x={630} fill={enomicsColor} y={30} fontSize={390} fontFamily={"Open Sans"} text={"MICS"}></Txt>*/}

            <Txt x={340} ref={letterM} fill={enomicsColor} y={30} fontSize={390} fontFamily={"Open Sans"}
                 text={"M"}></Txt>
            <Txt x={579} ref={letterI} fill={enomicsColor} y={30} fontSize={390} fontFamily={"Open Sans"}
                 text={"I"}></Txt>
            <Txt x={760} ref={letterC} fill={enomicsColor} y={30} fontSize={390} fontFamily={"Open Sans"}
                 text={"C"}></Txt>
            <Txt x={992} ref={letterS} fill={enomicsColor} y={30} fontSize={390} fontFamily={"Open Sans"}
                 text={"S"}></Txt>


            <Rect ref={letterOLogo} zIndex={-100} height={logoLength} width={logoLength}
                  fill={enomicsColor}
                  scale={0.57}
                // opacity={1}
                // x={-410}
                  radius={130}
                  smoothCorners>

                <Rect height={logoLength} width={logoLength}
                      fill={bg}
                      scale={0.71}
                      opacity={1}
                      clip
                      radius={90}
                      smoothCorners>
                </Rect>

                <Rect height={50}
                      width={logoLength + 20}
                      fill={bg}/>

                <Rect rotation={90} height={50}
                      width={logoLength + 20}
                      fill={bg}/>
            </Rect>
        </Node>
    )

    // ANIMATE LETTERS

    // move letters below screen
    yield* all(
        letterE().position.y(view.height() * 1.2, 0),
        letterE().position.x(letterE().position.x() - 200, 0),

        letterN().position.y(view.height() * 1.2, 0),
        letterN().position.x(letterN().position.x() - 200, 0),

        letterOLogo().position.y(view.height() * 1.2, 0),
        letterOLogo().position.x(letterOLogo().position.x() - 200, 0),

        letterM().position.y(view.height() * 1.2, 0),
        letterM().position.x(letterM().position.x() - 200, 0),

        letterI().position.y(view.height() * 1.2, 0),
        letterI().position.x(letterI().position.x() - 200, 0),

        letterC().position.y(view.height() * 1.2, 0),
        letterC().position.x(letterC().position.x() - 200, 0),

        letterS().position.y(view.height() * 1.2, 0),
        letterS().position.x(letterS().position.x() - 200, 0),
    )

    yield* sequence(
        0.2,
        // LETTER - E
        all(
            spring(SmoothSpring, letterE().position.x() - 200, -573, value => {
                letterE().position.x(value);
            }),
            spring(SmoothSpring, view.height() + 200, 30, value => {
                letterE().position.y(value);
            })
        ),
        // LETTER - N
        all(
            spring(SmoothSpring, letterN().position.x() - 200, -310, value => {
                letterN().position.x(value);
            }),
            spring(SmoothSpring, view.height() + 200, 30, value => {
                letterN().position.y(value);
            })
        ),
        // LETTER - O
        all(
            spring(SmoothSpring, letterOLogo().position.x() - 200, 0, value => {
                letterOLogo().position.x(value);
            }),
            spring(SmoothSpring, view.height() + 200, 0, value => {
                letterOLogo().position.y(value);
            })
        ),
        // LETTER - M
        all(
            spring(SmoothSpring, letterM().position.x() - 200, 340, value => {
                letterM().position.x(value);
            }),
            spring(SmoothSpring, view.height() + 200, 30, value => {
                letterM().position.y(value);
            })
        ),
        // LETTER - I
        all(
            spring(SmoothSpring, letterI().position.x() - 200, 579, value => {
                letterI().position.x(value);
            }),
            spring(SmoothSpring, view.height() + 200, 30, value => {
                letterI().position.y(value);
            })
        ),
        // LETTER - C
        all(
            spring(SmoothSpring, letterC().position.x() - 200, 760, value => {
                letterC().position.x(value);
            }),
            spring(SmoothSpring, view.height() + 200, 30, value => {
                letterC().position.y(value);
            })
        ),
        // LETTER - S
        all(
            spring(SmoothSpring, letterS().position.x() - 200, 992, value => {
                letterS().position.x(value);
            }),
            spring(SmoothSpring, view.height() + 200, 30, value => {
                letterS().position.y(value);
            })
        ),
    )


    yield* beginSlide("End Logo")


    yield* waitFor(1)
})