import {makeScene2D} from "@motion-canvas/2d";
import {beginSlide, createRef} from "@motion-canvas/core/lib/utils";
import {slideTransition} from "@motion-canvas/core/lib/transitions";
import {Direction} from "@motion-canvas/core/lib/types";
import {all, chain, sequence, waitFor} from "@motion-canvas/core/lib/flow";
import {Icon, Img, Line, Node, Rect, Txt} from "@motion-canvas/2d/lib/components";
import enomicsFont from "../../../images/cpc/EnomicsFont.jpg"
import {easeInCubic, easeInOutCubic, SmoothSpring, spring} from "@motion-canvas/core/lib/tweening";
import redBox from "../../../images/cpc/Box_4.png"
import parkingSrc from "../../../images/cpc/parking.png"
import raspLogo from "../../../images/cpc/rasp-pi-logo.png"
import whitelist from "../../../images/cpc/user-whitelist.png"
import {Brace, SurroundingRectangle} from "@ksassnowski/motion-canvas-components";


import angularLogo from "../../../images/cpc/angular.png"
import material from "../../../images/cpc/angular-material-logo.jpg"
import bootstrapLogo from "../../../images/cpc/bootstrap-logo.png"

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

    const diagram = createRef<Node>()

    yield view.add(
        <Node ref={diagram}>
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
        </Node>
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
                spring(SmoothSpring, box1().position.x(), 600, value => {
                    box1().position.x(value)
                }),
                spring(SmoothSpring, box1().position.y(), 0, value => {
                    box1().position.y(value)
                }),
            ),
            all(
                spring(SmoothSpring, box2().position.x(), 600, value => {
                    box2().position.x(value)
                }),
                spring(SmoothSpring, box2().position.y(), 200, value => {
                    box2().position.y(value)
                }),
            ),
            all(
                spring(SmoothSpring, box3().position.x(), 600, value => {
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

    yield* beginSlide("Enhance Diagram")

    const parkingCar = createRef<Icon>()
    const parkingSign = createRef<Node>()

    view.add(
        <Node x={200}>
            <Node ref={parkingSign} y={-view.height()}>
                <Line
                    shadowColor={"lightgrey"} shadowBlur={5}
                    lineWidth={12}
                    stroke={"lightgrey"}
                    points={[
                        [450, 200],
                        [450, 100]
                    ]}
                />

                <Img shadowColor={"blue"} shadowBlur={8} src={parkingSrc} x={450} y={70} height={100} width={100}/>
            </Node>

            <Icon ref={parkingCar} icon={"fluent:vehicle-car-profile-rtl-20-regular"} color={lineColor}
                  y={200} x={() => view.height()} height={200} width={200}/>
        </Node>
    )


    yield* sequence(0.3,
        all(
            diagram().position.x(-100, 1),
            diagram().position.y(-200, 1),
            diagram().scale(1, 1),
        ),
        all(
            enomics().scale(0.1, 1),
            enomics().position.x(-620, 1),
            enomics().position.y(-20, 1),
        ),
        all(
            parkingSign().scale(1, 0),
            parkingCar().scale(1, 0),

            parkingSign().position.y(-120, 1),
            parkingSign().position.x(0, 1),
        ),
        all(
            parkingCar().position.x(550, 1, easeInOutCubic),
            parkingCar().position.y(40, 1, easeInOutCubic),
        ),
    )


    //-----------------------------------------------------------------------------------------------------------------
    //-----------------------------------------------------------------------------------------------------------------
    yield* beginSlide("Technologies")
    const implementationLine = createRef<Line>()
    const bootstrapRef = createRef<Img>()
    const materialRef = createRef<Img>()
    const angularRef = createRef<Img>()

    view.add(
        <>
            <Line
                ref={implementationLine}
                shadowColor={"lightgrey"} shadowBlur={5}
                lineDash={[20, 20]} endArrow
                lineWidth={12} end={0}
                stroke={lineColor}
                points={[
                    [-100, 60],
                    [-100, 250]
                ]}
            />

            <Img ref={angularRef} src={angularLogo} scale={0} y={() => view.height()} x={-100}/>
            <Img ref={materialRef} src={material} scale={0} y={() => view.height()} x={420}/>
            <Img ref={bootstrapRef} src={bootstrapLogo} scale={0} y={() => view.height()} x={-320}/>
        </>
    )
    yield* sequence(
        0.3,
        implementationLine().end(1, 3),
        all(
            angularRef().position.y(400, 2),
            angularRef().scale(0.065, 2),
        ),
        all(
            materialRef().position.y(400, 2),
            materialRef().scale(0.8, 2),
        ),
        all(
            bootstrapRef().position.y(400, 2),
            bootstrapRef().scale(0.25, 2),
        )
    )

    //-----------------------------------------------------------------------------------------------------------------
    //-----------------------------------------------------------------------------------------------------------------
    yield* beginSlide("Add Sepp GmbH")
    const containerBox = createRef<SurroundingRectangle>()
    const functionCube = createRef<Rect>()
    const seppTitle = createRef<Txt>()

    view.add(
        <>
            <SurroundingRectangle lineWidth={10} stroke={enomicsColor} radius={40}
                                  bufferY={120}
                                  ref={containerBox} nodes={box1()} opacity={0}></SurroundingRectangle>

            <Rect ref={functionCube} height={100} opacity={0} width={100} fill={"red"}
                  x={() => view.height() / -2 - 130}/>

            <Txt ref={seppTitle} y={() => view.height() / -2 + 150} fontSize={100}
                 x={() => view.width() / -2 + 650} fill={enomicsColor}
                 fontWeight={20000} fontFamily={"Roboto"}/>
        </>
    )

    yield* sequence(
        0.3,
        implementationLine().end(0, 3),
        all(
            angularRef().position.y(() => view.height(), 2),
            angularRef().scale(0.065, 2),
        ),
        all(
            materialRef().position.y(() => view.height(), 2),
            materialRef().scale(0.8, 2),
        ),
        all(
            bootstrapRef().position.y(() => view.height(), 2),
            bootstrapRef().scale(0.25, 2),
        )
    )

    yield* sequence(0.3,
        containerBox().opacity(1, 2),
        containerBox().nodes([box1(), box3(), parkingCar(), functionCube()], 1),
        seppTitle().text("Sepp-Huber GmbH", 2)
    )


    //-----------------------------------------------------------------------------------------------------------------
    //-----------------------------------------------------------------------------------------------------------------
    yield* beginSlide("Whitelist")
    const whitelistRef = createRef<Img>()

    view.add(
        <Img ref={whitelistRef} zIndex={30} scale={0.5} y={() => view.height()} shadowBlur={50}
             shadowColor={enomicsColor} radius={30}
             clip src={whitelist}/>
    )
    yield* sequence(
        0.3,
        whitelistRef().position.y(100, 2.5),
        whitelistRef().position.x(-200, 2.5),
        whitelistRef().scale(0.9, 2.5)
    )


    yield* beginSlide("End diagarm")
})
