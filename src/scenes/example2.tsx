// import {makeScene2D} from '@motion-canvas/2d/lib/scenes';
// import {createRef, range} from '@motion-canvas/core/lib/utils';
// import {all, waitFor} from '@motion-canvas/core/lib/flow';
// import {Circle, Line, Rect, Txt} from "@motion-canvas/2d/lib/components";
// import {easeInBounce, easeInCubic, easeInOutCubic, map, tween} from "@motion-canvas/core/lib/tweening";
// import {Direction, Vector2} from "@motion-canvas/core/lib/types";
// import {createSignal} from "@motion-canvas/core/lib/signals";
// import {slideTransition} from "@motion-canvas/core/lib/transitions";
// import {CodeBlock, lines} from "@motion-canvas/2d/lib/components/CodeBlock";
//
// export default makeScene2D(function* (view) {
//
//     const container = createRef<Rect>()
//     const codeGhAction = createRef<CodeBlock>()
//
//     yield* view.add(
//         <Rect ref={container}
//               radius={10}
//               height={700}
//               width={1000}
//               fill={'rgba(36,36,36,0.68)'}
//               shadowColor={() => '#000'}
//               x={() => view.width() / -2 + container().width()}
//         >
//             <CodeBlock
//                 ref={codeGhAction}
//                 x={() => container().width() / -2 + codeGhAction().width()/1.8}
//                 y={0}
//                 fontSize={28}
//                 width={660}
//                 height={660}
//                 code={`
// name: learn-github-actions
// run-name: \${{ github.actor }} is learning GitHub Actions
// on: [push]
// jobs:
//   check-bats-version:
//     runs-on: ubuntu-latest
//     steps:
//       - uses: actions/checkout@v3
//       - uses: actions/setup-node@v3
//         with:
//           node-version: '14'
//       - run: npm install -g bats
//       - run: bats -v
//                 `}
//                 language={'yaml'}
//             />
//
//         </Rect>
//     );
//
//     yield* slideTransition(Direction.Right);
//
//
//
//     yield* all(
//         container().position.x(0,1),
//         container().position.y(0,1),
//
//         codeGhAction().position.x(100,1),
//         codeGhAction().position.y(100,1),
//
//         container().radius([0,0,0,0],1),
//
//         container().width(view.width(), 1),
//         container().height(view.height(), 1),
//         codeGhAction().width(view.width(), 1),
//         codeGhAction().height(view.height(), 1),
//     )
//
//
//     yield* codeGhAction().selection(lines(1,1), 1)
// });
