import {makeProject} from "@motion-canvas/core";
import logo from "./scenes/cpc/logo?scene";
import uiComparison from "./scenes/cpc/ui-comparison?scene";
import "./global.css";
import title from "./scenes/cpc/title?scene";
import fallingBoxes from "./scenes/cpc/falling-boxes?scene";
import enomicsDiagram from "./scenes/cpc/enomics-diagram?scene";
import simpleTitle from "./scenes/cpc/simpleTitle?scene";

export default makeProject({
    scenes: [title, logo, enomicsDiagram, uiComparison],
});
