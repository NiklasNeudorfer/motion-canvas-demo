import {makeScene2D} from "@motion-canvas/2d";
import {CodeBlock, insert, lines} from "@motion-canvas/2d/lib/components/CodeBlock";
import {beginSlide, createRef} from "@motion-canvas/core/lib/utils";
import {slideTransition} from "@motion-canvas/core/lib/transitions";
import {Direction} from "@motion-canvas/core/lib/types";
import {all, chain, waitFor} from "@motion-canvas/core/lib/flow";
import {Img, Rect, Txt} from "@motion-canvas/2d/lib/components";
import enomicsFont from "../../../images/cpc/EnomicsFont.jpg"

export default makeScene2D(function* (view) {

    view.fill("white")

    view.add(
        <Txt fontFamily={"Fira Code"} text={"Charging Point Controller"}/>
    )

    const logoLength = 500;

    view.add(
        <>
            <Img src={enomicsFont} scale={10} opacity={0}/>

            <Rect height={logoLength} width={logoLength}
                  fill={"cyan"}
                  opacity={1}
                  radius={130}
                  smoothCorners
                  x={-405}>

                <Rect height={logoLength} width={logoLength}
                      fill={"white"}
                      scale={0.71}
                      opacity={1}
                      radius={130}
                      smoothCorners>
                </Rect>

                <Rect height={50}
                      width={logoLength}
                      fill={"white"}/>

                <Rect rotation={90} height={50}
                      width={logoLength}
                      fill={"white"}/>
            </Rect>
        </>
    )


    yield* waitFor(1)
})