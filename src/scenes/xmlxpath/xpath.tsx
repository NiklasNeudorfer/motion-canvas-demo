import {makeScene2D} from "@motion-canvas/2d";
import {beginSlide, createRef} from "@motion-canvas/core/lib/utils";
import {CodeBlock, lines} from "@motion-canvas/2d/lib/components/CodeBlock";
import {Node, Rect, Txt} from "@motion-canvas/2d/lib/components";
import {all, chain} from "@motion-canvas/core/lib/flow";
import {slideTransition} from "@motion-canvas/core/lib/transitions";
import {Direction} from "@motion-canvas/core/lib/types";

export default makeScene2D(function* (view) {

    view.fill("black");


    const headerTitle = createRef<Txt>()
    const headerTitleTwo = createRef<Txt>()

    view.add(
        <Rect fill={"white"} radius={40} smoothCorners width={() => view.width()} height={() => view.height()}>
            <Txt fill={"black"} zIndex={100}
                 ref={headerTitle}
                 fontSize={70}
                 fontFamily={"Fira Code"}
                 text={""}
                 x={() => view.width() / -2 + 1150 / 2 + 30}
                 y={() => -view.height() / 2 + 100}/>
            <Txt fill={"black"} zIndex={100}
                 ref={headerTitleTwo}
                 fontSize={50}
                 fontFamily={"Fira Code"}
                 text={""}
                 x={() => 1150 / 2 - 100}
                 y={() => -view.height() / 2 + 100}/>
            <Txt text={"XPath"}
                 fontSize={40}
                 fontFamily={"Fira Code"}
                 x={() => view.width() / 2 - 100}
                 y={() => view.height() / 2 - 20}/>
        </Rect>
    )


    const codeBlock = createRef<CodeBlock>()


    view.add(
        <Rect fill={"black"} shadowColor={"black"} shadowBlur={20} height={900} width={1150} radius={40}
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

    yield* slideTransition(Direction.Bottom, 2)


    yield* all(
        headerTitle().text("Select all Authors", 2)
    )


    yield* beginSlide("1")

    const authorSelectAlternativeRect = createRef<Rect>()
    const solutionRect = createRef<Rect>()
    const authorSelectOrText = createRef<Txt>()
    const solutionText1 = createRef<Txt>()


    view.add(
        <Node y={() => 70}>
            <Rect ref={solutionRect} y={-200} height={200} width={500} fill={"black"} shadowBlur={20}
                  shadowColor={"black"} x={590}
                  radius={40}>
                <Txt ref={solutionText1} fill={"white"} fontFamily={"Fira Code"} fontSize={40} text={"//author"}/>
            </Rect>

            <Txt ref={authorSelectOrText} fontFamily={"Fira Code"} x={590} text={"or"}></Txt>

            <Rect ref={authorSelectAlternativeRect} y={200} height={200} width={500} fill={"black"} shadowBlur={20}
                  shadowColor={"black"} x={590}
                  radius={40}>
                <Txt fill={"white"} fontFamily={"Fira Code"} fontSize={40}
                     text={"/books/book/author"}/>
            </Rect>
        </Node>
    )


    authorSelectAlternativeRect().save();
    solutionRect().save();
    authorSelectOrText().save();

    yield* all(
        solutionRect().position.y(0, 0),
        authorSelectAlternativeRect().position.y(0, 0),

        authorSelectOrText().text("", 0),

        solutionRect().position.x(view.width(), 0),
        authorSelectAlternativeRect().position.x(view.width(), 0),
    )

    yield* chain(
        all(
            solutionRect().restore(2),
            authorSelectAlternativeRect().restore(2),
        ),
        authorSelectOrText().restore(1),
    )


    yield* beginSlide("Sol [1]")

    yield* all(
        codeBlock().selection([
            [[3, 0], [3, 100]], // first selection
            [[9, 0], [9, 100]], // second selection
            [[15, 0], [15, 100]], // third selection
        ], 2),
    )


    yield* beginSlide("2 ")
    yield* all(
        all(
            codeBlock().selection(lines(0, Infinity), 1),
            headerTitle().fontSize(50, 2),
            headerTitle().text("Selecting all books from science genre", 2)
        ),
        all(
            solutionRect().position.y(0, 1),
            authorSelectAlternativeRect().position.y(0, 1),

            authorSelectOrText().text("", 1),

            solutionRect().position.x(view.width(), 1),
            authorSelectAlternativeRect().position.x(view.width(), 1),
        )
    )

    yield* beginSlide("Attribute")
    yield* all(
        codeBlock().selection([
            [[7, 17], [7, 35]], // first selection
            [[13, 17], [13, 35]], // second selection
        ], 2),
    );

    yield* beginSlide("Select All")
    yield* all(
        codeBlock().selection(lines(0, Infinity), 1)
    )

    yield* beginSlide("Sol [2] ")
    yield* all(
        solutionRect().position.x(590, 1),

        solutionText1().fontSize(35, 0),
        solutionRect().width(650, 0),
        chain(
            solutionText1().text("", 0),
            solutionText1().text("//book[@category=’science’]", 0),
        ),
        all(
            codeBlock().selection([
                [[7, 0], [12, 100]], // first selection
                [[13, 0], [18, 100]], // second selection
            ], 2),
        )
    )


    yield* beginSlide("2.5")
    yield* all(
        all(
            headerTitleTwo().text("(only the price)", 2),
            headerTitleTwo().position.x(1150 / 2 - 100, 2)
        ),
    )

    yield* beginSlide("Sol [2.5]")
    yield* all(
        all(
            headerTitleTwo().text("(only the price)", 2),
            headerTitleTwo().position.x(1150 / 2 - 100, 2)
        ),
        solutionRect().width(720, 2),
        solutionText1().text("//book[@category=’science’]/price", 2),
        all(
            codeBlock().selection([
                [[10, 0], [10, 100]], // first selection
                [[16, 0], [16, 100]], // second selection
            ], 2),
        )
    )

    yield* beginSlide("3")
    yield* all(
        all(
            codeBlock().selection(lines(0, Infinity), 1),
            chain(
                headerTitleTwo().text("", 1),
                all(
                    headerTitle().fontSize(40, 2),
                    headerTitle().text("Selecting all books with a price higher than 20", 2)
                )
            )
        ),
        all(
            solutionRect().position.y(0, 1),
            authorSelectAlternativeRect().position.y(0, 1),

            authorSelectOrText().text("", 1),

            solutionRect().position.x(view.width(), 1),
            authorSelectAlternativeRect().position.x(view.width(), 1),
        )
    )

    yield* beginSlide("Sol [3]")

    yield* all(
        solutionRect().position.x(590, 1),

        solutionText1().fontSize(50, 0),
        solutionRect().width(650, 0),
        chain(
            solutionText1().text("", 0),
            solutionText1().text("//book[price>20]", 0),
        ),
        all(
            codeBlock().selection([
                [[1, 0], [6, 100]], // first selection
                //[[13, 0], [18, 100]], // second selection
            ], 2),
        )
    )

    yield* beginSlide("4")
    yield* all(
        all(
            codeBlock().selection(lines(0, Infinity), 1),
            chain(
                headerTitleTwo().text("", 1),
                all(
                    headerTitle().fontSize(50, 2),
                    headerTitle().text("Selecting second to last book in books", 2)
                )
            )
        ),
        all(
            solutionRect().position.y(0, 1),
            authorSelectAlternativeRect().position.y(0, 1),

            authorSelectOrText().text("", 1),

            solutionRect().position.x(view.width(), 1),
            authorSelectAlternativeRect().position.x(view.width(), 1),
        )
    )

    yield* beginSlide("Sol [4]")

    yield* all(
        solutionRect().position.x(590, 1),

        solutionText1().fontSize(50, 0),
        solutionRect().width(650, 0),
        chain(
            solutionText1().text("", 0),
            solutionText1().text("//book[last() - 1]", 0),
        ),
        all(
            codeBlock().selection([
                [[7, 0], [12, 100]], // first selection
                //[[13, 0], [18, 100]], // second selection
            ], 2),
        )
    )


    yield* beginSlide("Sol 2 [4]")

    yield* all(
        solutionText1().text("//book[2]", 2),
        solutionText1().fontSize(60, 2),
        all(
            codeBlock().selection([
                [[7, 0], [12, 100]], // first selection
                //[[13, 0], [18, 100]], // second selection
            ], 2),
        )
    )

    yield* beginSlide("Sol 3 [4]")

    yield* all(
        solutionText1().text("//book[1]", 2),
        solutionText1().fontSize(60, 2),
        all(
            codeBlock().selection([
                [[1, 0], [6, 100]],
            ], 2),
        )
    )


    yield* beginSlide("End")

});