import {makeProject} from "@motion-canvas/core";
import logo from "./scenes/cpc/logo?scene";
import uiComparison from "./scenes/cpc/ui-comparison?scene";
import "./global.css";
import title from "./scenes/cpc/title?scene";
import fallingBoxes from "./scenes/cpc/falling-boxes?scene";

export default makeProject({
    scenes: [title, logo,fallingBoxes, uiComparison],
});
