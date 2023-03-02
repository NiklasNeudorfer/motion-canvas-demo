import {makeScene2D} from '@motion-canvas/2d/lib/scenes';
import {createRef} from '@motion-canvas/core/lib/utils';
import {all} from '@motion-canvas/core/lib/flow';
import {Circle, Rect, Txt} from "@motion-canvas/2d/lib/components";
import {easeInCubic} from "@motion-canvas/core/lib/tweening";

export default makeScene2D(function* (view) {
    const windowMain = createRef<Rect>()
    const windowTop = createRef<Rect>()
    const codeBlockReference = createRef<Txt>()

    yield view.add(
        <>
            <Rect
                ref={windowTop}
                radius={[10, 10, 0, 0]}
                fill="#3F3F3F"
                width={() => windowMain().width()}
                height={50}
                x={0}
                y={() => windowMain().height() / -2}
                zIndex={10}
            >
                <Circle
                    fill="#F41000"
                    width={() => windowTop().height() / 2}
                    height={() => windowTop().height() / 2}
                    zIndex={1000}
                    x={() => windowTop().width() / -2 + (windowTop().height() / 2) * 1.8}
                    y={0}
                />
                <Circle
                    fill="#F4C917"
                    width={() => windowTop().height() / 2}
                    height={() => windowTop().height() / 2}
                    zIndex={1000}
                    x={() => windowTop().width() / -2 + ((windowTop().height() / 2) * 1.8) * 2}
                    y={0}
                />
                <Circle
                    fill="#00F419"
                    width={() => windowTop().height() / 2}
                    height={() => windowTop().height() / 2}
                    zIndex={1000}
                    x={() => windowTop().width() / -2 + ((windowTop().height() / 2) * 1.8) * 3}
                    y={0}
                />
            </Rect>
            <Rect
                ref={windowMain}
                radius={[0, 0, 10, 10]}
                fill="#7E7E7E"
                width={1000}
                height={500}
                y={() => windowTop().height() / 2}
                x={0}
                opacity={0.75}
            >
            </Rect>
        </>
    )


    windowMain().save();
    windowTop().save();

    yield* all(
        windowMain().height(0, 0),
        windowMain().width(0, 0),

        windowTop().width(0, 0),
        windowTop().height(0, 0),
    );

    // spawn Terminal
    yield* all(
        windowMain().restore(1),
        windowTop().restore(1),
    )


    // add CodeBlock
    yield view.add(
        <Txt
            ref={codeBlockReference}
            height={() => codeBlockReference().fontSize()}
            alignContent={"start"}
            width={() => windowMain().width()-25}
            y={() => windowMain().height() / -2 + codeBlockReference().fontSize() + 25}
            x={10}
            fontSize={40}
            fontFamily={"monospace"}
            fill={"rgb(0,255,0)"}
            fontStyle={"bold"}
            text={""}
        />
    )
    yield* codeBlockReference().text('$ git push origin master', 1.5, easeInCubic);
});
