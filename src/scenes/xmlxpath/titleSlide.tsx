import {makeScene2D} from "@motion-canvas/2d";
import {beginSlide, createRef} from "@motion-canvas/core/lib/utils";
import {Img, Node, Polygon, Rect, Txt, Video} from "@motion-canvas/2d/lib/components";
import {waitFor} from "@motion-canvas/core/lib/flow";

export default makeScene2D(function* (view) {

    view.fill("black");

    yield* beginSlide("Start")


    view.add(
        <Txt fontSize={70} fill={"white"} fontFamily={'Fira Code'} text={"XML, XPath, XQuery, DTD/XSD"}/>
    )

    yield* waitFor(3)

});