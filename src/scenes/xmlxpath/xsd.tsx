import {makeScene2D} from "@motion-canvas/2d";
import {CodeBlock, insert, lines} from "@motion-canvas/2d/lib/components/CodeBlock";
import {beginSlide, createRef} from "@motion-canvas/core/lib/utils";
import {slideTransition} from "@motion-canvas/core/lib/transitions";
import {Direction} from "@motion-canvas/core/lib/types";
import {all, chain} from "@motion-canvas/core/lib/flow";
import {Rect, Txt} from "@motion-canvas/2d/lib/components";

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

    yield* beginSlide("show Example")
    const xsd = createRef<Rect>()
    const xsdCode = createRef<CodeBlock>()

    view.add(
        <Rect ref={xsd} shadowColor={"white"} shadowBlur={40} y={() => view.height()}
              height={() => view.height() * 0.9} width={() => view.width() * 0.9} fill={"black"} radius={40}>

            <CodeBlock ref={xsdCode} fontSize={43} language={"xml"} y={35} code={
                `
                <?xml version="1.0" encoding="UTF−8"?>
                    <xsd:schema xmlns:xsd="http://www.w3.org/2001/XMLSchema">
                    <xsd:complexType name ="uniType">
                        <xsd:sequence>
                            <xsd:element ref="student" maxOccurs="unbounded"/>
                        </xsd:sequence>
                    </xsd:complexType>
                    <xsd:complexType name="stuType">
                        <xsd:sequence>
                            <xsd:element ref="name"/>
                            <xsd:element ref="year"/>
                        </xsd:sequence>
                    </xsd:complexType>
                    <xsd:element name="university" type="uniType"/>
                    <xsd:element name="student" type="stuType"/>
                    <xsd:element name="name" type="xsd:string"/>
                    <xsd:element name="year" type="xsd:integer"/>
                </xsd:schema>
                `
            }/>

        </Rect>
    )

    yield* all(
        xsdTitle().scale(0.6, 1),
        xsd().position.y(0, 1)
    )

    yield* beginSlide("Show Types")
    yield* all(
        xsdCode().selection([
            [[13, 35], [13, 49]],
            [[14, 32], [14, 46]],
            [[15, 29], [15, 46]],
            [[16, 29], [16, 47]],
        ], 2),
    )
    yield* beginSlide("Show Complex")
    yield* all(
        xsdCode().selection([
            [[2, 0], [2, 100]],
            [[7, 0], [7, 100]],
            [[13, 35], [13, 49]],
            [[14, 32], [14, 46]],
        ], 2),
    )
    yield* beginSlide("All")

    const enumRect = createRef<Rect>()
    const rangeRect = createRef<Rect>()
    const textOne = createRef<Txt>()
    const textTwo = createRef<Txt>()

    view.add(
        <>
            <Txt ref={textOne} fill={"white"} fontFamily={"Fira Code"} text={""}
                 y={() => view.height() / -2 + 150} x={500} fontSize={50}/>

            <Rect ref={enumRect} shadowColor={"white"} shadowBlur={40} x={() => view.width() * -1} y={0}
                  height={500} width={() => view.width() * 0.56} fill={"black"} radius={40}>
                <CodeBlock fontSize={40} code={
                    `
                    <xs:simpleType name="color" final="restriction">
                        <xs:restriction base="xs:string">
                            <xs:enumeration value="green" />
                            <xs:enumeration value="red" />
                            <xs:enumeration value="blue" />
                        </xs:restriction>
                    </xs:simpleType>
                    `
                }/>

            </Rect>


            <Txt ref={textTwo} fill={"white"} fontFamily={"Fira Code"} text={""}
                 y={() => view.height() / 2 - 150} x={-400}/>

            <Rect ref={rangeRect} shadowColor={"white"} shadowBlur={40} x={() => view.width()} y={0}
                  height={500} width={() => view.width() * 0.5} fill={"black"} radius={40}>
                <CodeBlock fontSize={40} code={
                    `
                    <xs:element name="age">
                        <xs:simpleType>
                            <xs:restriction base="xs:integer">
                                <xs:minInclusive value="0"/>
                                <xs:maxInclusive value="100"/>
                            </xs:restriction>
                        </xs:simpleType>
                    </xs:element>
                    `
                }/>

            </Rect>
        </>
    )

    yield* chain(
        all(
            xsdCode().selection(lines(Infinity, Infinity), 2),

            enumRect().position.x(view.width() / -2 + 610, 2),
            enumRect().position.y(-260, 2),

            rangeRect().position.x(view.width() / 2 - 500, 2),
            rangeRect().position.y(260, 2),
        ),
        all(
            textOne().text("SimpleType Example\n Enumeration", 2),
            textTwo().text("SimpleType Example \nRange Constraints", 2),
        )
    )


    yield* beginSlide("xsd end")
})
