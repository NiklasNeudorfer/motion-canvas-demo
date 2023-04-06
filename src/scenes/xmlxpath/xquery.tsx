import {makeScene2D} from "@motion-canvas/2d";
import {beginSlide, createRef} from "@motion-canvas/core/lib/utils";
import {Rect, Txt} from "@motion-canvas/2d/lib/components";
import {all} from "@motion-canvas/core/lib/flow";
import {slideTransition} from "@motion-canvas/core/lib/transitions";
import {Direction} from "@motion-canvas/core/lib/types";
import {CodeBlock} from "@motion-canvas/2d/lib/components/CodeBlock";

export default makeScene2D(function* (view) {

    view.fill("black");

    view.add(
        <Rect fill={"white"} radius={40} smoothCorners width={() => view.width()} height={() => view.height()}>
            <Txt fontSize={70} fill={"black"} fontFamily={'Fira Code'} text={"XQuery"}/>
            <Txt text={"XQuery"}
                 fontSize={40}
                 fontFamily={"Fira Code"}
                 x={() => view.width() / 2 - 100}
                 y={() => view.height() / 2 - 20}/>
        </Rect>
    )


    yield* slideTransition(Direction.Bottom, 1)


    const codeBlock = createRef<CodeBlock>()
    const codeContainer = createRef<Rect>()

    view.add(
        <Rect ref={codeContainer} fill={"black"} shadowColor={"black"} shadowBlur={20} height={900} width={1150}
              radius={40}
              x={() => view.width() / -2 + 1150 / 2 + 30}
              y={() => view.height() / 2 - 900 / 2 - 30}>
            <CodeBlock
                ref={codeBlock}
                fontSize={35}
                y={25}
                code={`
            <books>
                <book id="1" category="cs">
                    <title>The Art of Computer Programming</title>
                    <author>D. Knuth</author>
                    <price>40</price>
                    <year>1968</year>
                </book>
                <book id="2" category="science">
                    <title>What If</title>
                    <author>R. Munroe</author>
                    <price>9</price>
                    <year>2014</year>
                </book>
                <book id="3" category="science">
                    <title>We have no idea</title>
                    <author>J. Cham</author>
                    <price>12</price>
                    <year>2017</year>
                </book>
            </books>
            `
                }
            />
        </Rect>
    )

    codeContainer().save()


    yield* all(
        codeContainer().position.x(-view.width(), 0)
    )

    yield* all(
        codeContainer().restore(2)
    )

    yield* beginSlide("End")

});