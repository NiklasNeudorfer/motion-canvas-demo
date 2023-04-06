import "./global.css";
import {makeProject} from "@motion-canvas/core";
import actionComponents from "./scenes/ghAction/actionComponents?scene";
import logo from "./scenes/ghAction/logo?scene";

export default makeProject({
    scenes: [logo, actionComponents],
});
