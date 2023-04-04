import {makeProject} from '@motion-canvas/core';

import "./global.css";

import logo from "./scenes/ghAction/logo?scene";
import components from "./scenes/ghAction/actionComponents?scene";
import terminal from "./scenes/ghAction/terminal?scene";
import yamlFile from "./scenes/ghAction/yaml?scene";
import titleSlide from "./scenes/xmlxpath/titleSlide?scene";
import xpath from "./scenes/xmlxpath/xpath?scene";
import xquery from "./scenes/xmlxpath/xquery?scene";
import endSlide from "./scenes/xmlxpath/endSlide?scene";

export default makeProject({
    // scenes: [logo, components, terminal, yamlFile],
    scenes: [titleSlide, xpath, xquery, endSlide],
});
