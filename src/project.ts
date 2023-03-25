import {makeProject} from '@motion-canvas/core';

import "./global.css";

import logo from "./scenes/ghAction/logo?scene";
import components from "./scenes/ghAction/actionComponents?scene";
import terminal from "./scenes/ghAction/terminal?scene";
import yamlFile from "./scenes/ghAction/yaml?scene";

export default makeProject({
    scenes: [logo, components, terminal, yamlFile],
    //scenes: [sinfunction]
});
