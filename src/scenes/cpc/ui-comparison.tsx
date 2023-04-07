import {makeScene2D} from "@motion-canvas/2d";
import {slideTransition} from "@motion-canvas/core/lib/transitions";
import {Direction} from "@motion-canvas/core/lib/types";
import {all, chain, sequence, waitFor} from "@motion-canvas/core/lib/flow";
import {Img, Knot, Node, Rect, Spline, Txt} from "@motion-canvas/2d/lib/components";
import {beginSlide, createRef} from "@motion-canvas/core/lib/utils";
import oldUI from "../../../images/cpc/old-gui.png"
import newUI from "../../../images/cpc/overview_ui.png"
import {createSignal} from "@motion-canvas/core/lib/signals";

export default makeScene2D(function* (view) {

    const bg = "white"
    const enomicsColor = "rgb(0, 187, 255)"
    view.fill(bg)

    const titleTxt = createRef<Txt>()
    const oldUIImage = createRef<Img>()
    const newUIImage = createRef<Img>()

    view.add(
        <Rect fill={"black"} width={() => view.width()} height={() => view.height()}>

            <Rect fill={"white"} radius={70} smoothCorners
                  width={() => view.width()} height={() => view.height()}>
            </Rect>
        </Rect>
    )

    view.add(
        <>
            <Txt fontFamily={"Open Sans"} fontSize={120} ref={titleTxt} text={"UI Comparison"}></Txt>
            <Img ref={oldUIImage} scale={1} y={()=> view.height() * 2} shadowBlur={50} shadowColor={"black"} radius={30} clip src={oldUI}/>
            <Img zIndex={20} ref={newUIImage} scale={1} y={()=> view.height()} shadowColor={enomicsColor} radius={30} clip src={newUI}/>
        </>
    )


    yield* slideTransition(Direction.Bottom)


    yield* beginSlide("Start")


    yield* all(
        oldUIImage().position.y(0,1),
        oldUIImage().position.x(-300,1)
    )

    yield* beginSlide("New UI")

    yield* sequence(
        0.3,
        newUIImage().position.y(0,3),
        oldUIImage().position.x(0,2),
        newUIImage().scale(1.2,3),
        newUIImage().shadowBlur(100,2).to(30,1).to(100,1).to(30,1).to(100,1)
    )

    yield* beginSlide("End UI")
})