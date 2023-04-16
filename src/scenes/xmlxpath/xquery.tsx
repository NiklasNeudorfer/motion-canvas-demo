import {makeScene2D} from "@motion-canvas/2d";
import {beginSlide, createRef} from "@motion-canvas/core/lib/utils";
import {Node, Rect, Txt} from "@motion-canvas/2d/lib/components";
import {all, chain, waitFor} from "@motion-canvas/core/lib/flow";
import {slideTransition} from "@motion-canvas/core/lib/transitions";
import {Direction} from "@motion-canvas/core/lib/types";
import {CodeBlock, lines} from "@motion-canvas/2d/lib/components/CodeBlock";

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
    yield* beginSlide("tease FLWR")

    const flwrRect = createRef<Rect>()

    view.add(
        <Rect ref={flwrRect} fill={"black"} radius={40}
              width={1000}
              x={() => view.width()}
              height={() => view.height()}>

            <CodeBlock y={120} x={0} fontSize={150} language={"yml"} code={
                `
                    For 
                    Let 
                    Where
                    Order 
                    Return
                `}/>
        </Rect>
    )

    yield* all(
        flwrRect().position.x(view.width() / 2, 2)
    )
    yield* beginSlide("Explain FLWR")

    yield* all(
        flwrRect().radius([40, 0, 0, 40], 1),
        flwrRect().position.x(view.width() / 2 - 500, 2)
    )


    yield* beginSlide("Begin")

    yield* all(
        flwrRect().position.x(view.width(), 2)
    )


    const codeBlock = createRef<CodeBlock>()
    const codeContainer = createRef<Rect>()
    const headerTitle = createRef<Txt>()

    view.add(
        <Txt fill={"black"} zIndex={100}
             ref={headerTitle}
             fontSize={70}
             fontFamily={"Fira Code"}
             text={""}
             x={() => view.width() / -2 + 1150 / 2 + 30}
             y={() => -view.height() / 2 + 100}/>
    )

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

    yield* beginSlide("Begin XQuery")

    yield* all(
        headerTitle().fontSize(39, 2),
        headerTitle().position.x(0, 2),
        headerTitle().text("Alle Buchtitel von Büchern mit der ID 2 oder nach dem Jahr 2015 erschienen sind", 2),
    )

    yield* beginSlide("Sol 1")

    const solutionRect = createRef<Rect>()
    const solutionText1 = createRef<CodeBlock>()


    view.add(
        <Node y={() => 70}>
            <Rect ref={solutionRect} height={400} width={900} fill={"black"} shadowBlur={20}
                  shadowColor={"black"} x={view.width()}
                  radius={40}>
                <Rect height={() => solutionRect().height()} width={() => solutionRect().width()} fill={"black"}
                      shadowBlur={20}
                      shadowColor={"white"}
                      radius={40}>
                    <CodeBlock ref={solutionText1} fill={"white"} fontFamily={"Fira Code"} fontSize={40}
                               language={"xquery"}
                               code={
                                   `
                        for $b in //book
                        where $b/@id = 2 or $b/year > 2015
                        return $b/title
                        `
                               }/>
                </Rect>
            </Rect>
        </Node>
    )

    yield* all(
        codeBlock().selection([
            [[8, 0], [8, 100]],
            [[14, 0], [14, 100]],
        ], 2),
        solutionRect().position.x(500, 2),
    )
    yield* beginSlide("Second")
    yield* all(
        codeBlock().selection(lines(0, Infinity), 2),
        solutionRect().position.x(view.width(), 2),
        headerTitle().text("Preis & Titel von einem Buch mit einem Author dessen 2. Teil des Namen 'Knuth' ist", 2),
        headerTitle().position.x(0, 2),
        headerTitle().fontSize(38, 2)
    )

    yield* beginSlide("Sol 2")

    yield* chain(
        all(
            solutionText1().position.x(-100, 1),
            solutionText1().code(
                `
                for $b in //book
                where fn:tokenize($b/[author])[2] = ’Knuth’
                return ($b/price, $b/year)
        `, 1),
            solutionRect().width(1100, 1),
        ),
        all(
            solutionRect().position.x(400, 2),
            codeBlock().selection([
                [[4, 0], [4, 100]],
                [[5, 0], [5, 100]],
            ], 2),
        )
    )


    yield* beginSlide("End")

});
