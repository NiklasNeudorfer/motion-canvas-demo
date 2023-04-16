import {makeScene2D} from "@motion-canvas/2d";
import {beginSlide, createRef} from "@motion-canvas/core/lib/utils";
import {CodeBlock, insert, lines} from "@motion-canvas/2d/lib/components/CodeBlock";
import {slideTransition} from "@motion-canvas/core/lib/transitions";
import {Direction} from "@motion-canvas/core/lib/types";
import {all, chain} from "@motion-canvas/core/lib/flow";
import {Rect} from "@motion-canvas/2d/lib/components";

export default makeScene2D(function* (view) {

    view.fill("black");

    const dtdTitle = createRef<CodeBlock>()

    view.add(
        <>
            <CodeBlock width={() => view.width()} x={() => view.width() / 2 - 500} height={100} ref={dtdTitle}
                       fontSize={240} code={`XML DTD`}></CodeBlock>
        </>
    )


    yield* slideTransition(Direction.Bottom, 3)


    yield* beginSlide("title transition")

    yield* chain(
        all(
            dtdTitle().position.x(0, 1),
            dtdTitle().fontSize(124, 1),
            dtdTitle().edit(1)`XML D${insert('ocument ')}TD`
        ),
        dtdTitle().edit(1)`XML Document ${insert('Type ')}D`,
        dtdTitle().edit(1)`XML Document Type D${insert('efinition')}`,
        dtdTitle().selection(lines(0, Infinity), 1)
    )

    yield* beginSlide("show DTD ")

    const dtd = createRef<CodeBlock>()

    view.add(
        <Rect ref={dtd} shadowColor={"white"} shadowBlur={100} y={() => view.height()} scale={0.7}
              height={() => view.height() * 0.8} width={() => view.width() * 0.7} fill={"white"} radius={40}>

            <CodeBlock fontSize={70} language={"xml"} code={
                `
                <!DOCTYPE note
                [
                <!ELEMENT note (to,body)>
                <!ELEMENT to (#PCDATA)>
                <!ELEMENT body (#PCDATA)>
                ]>
                `
            }/>

        </Rect>
    )

    yield* all(
        dtd().position.y(0, 1),
        dtd().scale(1, 1),
        dtdTitle().scale(0, 2)
    )

    yield* beginSlide("show XML")

    const dtdXML = createRef<CodeBlock>()

    view.add(
        <Rect ref={dtdXML} shadowColor={"white"} shadowBlur={40} y={() => view.height()} scale={0.7}
              height={() => view.height() * 0.4} width={() => view.width() * 0.9} fill={"white"} radius={40}>

            <CodeBlock fontSize={50} language={"xml"} code={
                `
                <note>
                    <to>m.haslinger@htl-leonding.ac.at</to>
                    <body>Bitte eine gute Note aufs Referat, Danke :^)</body>
                </note>
                `
            }/>

        </Rect>
    )

    yield* all(
        dtd().shadowBlur(10, 1),
        dtd().scale(0.65, 1),
        dtd().position.y(view.height() / -2 + 310, 1),
        dtd().position.x(view.width() / -2 + 450, 1),
        dtdXML().position.y(view.height() / 2 - 250, 1),
        dtdXML().scale(1, 1),
        //dtdXML().scale(0,2)
    )


    yield* beginSlide("dtd end")
})
