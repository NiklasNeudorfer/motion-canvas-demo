import {makeScene2D} from "@motion-canvas/2d";
import {CodeBlock, insert, lines} from "@motion-canvas/2d/lib/components/CodeBlock";
import {beginSlide, createRef} from "@motion-canvas/core/lib/utils";
import {slideTransition} from "@motion-canvas/core/lib/transitions";
import {Direction} from "@motion-canvas/core/lib/types";
import {all, chain, waitFor} from "@motion-canvas/core/lib/flow";
import {Img, Rect, Txt, Node} from "@motion-canvas/2d/lib/components";
import enomicsFont from "../../../images/cpc/EnomicsFont.jpg"

export default makeScene2D(function* (view) {

    const bg = "white"
    const enomicsColor = "rgb(0, 187, 255)"
    const logoLength = 500;

    view.fill(bg)

    const enomics = createRef<Node>()

    view.add(
        <Rect fill={"black"} width={() => view.width() * 2} height={() => view.height() * 2}>

            <Rect fill={"white"} radius={70} smoothCorners
                  width={() => view.width()} height={() => view.height()}>
            </Rect>
        </Rect>
    )

    view.add(
        <Node ref={enomics} scale={0.5} x={125 - 230}>
            <Img src={enomicsFont} scale={10.2} opacity={0}/>

            <Txt x={-420} fill={enomicsColor} y={30} fontSize={390} fontFamily={"Open Sans"} text={"EN"}></Txt>
            <Txt x={630} fill={enomicsColor} y={30} fontSize={390} fontFamily={"Open Sans"} text={"MICS"}></Txt>


            <Rect zIndex={-100} height={logoLength} width={logoLength}
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


    yield* waitFor(1)
})