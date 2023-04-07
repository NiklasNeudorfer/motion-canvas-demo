import {makeScene2D} from "@motion-canvas/2d";
import {beginSlide, range, useRandom} from "@motion-canvas/core/lib/utils";
import {all} from "@motion-canvas/core/lib/flow";
import {Img, Node, Rect} from "@motion-canvas/2d/lib/components";
import {createSignal} from "@motion-canvas/core/lib/signals";
import box_1 from "../../../images/cpc/Box_1.png"
import box_2 from "../../../images/cpc/Box_2.png"
import box_3 from "../../../images/cpc/Box_3.png"
import box_4 from "../../../images/cpc/Box_4.png"

export default makeScene2D(function* (view) {

    view.add(
        <Rect fill={"black"} width={() => view.width()} height={() => view.height()}>

            <Rect fill={"white"} radius={70} smoothCorners
                  width={() => view.width()} height={() => view.height()}>
            </Rect>
        </Rect>
    )


    const globalRandom = useRandom(123);

    const bgRadius = 70;
    const bg = "white"
    view.fill(bg)

    const count = createSignal(70);
    const fallingProgress = createSignal(-view.height());
    const boxes = range(count()).map(i => {
            let box_color = globalRandom.nextInt(0, 4);


            let randomAtI = useRandom(i * 2);

            let rotationDirection = randomAtI.nextInt(1, 10) % 2 == 0 ? -1 : 1;
            console.log(rotationDirection)


            let speed = randomAtI.nextFloat(1, 2.5);
            if (i > count() / 2) {
                speed = randomAtI.nextFloat(4, 5)
            }
            console.debug(speed)

            return (
                <Img
                    shadowColor={box_color === 1 ? "#6879EA" :
                        box_color === 2 ? "red" :
                            box_color === 3 ? "yellow" : "limegreen"}
                    shadowBlur={60}
                    src={box_color === 1 ? box_1 :
                    box_color === 2 ? box_2 :
                        box_color === 3 ? box_3 : box_4}
                     x={globalRandom.nextInt(-view.width() / 2, view.width() / 2)}
                     y={() => fallingProgress() * speed / 100}
                     rotation={() =>
                         (((fallingProgress() * speed / 100) / (view.height() * 2) * 100) * 0.36) * rotationDirection
                     }/>
            )
        }
    );

    view.add(
        <>
            <Rect height={() => view.height()} y={-view.height()} width={() => view.width()}>
                <Node spawner={() => boxes.slice(0, count() / 2)}/>
            </Rect>
            <Rect height={() => view.height()} y={-view.height() * 2} width={() => view.width()}>
                <Node spawner={() => boxes.slice(count() / 2, count() * 0.75)}/>
            </Rect>
        </>
    );


    yield* all(
        fallingProgress((view.height() * 2) * 100, 5)
    )

    yield* beginSlide("End TITle ")

});