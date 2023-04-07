import {makeScene2D} from "@motion-canvas/2d";
import {beginSlide, createRef} from "@motion-canvas/core/lib/utils";
import {slideTransition} from "@motion-canvas/core/lib/transitions";
import {Direction} from "@motion-canvas/core/lib/types";
import {all, chain, sequence, waitFor} from "@motion-canvas/core/lib/flow";
import {Icon, Img, Line, Node, Rect, Txt} from "@motion-canvas/2d/lib/components";
import enomicsFont from "../../../images/cpc/EnomicsFont.jpg"
import {SmoothSpring, spring} from "@motion-canvas/core/lib/tweening";
import redBox from "../../../images/cpc/Box_2.png"
import raspLogo from "../../../images/cpc/rasp-pi-logo.png"
import newUI from "../../../images/cpc/overview_ui.png"

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

    const enomics = createRef<Node>()

    view.add(
        <Node ref={enomics} scale={0.5} x={125 - 230}>
            <Img src={enomicsFont} scale={10.2} opacity={0}/>

            <Txt x={-573} fill={enomicsColor} y={30} fontSize={390} fontFamily={"Open Sans"}
                 text={"E"}></Txt>
            <Txt x={-310} fill={enomicsColor} y={30} fontSize={390} fontFamily={"Open Sans"}
                 text={"N"}></Txt>

            <Txt x={340} fill={enomicsColor} y={30} fontSize={390} fontFamily={"Open Sans"}
                 text={"M"}></Txt>
            <Txt x={579} fill={enomicsColor} y={30} fontSize={390} fontFamily={"Open Sans"}
                 text={"I"}></Txt>
            <Txt x={760} fill={enomicsColor} y={30} fontSize={390} fontFamily={"Open Sans"}
                 text={"C"}></Txt>
            <Txt x={992} fill={enomicsColor} y={30} fontSize={390} fontFamily={"Open Sans"}
                 text={"S"}></Txt>


            <Rect zIndex={-100} height={logoLength} width={logoLength}
                  fill={enomicsColor}
                  scale={0.57}
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

                <Rect height={50} width={logoLength + 20} fill={bg}/>
                <Rect rotation={90} height={50} width={logoLength + 20} fill={bg}/>
            </Rect>
        </Node>
    )


    yield* all(
        enomics().position.x(-500, 1),
        enomics().position.y(-300, 1)
    )

    const lineColor = "#363636"

    const topLine = createRef<Line>()
    const middleLine = createRef<Line>()
    const bottomLine = createRef<Line>()

    const box1 = createRef<Img>()
    const box2 = createRef<Img>()
    const box3 = createRef<Img>()

    const desktopIcon = createRef<Icon>()
    const raspImg = createRef<Img>()

    yield view.add(
        <>
            <Line ref={topLine} lineWidth={10} lineDash={[20, 20]}
                  endArrow stroke={lineColor} end={0} points={
                [
                    {x: 300, y: 200},
                    {x: 300, y: 0},
                    {x: 500, y: 0},
                ]}>
            </Line>
            <Line ref={middleLine} lineWidth={10} lineDash={[20, 20]}
                  endArrow stroke={lineColor} end={0} points={
                [
                    {x: -400, y: 200},
                    {x: 500, y: 200},
                ]}>
            </Line>
            <Line ref={bottomLine} lineWidth={10} lineDash={[20, 20]}
                  endArrow stroke={lineColor} end={0} points={
                [
                    {x: 300, y: 200},
                    {x: 300, y: 400},
                    {x: 500, y: 400},
                ]}>
            </Line>

            <Node y={190} x={-500}>
                {/*<Txt fontFamily={"Open Sans"} y={200} text={"example Company 101"}/>*/}
                <Icon ref={desktopIcon} icon={"ph:monitor"} color={"black"} height={280} width={280}/>
            </Node>


            <Img ref={raspImg} src={raspLogo} scale={0.15} y={170} x={0}/>

            <Node>
                <Img ref={box1} src={redBox} scale={0.5} x={700}/>
                <Img ref={box2} src={redBox} scale={0.5} x={700} y={400}/>
                <Img ref={box3} src={redBox} scale={0.5} x={700} y={200}/>
            </Node>
        </>
    )

    // Animate charging-Boxes
    yield* all(
        box1().position.x(view.width() / 2 + 200, 0),
        box1().position.y(view.height() / 2, 0),

        box2().position.x(view.width() / 2 + 200, 0),
        box2().position.y(view.height() / 2, 0),

        box3().position.x(view.width() / 2 + 200, 0),
        box3().position.y(view.height() / 2, 0),

        desktopIcon().scale(0, 0),
        raspImg().scale(0, 0)
    )

    yield* all(
        desktopIcon().scale(1, 1),
        raspImg().scale(0.15, 1),
        sequence(
            0.3,
            all(
                spring(SmoothSpring, box1().position.x(), 700, value => {
                    box1().position.x(value)
                }),
                spring(SmoothSpring, box1().position.y(), 0, value => {
                    box1().position.y(value)
                }),
            ),
            all(
                spring(SmoothSpring, box2().position.x(), 700, value => {
                    box2().position.x(value)
                }),
                spring(SmoothSpring, box2().position.y(), 200, value => {
                    box2().position.y(value)
                }),
            ),
            all(
                spring(SmoothSpring, box3().position.x(), 700, value => {
                    box3().position.x(value)
                }),
                spring(SmoothSpring, box3().position.y(), 400, value => {
                    box3().position.y(value)
                }),
            ),
        ),
        sequence(
            0.5,
            middleLine().end(1, 1.8),
            all(
                bottomLine().end(1, 1),
                topLine().end(1, 1)
            )
        )
    )


    yield* beginSlide("End diagarm")
})