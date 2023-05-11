import {makeScene2D} from "@motion-canvas/2d";
import {slideTransition} from "@motion-canvas/core/lib/transitions";
import {Direction} from "@motion-canvas/core/lib/types";
import {all, sequence} from "@motion-canvas/core/lib/flow";
import {Img, Rect, Txt} from "@motion-canvas/2d/lib/components";
import {beginSlide, createRef} from "@motion-canvas/core/lib/utils";
import oldUI from "../../../images/cpc/old-gui.png"
import newUI from "../../../images/cpc/overview_ui.png"

import config from "../../../images/cpc/config.png"
import journal from "../../../images/cpc/journal.png"
import userJournal from "../../../images/cpc/user-journal.png"
import dashboard from "../../../images/cpc/dashboard.png"


export default makeScene2D(function* (view) {

    const bg = "white"
    const enomicsColor = "rgb(0, 187, 255)"
    view.fill(bg)

    const titleTxt = createRef<Txt>()
    const oldUIImage = createRef<Img>()
    const newUIImage = createRef<Img>()

    view.add(
        <Rect fill={"black"} width={() => view.width()} height={() => view.height()}>

            <Rect fill={"white"} radius={70} smoothCorners
                  width={() => view.width()} height={() => view.height()}>
            </Rect>
        </Rect>
    )

    view.add(
        <>
            <Txt fontFamily={"Open Sans"} fontSize={120} ref={titleTxt} text={"UI Comparison"}></Txt>
            <Img ref={oldUIImage} scale={1} x={() => view.height()} y={() => view.height() * 2} shadowBlur={50}
                 shadowColor={"black"} radius={30} clip src={oldUI}/>
            <Img zIndex={20} ref={newUIImage} scale={1} y={() => view.height()} shadowBlur={50}
                 shadowColor={enomicsColor} radius={30}
                 clip src={newUI}/>
        </>
    )


    yield* slideTransition(Direction.Bottom, 2)


    // yield* slideTransition(Direction.Bottom)


    yield* beginSlide("Start")


    yield* sequence(
        1,
        all(
            oldUIImage().position.y(0, 2),
            oldUIImage().position.x(0, 2)
        ),
        oldUIImage().scale(1.1, 1)
    )

    yield* beginSlide("Device Overview")

    yield* sequence(
        0.3,
        newUIImage().position.y(0, 2.5),
        oldUIImage().scale(1, 2.5),
        newUIImage().scale(1.2, 2.5),
    )

    //-----------------------------------------------------------------------------------------------------------------
    //-----------------------------------------------------------------------------------------------------------------
    yield* beginSlide("Config")
    const configRef = createRef<Img>()

    view.add(
        <Img ref={configRef} zIndex={30} scale={1} y={() => view.height()} shadowBlur={50}
             shadowColor={enomicsColor} radius={30}
             clip src={config}/>
    )
    yield* sequence(
        0.3,
        configRef().position.y(0, 2.5),
        newUIImage().scale(1, 2.5),
        configRef().scale(1.1, 2.5)
    )

    //-----------------------------------------------------------------------------------------------------------------
    //-----------------------------------------------------------------------------------------------------------------
    yield* beginSlide("Journal")
    const journalRef = createRef<Img>()

    view.add(
        <Img ref={journalRef} zIndex={30} scale={0.6} y={() => view.height()} shadowBlur={50}
             shadowColor={enomicsColor} radius={30}
             clip src={journal}/>
    )
    yield* sequence(
        0.3,
        journalRef().position.y(0, 2.5),
        configRef().scale(1, 2.5),
        journalRef().scale(0.85, 2.5)
    )

    //-----------------------------------------------------------------------------------------------------------------
    //-----------------------------------------------------------------------------------------------------------------
    yield* beginSlide("User Journal")
    const userJournalRef = createRef<Img>()

    view.add(
        <Img ref={userJournalRef} zIndex={30} scale={0.5} y={() => view.height()} shadowBlur={50}
             shadowColor={enomicsColor} radius={30}
             clip src={userJournal}/>
    )
    yield* sequence(
        0.3,
        userJournalRef().position.y(0, 2.5),
        journalRef().scale(0.7, 2.5),
        userJournalRef().scale(0.8, 2.5)
    )


    //-----------------------------------------------------------------------------------------------------------------
    //-----------------------------------------------------------------------------------------------------------------
    yield* beginSlide("End UI")
})
