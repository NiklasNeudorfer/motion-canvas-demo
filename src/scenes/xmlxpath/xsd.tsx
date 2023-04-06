import {makeScene2D} from "@motion-canvas/2d";
import {CodeBlock, insert, lines} from "@motion-canvas/2d/lib/components/CodeBlock";
import {beginSlide, createRef} from "@motion-canvas/core/lib/utils";
import {slideTransition} from "@motion-canvas/core/lib/transitions";
import {Direction} from "@motion-canvas/core/lib/types";
import {all, chain} from "@motion-canvas/core/lib/flow";

export default makeScene2D(function* (view) {

    view.fill("black");

    const xsdTitle = createRef<CodeBlock>()

    view.add(
        <>
            <CodeBlock width={() => view.width()} x={() => view.width() / 2 - 200} height={100} ref={xsdTitle}
                       fontSize={240} code={`XSD`}></CodeBlock>
        </>
    )


    yield* slideTransition(Direction.Bottom, 3)


    yield* beginSlide("title transition")

    yield* chain(
        all(
            xsdTitle().position.x(0, 1),
            xsdTitle().fontSize(167, 1),
            xsdTitle().edit(1)`X${insert('ML ')}SD`
        ),
        xsdTitle().edit(1)`XML S${insert('chema ')}D`,
        xsdTitle().edit(1)`XML Schema D${insert('efinition')}`,
        xsdTitle().selection(lines(0, Infinity), 1)
    )


    yield* beginSlide("xsd end")
})