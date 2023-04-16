import "./global.css";
import titleSlide from "./scenes/xmlxpath/titleSlide?scene";
import xpath from "./scenes/xmlxpath/xpath?scene";
import xquery from "./scenes/xmlxpath/xquery?scene";
import endSlide from "./scenes/xmlxpath/endSlide?scene";
import xsd from "./scenes/xmlxpath/xsd?scene";
import {makeProject} from "@motion-canvas/core";
import dtd from "./scenes/xmlxpath/dtd?scene";

export default makeProject({
    scenes: [titleSlide, xpath, xquery, dtd, xsd, endSlide],
});

