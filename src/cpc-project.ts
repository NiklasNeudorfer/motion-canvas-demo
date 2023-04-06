import {makeProject} from "@motion-canvas/core";
import logo from "./scenes/cpc/logo?scene";
import uiComparison from "./scenes/cpc/ui-comparison?scene";
import "./global.css";

export default makeProject({
    scenes: [logo, uiComparison],
});
