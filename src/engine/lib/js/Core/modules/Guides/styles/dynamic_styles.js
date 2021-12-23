import { makeStyle } from "../../../../tools/utils";


export const guides_styles = {



  span_axis_X: (position, color, thickness = 1) => {
    return makeStyle({
      background: `linear-gradient(to bottom,
        transparent 3px,
        ${color} 3px,
        ${color} ${parseInt(thickness) + 3}px,
        transparent ${parseInt(thickness) + 3}px ,
        transparent ${parseInt(thickness) + 5}px
        )`,
      height: `${parseInt(thickness) + 4}px`,
      width: "100%",
      top: `${position}px`,
      position: "absolute",
      
    });
  },

  span_axis_Y: (position, color, thickness = 1) => {

    return makeStyle({
      background: `linear-gradient(to left, 
        transparent 3px,
        ${color} 3px,
        ${color} ${parseInt(thickness) + 3}px,
        transparent ${parseInt(thickness) + 3}px ,
        transparent ${parseInt(thickness) + 5}px
        )`,
      height: "100%",
      width: `${parseInt(thickness)+4}px`,
      left: `${position}px`,
      position: "fixed",
    });
  },

  span_pseudoEl_X_before: (color) => {
    return makeStyle({
      top: "-5px",
      left: "0px",
      "border-top": "8px solid transparent",
      "border-bottom": "8px solid transparent",
      "border-left": `8px solid ${color}`,
    });
  },

  span_pseudoEl_X_after: (color) => {
    return makeStyle({
      top: "-5px",
      right: "0",
      "border-top": "8px solid transparent",
      "border-right": `8px solid ${color}`,
      "border-bottom": "8px solid transparent",
    });
  },

  span_pseudoEl_Y_before: (color) => {
    return makeStyle({
      top: "0",
      right: "-3px",
      "border-top": `8px solid ${color}`,
      "border-right": "8px solid transparent",
      "border-left": "8px solid transparent",
    });
  },

  span_pseudoEl_Y_after: (color) => {
    return makeStyle({
      bottom: "0",
      right: "-3px",
      "border-right": "8px solid transparent",
      "border-bottom": `8px solid ${color}`,
      "border-left": "8px solid transparent",
    });
  },

  
  contextMenu: (X, Y) => {
    return makeStyle({
      left: X,
      top: Y,
    });
  },

}