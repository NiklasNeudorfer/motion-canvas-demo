import {makeScene2D} from "@motion-canvas/2d";
import {beginSlide, createRef, range, useRandom, useScene} from "@motion-canvas/core/lib/utils";
import {all, chain, waitFor} from "@motion-canvas/core/lib/flow";
import {Icon, Img, Line, Node, Rect, Txt} from "@motion-canvas/2d/lib/components";
import {createSignal} from "@motion-canvas/core/lib/signals";
import box_1 from "../../../images/cpc/Box_1.png"
import box_2 from "../../../images/cpc/Box_2.png"
import box_3 from "../../../images/cpc/Box_3.png"
import box_4 from "../../../images/cpc/Box_4.png"
import {fadeTransition, useTransition} from "@motion-canvas/core/lib/transitions";
import {ThreadGenerator} from "@motion-canvas/core/lib/threading";
import {Vector2} from "@motion-canvas/core/lib/types";
import enomicsFont from "../../../images/cpc/EnomicsFont.jpg";
import raspLogo from "../../../images/cpc/rasp-pi-logo.png";
import redBox from "../../../images/cpc/Box_4.png";
import parkingSrc from "../../../images/cpc/parking.png";

export default makeScene2D(function* (view) {

    view.add(
        <Rect fill={"black"} width={() => view.width()} height={() => view.height()}>

            <Rect fill={"white"} radius={70} smoothCorners
                  width={() => view.width()} height={() => view.height()}>
            </Rect>
        </Rect>
    )


    const bgRadius = 70;
    const bg = "white"
    view.fill(bg)

    const lineColor = "#363636"
    const enomicsColor = "rgb(0, 187, 255)"
    const logoLength = 500;

    const oldScreen = createRef<Node>()


    view.add(
        <Node ref={oldScreen}>
            <Node scale={0.12} x={-825} y={10}>
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

            <Node x={-200} scale={1.2} y={-200}>
                <Line lineWidth={10} lineDash={[20, 20]}
                      endArrow stroke={lineColor} points={
                    [{x: 300, y: 200}, {x: 300, y: 0}, {x: 500, y: 0}]}>
                </Line>
                <Line lineWidth={10} lineDash={[20, 20]}
                      endArrow stroke={lineColor} points={
                    [{x: -400, y: 200}, {x: 500, y: 200}]}>
                </Line>
                <Line lineWidth={10} lineDash={[20, 20]}
                      endArrow stroke={lineColor} points={
                    [{x: 300, y: 200}, {x: 300, y: 400}, {x: 500, y: 400}]}>
                </Line>

                <Node y={190} x={-500}>
                    <Icon icon={"ph:monitor"} color={"black"} height={280} width={280}/>
                </Node>


                <Img src={raspLogo} scale={0.15} y={170} x={0}/>

                <Node>
                    <Img src={redBox} scale={0.5} x={600}/>
                    <Img src={redBox} scale={0.5} x={600} y={400}/>
                    <Img src={redBox} scale={0.5} x={600} y={200}/>
                </Node>
            </Node>

            <Node x={200}>
                <Node y={-100} x={-50} scale={1.2}>
                    <Line
                        shadowColor={"lightgrey"} shadowBlur={5}
                        lineWidth={12}
                        stroke={"lightgrey"}
                        points={[
                            [450, 200],
                            [450, 100]
                        ]}/>

                    <Img shadowColor={"blue"} shadowBlur={8} src={parkingSrc} x={450} y={70} height={100} width={100}/>
                </Node>

                <Icon scale={1.2} icon={"fluent:vehicle-car-profile-rtl-20-regular"} color={lineColor}
                      y={80} x={650} height={200} width={200}/>
            </Node>
        </Node>
    )

    const transitionRect = createRef<Rect>()

    view.add(
        <Rect ref={transitionRect} width={() => view.width()} fill={"white"} height={600}
              radius={40}
              y={() => -view.height()}></Rect>
    )


    // ------------------------------------------------------------------------------------------------
    //              FALLING BOX TRANSITION
    // ------------------------------------------------------------------------------------------------

    const globalRandom = useRandom(123);

    const count = createSignal(70);
    const fallingProgress = createSignal(-view.height());
    const boxes = range(count()).map(i => {
            let box_color = globalRandom.nextInt(0, 4);


            let randomAtI = useRandom(i * 2);

            let rotationDirection = randomAtI.nextInt(1, 10) % 2 == 0 ? -1 : 1;


            let speed = randomAtI.nextFloat(1, 2.5);
            if (i > count() / 2) {
                speed = randomAtI.nextFloat(4, 5)
            }

            return (
                <Img
                    zIndex={10}
                    shadowColor={box_color === 1 ? "#6879EA" :
                        box_color === 2 ? "red" :
                            box_color === 3 ? "yellow" : "limegreen"}
                    shadowBlur={60}
                    src={box_color === 1 ? box_1 :
                        box_color === 2 ? box_2 :
                            box_color === 3 ? box_3 : box_4}
                    x={globalRandom.nextInt(-view.width() / 2, view.width() / 2)}
                    y={() => fallingProgress() * speed / 100}
                    rotation={() =>
                        (((fallingProgress() * speed / 100) / (view.height() * 2) * 100) * 0.36) * rotationDirection
                    }/>
            )
        }
    );

    view.add(
        <>
            <Rect zIndex={10} height={() => view.height()} y={-view.height()} width={() => view.width()}>
                <Node spawner={() => boxes.slice(0, count() / 2)}/>
            </Rect>
            <Rect zIndex={10} height={() => view.height()} y={-view.height() * 2} width={() => view.width()}>
                <Node spawner={() => boxes.slice(count() / 2, count() * 0.75)}/>
            </Rect>
        </>
    );

    const nextSlideTitleText = createRef<Txt>()

    view.add(
        <Txt zIndex={1} fontFamily={"Open Sans"} fontSize={120} ref={nextSlideTitleText} opacity={0}
             text={"UI Comparison"}></Txt>
    )


    yield* all(
        chain(
            waitFor(2),
            nextSlideTitleText().opacity(1, 0)
        ),
        chain(
            waitFor(2),
            oldScreen().opacity(0, 0)
        ),
        chain(
            waitFor(1),
            transitionRect().position.y(view.height, 2)
        ),
        fallingProgress((view.height() * 2) * 100, 5)
    )
});