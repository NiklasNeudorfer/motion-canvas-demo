import {makeScene2D} from "@motion-canvas/2d";
import {beginSlide, createRef} from "@motion-canvas/core/lib/utils";
import {all} from "@motion-canvas/core/lib/flow";
import {CodeBlock, insert} from "@motion-canvas/2d/lib/components/CodeBlock";

export default makeScene2D(function* (view) {

    view.fill("black");

    yield* beginSlide("Start")

    const title = createRef<CodeBlock>()


    view.add(
        <CodeBlock ref={title} language={"xml"} fontSize={100}/>
    )

    yield* all(
        title().code(`
            <Presentation mainTopic='XML'>
            </Presentation>`, 2)
    )

    yield* beginSlide("Topics")

    yield* all(
        title().edit(2.1)`
         <Presentation mainTopic='XML'>
            ${insert('<Topic> XPath </Topic>\n' +
            '   <Topic> XQuery </Topic>\n' +
            '   <Topic> DTD/XSD </Topic>')} 
         </Presentation>`
    )

    yield* beginSlide("Start")

});