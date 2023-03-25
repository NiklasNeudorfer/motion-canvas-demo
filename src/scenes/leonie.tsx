import {makeScene2D} from "@motion-canvas/2d";
import {Circle, Img, Node, Polygon, Rect, Txt, Video} from "@motion-canvas/2d/lib/components";
import {beginSlide, createRef} from "@motion-canvas/core/lib/utils";
import {easeInCubic} from "@motion-canvas/core/lib/tweening";
import {all, chain, loop, waitFor} from "@motion-canvas/core/lib/flow";

import leonieLogo from "../../images/leonie/logo_red.svg"
import sysArch from "../../images/leonie/newArch.png"
import diagramm from "../../images/leonie/arch.png"
import leonieIdle from "../../images/leonie/LeonieIdle.mp4"
import leonie2DLogo from "../../images/leonie/Leonie2DLogo.png"
import {cancel} from "@motion-canvas/core/lib/threading";

export default makeScene2D(function* (view) {

    view.fill("white");

    yield* beginSlide("Start")

    const logoRef = createRef<Img>();
    const group = createRef<Node>();
    const video3DRef = createRef<Video>();
    const chatRef = createRef<Txt>();
    const chatBoxRef = createRef<Txt>();
    const sendButtonRef = createRef<Polygon>();

    const dcBotBox = createRef<Rect>()
    const boxColor = "#3F4248";
    const botColor = "#5865F2";
    const pbMargin = 50;


    view.add(
        <Node ref={group} scale={3} y={650}>
            <Img ref={logoRef} src={leonieLogo} scale={2} y={-200}/>

            <Video x={view.width() / 3} y={view.height() / 5 - 50} ref={video3DRef}
                   src={leonieIdle}>
                <Rect height={700} fill={"white"} x={678 / 2} width={20}/>
            </Video>


            <Circle
                x={view.width() / -3 - 100}
                height={330}
                width={330}
                shadowColor={"grey"}
                shadowBlur={40}>
                <Circle height={330} width={330} fill={"#3A3A3A"}>
                    <Img src={leonie2DLogo} height={300} width={300}/>
                </Circle>
            </Circle>

            <Rect ref={dcBotBox}
                  x={view.width() / -3 + 200}
                  y={() => view.height() / 2 + dcBotBox().height() / -2 - 70}
                  fill={boxColor}
                  radius={40} smoothCorners
                  shadowColor={"grey"}
                  shadowBlur={40}
                  width={600}
                  height={200}
            >

                <Circle height={() => dcBotBox().height() - pbMargin}
                        width={() => dcBotBox().height() - pbMargin}
                        fill={"white"}
                        x={() => dcBotBox().width() / -2 - (dcBotBox().height() - pbMargin) / -2 + pbMargin / 2}

                >
                    <Img src={leonieLogo} scale={0.45}></Img>
                </Circle>

                <Txt fill={"white"} fontSize={70}>Leonie</Txt>

                <Rect fill={botColor}
                      height={70}
                      width={130}
                      radius={10} smoothCorners
                      x={() => dcBotBox().width() / 2 - (130) / 2 - pbMargin}
                >
                    <Txt fill={"white"} scale={0.7}>BOT</Txt>
                </Rect>
            </Rect>

        </Node>
    );


    const chatGroup = createRef<Node>();
    const userMsg1 = createRef<Rect>();
    const responseMsg1 = createRef<Rect>();
    const responseMsg2 = createRef<Rect>();
    const idleMsg = createRef<Rect>();

    const msgHeight = 100;

    const loadingDot1 = createRef<Circle>()
    const loadingDot2 = createRef<Circle>()
    const loadingDot3 = createRef<Circle>()


    const sysArchGroup = createRef<Node>()
    const archImg = createRef<Img>()

    const dashboardFallbackText = createRef<Txt>()


    const diagramGroup = createRef<Node>()
    const diagramImg = createRef<Img>()

    const dashboardGroup = createRef<Node>()
    const convoBox = createRef<Rect>()
    const conversationCardHeight = 550;
    const conversationCardWidth = 1300;

    const currentDate = new Date(Date.now());
    var dateMinutes: string = currentDate.getMinutes().toString();

    if (currentDate.getMinutes() < 10) {
        dateMinutes = "0" + dateMinutes;
    }

    view.add(
        <Node ref={chatGroup}>

            <Rect
                ref={chatBoxRef}
                fill={"rgba(126,126,126,0.53)"}
                y={view.height() / 2 - 150}
                x={view.width() * 0.7}
                width={600}
                shadowBlur={20}
                shadowColor={"rgba(0,0,0,0.5)"}
                height={120}
                radius={20}
                alignContent={"start"}>
                <Rect
                    fill={"rgb(255,255,255)"}
                    width={600}
                    shadowBlur={20}
                    height={120}
                    radius={20}
                    alignContent={"start"}>
                    <Txt x={40} width={() => chatBoxRef().width()} ref={chatRef} fill={"black"} fontSize={40}></Txt>
                </Rect>
            </Rect>
            <Polygon
                ref={sendButtonRef}
                y={view.height() / 2 - 150}
                x={view.width() * 0.7 + chatBoxRef().width() / 2 + 75}
                rotation={90}
                sides={3}
                height={500}
                width={400}
                scale={0.25}
                fill={"#c71818"}>
                <Polygon
                    y={() => sendButtonRef().width() / 2 - 125}
                    rotation={0}
                    sides={3}
                    height={400}
                    width={100}
                    zIndex={100}
                    fill={"#ffffff"}>

                </Polygon>
            </Polygon>

            <Rect
                opacity={0}
                ref={userMsg1}
                fill={"#bc1127"}
                y={view.height() / -2 + 150}
                x={() => view.width() * 0.7 + userMsg1().width() / 4}
                width={400}
                height={msgHeight}
                smoothCorners
                radius={[40, 0, 40, 40]}>
                <Txt x={40} width={() => userMsg1().width()} fill={"white"} fontSize={40}>Wer ist Dijkstra?</Txt>
                <Polygon
                    x={() => userMsg1().width() / 2}
                    y={() => userMsg1().height() / -2 + 13}
                    fill={"#bc1127"}
                    sides={3}
                    height={50}
                    width={50}
                    rotation={180}/>
            </Rect>

            <Rect
                opacity={0} ref={responseMsg1} fill={"#eee"} smoothCorners
                y={view.height() / -2 + 300}
                x={() => view.width() * 0.7 + (chatBoxRef().width() / -2) + responseMsg1().width() / 2}
                width={250}
                height={msgHeight}
                alignContent={"start"}
                radius={[0, 40, 40, 40]}>
                <Txt x={40} width={() => responseMsg1().width()} fontSize={40}>Hallo! 😀</Txt>
                <Polygon
                    x={() => responseMsg1().width() / -2}
                    y={() => responseMsg1().height() / -2 + 13}
                    fill={"#eee"}
                    sides={3}
                    height={50}
                    width={50}
                    rotation={180}/>
            </Rect>

            <Rect
                opacity={0} ref={responseMsg2} fill={"#eee"} smoothCorners
                y={view.height() / -2 + 300}
                x={() => view.width() * 0.7 + (chatBoxRef().width() / -2) + responseMsg2().width() / 2}
                width={250 * 2.1}
                height={msgHeight * 1.25}
                alignContent={"start"}
                radius={[0, 40, 40, 40]}>
                <Txt x={40} y={-20} width={() => responseMsg2().width()} fontSize={40}>Hast du schon das</Txt>
                <Txt x={40} y={25} width={() => responseMsg2().width()} fontSize={40}>Dashboard gesehen? 🤔</Txt>
                <Polygon
                    x={() => responseMsg2().width() / -2}
                    y={() => responseMsg2().height() / -2 + 13}
                    fill={"#eee"}
                    sides={3}
                    height={50}
                    width={50}
                    rotation={180}/>
            </Rect>


            <Rect
                opacity={0}
                ref={idleMsg}
                fill={"#eee"}
                y={view.height() / -2 + 300}
                x={() => view.width() * 0.7 + (chatBoxRef().width() / -2) + idleMsg().width() / 2}
                width={200}
                smoothCorners
                height={msgHeight}
                radius={[0, 40, 40, 40]}>
                <Polygon
                    x={() => idleMsg().width() / -2}
                    y={() => idleMsg().height() / -2 + 13}
                    fill={"#eee"}
                    sides={3}
                    height={50}
                    width={50}
                    rotation={180}/>

                <Circle ref={loadingDot1} x={-50} height={40} fill={"red"} width={40}/>
                <Circle ref={loadingDot2} x={50} height={40} fill={"red"} width={40}/>
                <Circle ref={loadingDot3} height={40} fill={"red"} width={40}/>
            </Rect>
        </Node>
    )

    view.add(
        <Node ref={dashboardGroup} y={()=> view.height() / -2  + 400}>
            <Txt
                x={() => (view.width() * 0.7 * 2.4 - 650)}
                y={() => -120}
                fill={"#3d3d3d"}
                fontSize={70}
                zIndex={200}
                text={"Unterhaltungen: "}/>


            <Rect
                ref={convoBox}
                fill={"rgba(126,126,126,0.53)"}
                x={() => (view.width() * 0.7 * 2.4 - 250)}
                y={() => 200}
                shadowBlur={20}
                shadowColor={"rgba(0,0,0,0.5)"}
                radius={20}
                height={conversationCardHeight}
                width={conversationCardWidth}
                alignContent={"start"}>
                <Rect
                    fill={"rgb(255,255,255)"}
                    shadowBlur={20}
                    radius={20}
                    height={conversationCardHeight}
                    width={conversationCardWidth}>

                    <Txt fill={"#797979"}
                         fontSize={40}
                         x={() => convoBox().width() / -2 + 500}
                         y={() => convoBox().height() / -2 + 50}
                         zIndex={100}
                         text={
                             currentDate.toDateString().split(" ")[2] + ". " +
                             currentDate.toDateString().split(" ")[1] + ". " +
                             currentDate.toDateString().split(" ")[3] + " " +
                             currentDate.getHours() + ":" + dateMinutes +
                             " und 1 Nachrichten vom User"
                         }
                    />

                    <Rect
                        fill={"#bc1127"}
                        y={() => convoBox().height() / -2 + 150}
                        x={() => convoBox().width() / 2 + userMsg1().width() / -2 - 70}
                        width={400}
                        height={msgHeight}
                        smoothCorners
                        radius={[40, 0, 40, 40]}>
                        <Txt x={40} width={() => userMsg1().width()} fill={"white"} fontSize={40}>Wer ist Dijkstra?</Txt>
                        <Txt ref={dashboardFallbackText} x={120} y={80} width={() => userMsg1().width()} fill={"grey"} fontSize={35}>nlu_fallback -
                            30%</Txt>
                        <Polygon
                            x={() => userMsg1().width() / 2}
                            y={() => userMsg1().height() / -2 + 13}
                            fill={"#bc1127"}
                            sides={3}
                            height={50}
                            width={50}
                            rotation={180}/>
                    </Rect>

                    {/*<Rect*/}
                    {/*    fill={"#eee"} smoothCorners*/}
                    {/*    x={() => -convoBox().width() / 2 + responseMsg1().width() / 2 + 70}*/}
                    {/*    y={() => convoBox().height() / -2 + 300}*/}
                    {/*    width={250}*/}
                    {/*    height={msgHeight}*/}
                    {/*    alignContent={"start"}*/}
                    {/*    radius={[0, 40, 40, 40]}>*/}
                    {/*    <Txt x={40} width={() => responseMsg1().width()} fontSize={40}>Hallo! 😀</Txt>*/}
                    {/*    <Polygon*/}
                    {/*        x={() => responseMsg1().width() / -2}*/}
                    {/*        y={() => responseMsg1().height() / -2 + 13}*/}
                    {/*        fill={"#eee"}*/}
                    {/*        sides={3}*/}
                    {/*        height={50}*/}
                    {/*        width={50}*/}
                    {/*        rotation={180}/>*/}
                    {/*</Rect>*/}

                    <Rect
                        fill={"#eee"} smoothCorners
                        x={() => -convoBox().width() / 2 + responseMsg2().width() / 2 + 70}
                        y={() => convoBox().height() / -2 + 300}
                        width={250 * 2.1}
                        height={msgHeight * 1.25}
                        alignContent={"start"}
                        radius={[0, 40, 40, 40]}>
                        <Txt x={40} y={-20} width={() => responseMsg2().width()} fontSize={40}>Hast du schon das</Txt>
                        <Txt x={40} y={25} width={() => responseMsg2().width()} fontSize={40}>Dashboard gesehen? 🤔</Txt>
                        <Polygon
                            x={() => responseMsg2().width() / -2}
                            y={() => responseMsg2().height() / -2 + 13}
                            fill={"#eee"}
                            sides={3}
                            height={50}
                            width={50}
                            rotation={180}/>
                    </Rect>
                </Rect>
            </Rect>


            <Txt
                x={() => (view.width() * 0.7 * 2.4 + 620)}
                y={() => -120}
                fill={"#3d3d3d"}
                fontSize={70}
                zIndex={200}
                text={"Feedback: "}/>

            <Rect
                fill={"rgba(126,126,126,0.53)"}
                x={() => (view.width() * 0.7 * 2.4 + 680)}
                y={() => 45}
                shadowBlur={15}
                shadowColor={"rgba(0,0,0,0.5)"}
                radius={20}
                height={conversationCardHeight / 2.3}
                width={450}
                alignContent={"start"}>
                <Rect
                    fill={"rgb(255,255,255)"}
                    radius={20}
                    height={conversationCardHeight / 2.3}
                    width={450}
                    alignContent={"start"}>

                    <Txt y={-70} x={-95} text={"Vanessa"}/>
                    <Txt y={-70} x={130} fill={"#a4a4a4"} text={"4/5"}/>
                    <Txt fontSize={45} y={50} fill={"#797979"} text={"Toller Chatbot! 😀"}/>
                </Rect>
            </Rect>


            <Rect
                fill={"rgba(126,126,126,0.53)"}
                x={() => (view.width() * 0.7 * 2.4 + 680)}
                y={() => conversationCardHeight / 2.3 + 110}
                shadowBlur={15}
                shadowColor={"rgba(0,0,0,0.5)"}
                radius={20}
                height={conversationCardHeight / 2.3}
                width={450}
                alignContent={"start"}>
                <Rect
                    fill={"rgb(255,255,255)"}
                    radius={20}
                    height={conversationCardHeight / 2.3}
                    width={450}
                    alignContent={"start"}>

                    <Txt y={-70} x={-110} text={"Philipp"}/>
                    <Txt y={-70} x={130} fill={"#a4a4a4"} text={"5/5"}/>
                    <Txt fontSize={45} x={-46} y={50} fill={"#797979"} text={"Alles Perfekt!"}/>
                </Rect>
            </Rect>

        </Node>
    )


    view.add(
        <Node ref={sysArchGroup}>
            <Img
                ref={archImg}
                src={sysArch}
                height={() => view.height()}
                width={() => view.width()}
                x={() => (view.width() * 0.7 * 2.4)}
                y={() => (view.width() * 0.7)}
            ></Img>
        </Node>
    )

    view.add(
        <Node ref={diagramGroup}>
            <Img
                ref={diagramImg}
                src={diagramm}
                height={() => view.height()}
                width={() => view.width()}
                zIndex={100}
                x={() => (view.width() * 0.7 * 2.4)}
                y={() => (view.width() * 0.7*2.4)}
            ></Img>
        </Node>
    )


    video3DRef().save()

    const loopVideo = yield loop(Infinity, () => {
        if (!video3DRef().isPlaying()) {
            video3DRef().restore(0)
            video3DRef().play();
        }
    });

    yield* beginSlide("Types")

    yield* all(
        group().scale(1, 2),
        group().position.y(0, 2),
        //group().position.y(-200, 2),
    )

    yield* beginSlide("Show Chat")

    yield* all(
        group().position.x(-view.width() * 0.7, 2),
        chatGroup().position.x(-view.width() * 0.7, 2),
        sysArchGroup().position.x(-view.width() * 0.7, 2),
        dashboardGroup().position.x(-view.width() * 0.7, 2),
        diagramGroup().position.x(-view.width() * 0.7, 2),
        //group().position.y(-200, 2),
    )

    yield* beginSlide("User Typing")

    yield* chatRef().text('Wer ist Dijkstra?', 1.5, easeInCubic);


    yield* beginSlide("User send Msg")

    yield* all(
        chatRef().text('', 0, easeInCubic),
        userMsg1().opacity(1, 0, easeInCubic),
    )

    yield* chain(
        waitFor(0.6),
        idleMsg().opacity(1, 0)
    )


    const color1 = "#a4a4a4"
    const color2 = "#d3d3d3"

    yield* all(
        loadingDot1().fill(color1, 0),
        loadingDot2().fill(color1, 0,),
        loadingDot3().fill(color1, 0),
    )

    const typingIdle = yield loop(Infinity, () => all(
            loadingDot1().fill(color2, 0.5).to(color1, 0.5),
            loadingDot2().fill(color1, 0.2).to(color2, 0.5).to(color1, 0.5),
            loadingDot3().fill(color1, 0.1).to(color2, 0.5).to(color1, 0.5),
        )
    );


    //yield* beginSlide("Rsp Hallo")
    //cancel(typingIdle)


    // yield* all(
    //     idleMsg().opacity(0, 0),
    //     responseMsg1().opacity(1, 0, easeInCubic),
    // )


    yield* beginSlide("Rsp Dashboard")
    cancel(typingIdle)

    yield* all(
        idleMsg().opacity(0, 0),
        responseMsg2().opacity(1, 0, easeInCubic),
    )

    yield* waitFor(1)


    // RIGHT SIDE DASHBOARD
    yield* beginSlide("Dashboard")

    yield* all(
        group().position.x(-view.width() * 0.7 * 2.4, 2),
        chatGroup().position.x(-view.width() * 0.7 * 2.4, 2),
        sysArchGroup().position.x(-view.width() * 0.7 * 2.4, 2),
        diagramGroup().position.x(-view.width() * 0.7 * 2.4, 2),
        dashboardGroup().position.x(-view.width() * 0.7 * 2.4, 2),
        //group().position.y(-200, 2),
    )



    // BELOW SYSTEM-ARCHITECTURE
    yield* beginSlide("Sys Arch")
    yield* all(
        group().position.y(-view.width() * 0.7, 2),
        chatGroup().position.y(-view.width() * 0.7, 2),
        sysArchGroup().position.y(-view.width() * 0.7, 2),
        diagramGroup().position.y(-view.width() * 0.7, 2),
        dashboardGroup().position.y(-view.width() * 0.7, 2),
        //diagramGroup().position.y(-view.width() * 0.7 * 2.4, 2),
        //group().position.y(-200, 2),
    )

    yield* waitFor(2)

    // BELOW SYSTEM-ARCHITECTURE
    yield* beginSlide("Diagram")
    yield* all(
        group().position.y(-view.width() * 0.7 * 2.4, 2),
        chatGroup().position.y(-view.width() * 0.7 * 2.4, 2),
        sysArchGroup().position.y(-view.width() * 0.7 * 2.4, 2),
        diagramGroup().position.y(-view.width() * 0.7 * 2.4, 2),
        dashboardGroup().position.y(-view.width() * 0.7 * 2.4, 2),
        //diagramGroup().position.y(-view.width() * 0.7 * 2.4, 2),
        //group().position.y(-200, 2),
    )

    yield* waitFor(2)

    yield* beginSlide("END")

    yield* waitFor(1)
})
