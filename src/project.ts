import {makeProject} from '@motion-canvas/core';

import logo from "./scenes/logo?scene";
import ghactions from "./scenes/ghActionsComponents?scene";
import "./global.css"

export default makeProject({
  scenes: [logo,ghactions],
  //scenes: [sinfunction]
});
