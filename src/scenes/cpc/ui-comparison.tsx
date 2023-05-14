import {makeScene2D} from "@motion-canvas/2d";
import {slideTransition} from "@motion-canvas/core/lib/transitions";
import {Direction} from "@motion-canvas/core/lib/types";
import {all, chain, sequence} from "@motion-canvas/core/lib/flow";
import {Img, Rect, Txt} from "@motion-canvas/2d/lib/components";
import {beginSlide, createRef} from "@motion-canvas/core/lib/utils";
import oldUI from "../../../images/cpc/old-gui.png"
import newUI from "../../../images/cpc/overview_ui.png"

import config from "../../../images/cpc/config.png"
import journal from "../../../images/cpc/journal.png"
import userJournal from "../../../images/cpc/user-journal.png"
import dashboard from "../../../images/cpc/dashboard.png"

import otherBugReport from "../../../images/cpc/other_bugReport.png";
import otherConfigJournal from "../../../images/cpc/other_config_journal.png";
import otherFcode from "../../../images/cpc/other_fcode.png";
import otherHelp from "../../../images/cpc/other_help.png";
import otherLoadcontrol from "../../../images/cpc/other_loadcontrol.png";


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
            <Txt fontFamily={"Open Sans"} fontSize={120} ref={titleTxt} text={"GUI Vergleich"}></Txt>
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
    yield* all(
        oldUIImage().scale(0, 0)
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
    yield* beginSlide("Dashboard")
    const dashboardRef = createRef<Img>()

    view.add(
        <Img ref={dashboardRef} zIndex={30} scale={0.5} y={() => view.height()} shadowBlur={50}
             shadowColor={enomicsColor} radius={30}
             clip src={dashboard}/>
    )
    yield* sequence(
        0.3,
        dashboardRef().position.y(0, 2.5),
        userJournalRef().scale(0.7, 2.5),
        dashboardRef().scale(0.8, 2.5)
    )
    //-----------------------------------------------------------------------------------------------------------------
    //-----------------------------------------------------------------------------------------------------------------
    yield* beginSlide("Other Screens")
    const blurryRect = createRef<Rect>()

    const bugreportRef = createRef<Img>()
    const configJournalRef = createRef<Img>()
    const fcodeRef = createRef<Img>()
    const helpRef = createRef<Img>()
    const loadcontrolRef = createRef<Img>()

    view.add(
        <>
            <Rect ref={blurryRect} fill={"black"} zIndex={10000}
                  shadowBlur={1000} shadowColor={"black"}
                  width={() => view.width()} height={() => view.height()}
                  radius={40} opacity={0}></Rect>


            <Img ref={bugreportRef} zIndex={30000} scale={0.5} y={() => view.height()} shadowBlur={50}
                 shadowColor={enomicsColor} radius={30}
                 clip src={otherBugReport}/>

            <Img ref={configJournalRef} zIndex={30000} scale={0.5} y={() => view.height()} shadowBlur={50}
                 shadowColor={enomicsColor} radius={30}
                 clip src={otherConfigJournal}/>

            <Img ref={fcodeRef} zIndex={30000} scale={0.5} y={() => view.height()} shadowBlur={50}
                 shadowColor={enomicsColor} radius={30}
                 clip src={otherFcode}/>

            <Img ref={helpRef} zIndex={30000} scale={0.5} y={() => view.height()} shadowBlur={50}
                 shadowColor={enomicsColor} radius={30}
                 clip src={otherHelp}/>

            <Img ref={loadcontrolRef} zIndex={30000} scale={0.5} y={() => view.height()} shadowBlur={50}
                 shadowColor={enomicsColor} radius={30}
                 clip src={otherLoadcontrol}/>
        </>
    )

    loadcontrolRef().save()
    configJournalRef().save()
    fcodeRef().save()
    helpRef().save()
    bugreportRef().save()


    yield* sequence(0.5,
        blurryRect().opacity(0.5, 1),
        all(
            sequence(0.1,
                all(
                    bugreportRef().scale(0.4, 2),
                    sequence(0.3,
                        bugreportRef().position.x(630, 2),
                        bugreportRef().position.y(-320, 2),
                        bugreportRef().rotation(4, 2)
                    )
                ),
                all(
                    configJournalRef().scale(0.5, 2),
                    sequence(0.3,
                        configJournalRef().position.x(400, 2),
                        configJournalRef().position.y(200, 2),
                        configJournalRef().rotation(4, 2)
                    )
                ),
                all(
                    fcodeRef().scale(0.45, 2),
                    sequence(0.3,
                        fcodeRef().position.x(-650, 2),
                        fcodeRef().position.y(-300, 2),
                        fcodeRef().rotation(-5, 2),
                    )
                ),
                all(
                    helpRef().scale(0.4, 2),
                    sequence(0.3,
                        helpRef().position.x(0, 2),
                        helpRef().position.y(-320, 2),
                        helpRef().rotation(0, 2),
                    )
                ),
                all(
                    loadcontrolRef().scale(0.45, 2),
                    sequence(0.3,
                        loadcontrolRef().position.x(-500, 2),
                        loadcontrolRef().position.y(200, 2),
                        loadcontrolRef().rotation(-2, 2)
                    )
                ),
            ),
        )
    )

    //-----------------------------------------------------------------------------------------------------------------
    //-----------------------------------------------------------------------------------------------------------------
    yield* beginSlide("Move All Images to border")

    yield* sequence(0.5,
        all(
            loadcontrolRef().restore(2),
            configJournalRef().restore(2),
            fcodeRef().restore(2),
            helpRef().restore(2),
            bugreportRef().restore(2)
        ),
        blurryRect().opacity(0, 1)
    )


    yield* all(titleTxt().text("", 0))

    yield* all(
        sequence(0.5,
            sequence(0.1,
                all(
                    dashboardRef().scale(0.3, 2),
                    sequence(0.3,
                        dashboardRef().position.x(630, 2),
                        dashboardRef().position.y(-320, 2),
                        dashboardRef().rotation(4, 2)
                    )
                ),
                all(
                    userJournalRef().scale(0.3, 2),
                    sequence(0.3,
                        userJournalRef().position.x(0, 2),
                        userJournalRef().position.y(300, 2)
                    )
                ),
                all(
                    newUIImage().scale(0.45, 2),
                    sequence(0.3,
                        newUIImage().position.x(-650, 2),
                        newUIImage().position.y(-300, 2),
                        newUIImage().rotation(-5, 2),
                    )
                ),
                all(
                    configRef().scale(0.4, 2),
                    sequence(0.3,
                        configRef().position.x(0, 2),
                        configRef().position.y(-320, 2),
                        configRef().rotation(0, 2),
                    )
                ),
                all(
                    journalRef().scale(0.35, 2),
                    sequence(0.3,
                        journalRef().position.x(-600, 2),
                        journalRef().position.y(300, 2),
                        journalRef().rotation(2, 2)
                    )
                ),
                all(
                    sequence(0.1,
                        all(
                            bugreportRef().zIndex(1000020, 0),
                            bugreportRef().scale(0.25, 2),
                            sequence(0.3,
                                bugreportRef().position.x(630, 2),
                                bugreportRef().position.y(320, 2),
                                bugreportRef().rotation(0, 2)
                            )
                        ),
                        all(
                            configJournalRef().zIndex(100000, 0),
                            configJournalRef().scale(0.25, 2),
                            sequence(0.3,
                                configJournalRef().position.x(450, 2),
                                configJournalRef().position.y(200, 2),
                                configJournalRef().rotation(2, 2)
                            )
                        ),
                        all(
                            fcodeRef().zIndex(1000000, 0),
                            fcodeRef().scale(0.25, 2),
                            sequence(0.3,
                                fcodeRef().position.x(450, 2),
                                fcodeRef().position.y(400, 2),
                                fcodeRef().rotation(5, 2),
                            )
                        ),
                        all(
                            helpRef().zIndex(100000, 0),
                            helpRef().scale(0.25, 2),
                            sequence(0.3,
                                helpRef().position.x(800, 2),
                                helpRef().position.y(400, 2),
                                helpRef().rotation(-2, 2),
                            )
                        ),
                        all(
                            loadcontrolRef().scale(0.25, 2),
                            sequence(0.3,
                                loadcontrolRef().position.x(800, 2),
                                loadcontrolRef().position.y(200, 2),
                                loadcontrolRef().rotation(-2, 2)
                            )
                        ),
                    ),
                )
            ),
            all(
                titleTxt().fontSize(100, 1),
                titleTxt().text("Vielen Dank für Ihre Aufmerksamkeit!", 2)
            )
        )
    )


    //-----------------------------------------------------------------------------------------------------------------
    //-----------------------------------------------------------------------------------------------------------------
    yield* beginSlide("End UI")
})
