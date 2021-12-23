
import { guides_styles as styles } from "./styles/dynamic_styles";

import "./styles/guides.scss";
import { createElementFromHTML, removeUniqueEl } from "./../../../tools/utils";
import { Drag_event } from "../../common/DragEvent/DragEvent.js";

export class Create_guides {
  constructor() {
    this.dragEvent = new Drag_event();
  }

  get_guides(e, direction, color, thickness) {
    let nbGuides = 0;
    !document.querySelectorAll('[data-type="guides"]').length
      ? (nbGuides = 0)
      : (nbGuides = document.querySelectorAll('[data-type="guides"]').length);

    let offsetBy = "";
    let position = 0;
    let stylesSpan_Axis = {};

    direction === "X" ? (offsetBy = "top") : (offsetBy = "left");
    direction === "X" ? (position = e.pageY) : (position = e.pageX);
    direction === "X"
      ? (stylesSpan_Axis = styles.span_axis_X(e.pageY, color, 1))
      : (stylesSpan_Axis = styles.span_axis_Y(e.pageX, color, 1));

    const el_STRING = `<span
        class="guides"
        style="${stylesSpan_Axis}"
        data-type="guides"
        data-direction="${direction}"
        data-offsetby="${offsetBy}"
        data-count="${nbGuides++}"
        data-position="${position}"
        data-current="true"
        data-height="1"></span>
      >`;

    return el_STRING;
  }

  addTerminal(item, color) {
    const axis = item.dataset.direction;

    let styles_PseudoEl_Axis = {
      before: "",
      after: "",
    };

    if (axis === "X") {
      styles_PseudoEl_Axis.before = styles.span_pseudoEl_X_before(color);
      styles_PseudoEl_Axis.after = styles.span_pseudoEl_X_after(color);
    } else {
      styles_PseudoEl_Axis.before = styles.span_pseudoEl_Y_before(color);
      styles_PseudoEl_Axis.after = styles.span_pseudoEl_Y_after(color);
    }

    const pseudoEl = {
      before: createElementFromHTML(
        `<span
          class="guides_pseudoEL"
          data-type="terminal" 
          data-direction="${axis}" 
          data-el="before"
          style="${styles_PseudoEl_Axis.before}">
        </span>`
      ),
      after: createElementFromHTML(
        `<span 
          class="guides_pseudoEL"
          data-type="terminal"
          data-direction="${axis}"
          data-el="after"
          style="${styles_PseudoEl_Axis.after}">
        </span>`
      ),
    };

    return pseudoEl;
  }

  get_UI() {
    const UI = createElementFromHTML(
      `<div class="UI_guides__container" data-type="UI">
      <label>X || Y</label>
      <input id="log_guides" value="0" />
    </div>`
    );

    const inputChange = UI.querySelector("input");
    return [UI, inputChange];
  }

  get_contextMenu(e) {
    removeUniqueEl('[data-type="contextmenu"]');

    const X =
      e.pageX > window.innerWidth - 100 ? `${e.pageX - 150}px` : `${e.pageX}px`;

    const Y =
      e.screenY > window.innerHeight - 40 ? `${e.screenY - 40}px` : `${e.screenY}px`;

    const el_STRING = createElementFromHTML(
      `<section class="contextMenu"
        style="${styles.contextMenu(X, Y)}"  
        data-type="contextmenu"
        draggable="true"
        >
        <header>
          <label>Guides</label>
          <div class="close_contextMenu"
            data-action="close_context_menu">
            <span class="cross"></span> 
            <span class="cross"></span> 
          </div>
        </header>
        <div class="contextMenu_content">
          <div class="contextMenu_blocInput">
            <input type="button" id="del_guides" value="delete" data-action="delete_guides"/>
            <label for="del_guides">
              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" xml:space="preserve">
                <g><path d="M723.9,976H276c-61.8,0-112-50.1-112-111.8V276c0-15.5,12.6-28,28-28s28,12.5,28,28v588.2c0,30.7,25.1,55.8,56,55.8h447.9c30.9,0,56.1-25,56.1-55.8V276c0-15.5,12.6-28,28-28c15.4,0,28,12.5,28,28v588.2C836,925.9,785.7,976,723.9,976z"/><path d="M640,808c-15.4,0-28-12.5-28-28V388c0-15.5,12.6-28,28-28c15.5,0,28,12.5,28,28v392C668,795.5,655.4,808,640,808z M500,808c-15.4,0-28-12.5-28-28V388c0-15.5,12.6-28,28-28c15.4,0,28,12.5,28,28v392C528,795.5,515.4,808,500,808z M360,808c-15.5,0-28-12.5-28-28V388c0-15.5,12.5-28,28-28s28,12.5,28,28v392C388,795.5,375.4,808,360,808z M962,220H38c-15.4,0-28-12.5-28-28c0-15.5,12.5-28,28-28h266v-55.9c0-46.4,37.8-84.1,84.2-84.1h223.5c46.5,0,84.2,37.7,84.2,84.1V164h266c15.4,0,28,12.5,28,28C990,207.5,977.4,220,962,220z M360,164h280v-55.9c0-15.5-12.7-28.1-28.2-28.1H388.2c-15.6,0-28.2,12.6-28.2,28.1V164z"/></g>
              </svg>
            </label> 
          </div>
          <hr>
          <div class="contextMenu_blocInput">
            <input type="number" min="1" max="500" max="500" value="1" data-action="change_thickness">
            <label style="${styles.trash_icon}" for="del_guides">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 68.96 75.21"><defs><style>.cls-1{fill:#231f20;}.cls-2{fill:#088c44;}</style></defs><title>icon_thickness</title><g id="Calque_2" data-name="Calque 2"><g id="Calque_1-2" data-name="Calque 1"><path class="cls-1" d="M66.54,26.3,2.49,26c-3.22,0-3.22,5,0,5l64.05.26c3.22,0,3.22-5,0-5Z"/><path class="cls-1" d="M66.47,44.9,2.41,44.64c-3.21,0-3.22,5,0,5l64.06.26c3.22,0,3.22-5,0-5Z"/><path class="cls-1" d="M32.78,2.41l-.07,17.1c0,3.22,5,3.22,5,0l.07-17.1c0-3.21-5-3.22-5,0Z"/><path class="cls-2" d="M39.77,16.34l-4.56,3.17"/><path class="cls-1" d="M38.51,14.18,34,17.35a2.56,2.56,0,0,0-.9,3.42,2.53,2.53,0,0,0,3.42.9L41,18.5a2.56,2.56,0,0,0,.9-3.42,2.52,2.52,0,0,0-3.42-.9Z"/><path class="cls-1" d="M37,17.74l-4.27-3.55a2.57,2.57,0,0,0-3.53,0,2.52,2.52,0,0,0,0,3.54l4.26,3.55a2.58,2.58,0,0,0,3.54,0,2.53,2.53,0,0,0,0-3.54Z"/><path class="cls-1" d="M37.42,72.8l.33-17.09c.06-3.22-4.94-3.22-5,0L32.42,72.8c-.06,3.22,4.94,3.22,5,0Z"/><path class="cls-2" d="M30.64,58.8l4.61-3.09"/><path class="cls-1" d="M31.91,61l4.6-3.09a2.56,2.56,0,0,0,.9-3.42,2.52,2.52,0,0,0-3.42-.9l-4.61,3.1a2.55,2.55,0,0,0-.89,3.42,2.52,2.52,0,0,0,3.42.89Z"/><path class="cls-1" d="M33.48,57.48l4.22,3.61a2.56,2.56,0,0,0,3.53,0,2.53,2.53,0,0,0,0-3.54L37,53.94a2.56,2.56,0,0,0-3.54,0,2.53,2.53,0,0,0,0,3.54Z"/></g></g></svg>
           </label> 
          </div>
          <hr>
          <div class="contextMenu_blocInput">
            <input      
              type="color" data-action="changeColor_guides" value="#ff0000"
            />          
          </div>
        </div>
      </section>`
    );

    const interactionElement = {
      close_contextMenu: el_STRING.querySelector(
        '[data-action="close_context_menu"]'
      ),
      change_thickness: el_STRING.querySelector(
        '[data-action="change_thickness"]'
      ),
      deleteBtn: el_STRING.querySelector('[data-action="delete_guides"]'),
      changeColor: el_STRING.querySelector(
        '[data-action="changeColor_guides"]'
      ),
    };

    el_STRING.addEventListener("dragstart", (e) => {
      this.dragEvent.dragStart(e);
    });

    el_STRING.addEventListener("dragend", (e) => {
      this.dragEvent.dragEnd(e, el_STRING);
    });

    return [el_STRING, interactionElement];
  }

  //Show All Guides in localStorage

  deployStorage(items, color) {
    if (items) {
      let el_STRING = [];
      let nbGuides = 0;

      items.forEach((item) => {
        let stylesSpan_Axis = {};

        item.direction === "X"
          ? (item.offsetBy = "top")
          : (item.offsetBy = "left");
        item.direction === "X"
          ? (stylesSpan_Axis = styles.span_axis_X(
              item.position,
              color,
              item.height
            ))
          : (stylesSpan_Axis = styles.span_axis_Y(
              item.position,
              color,
              item.height
            ));

        el_STRING.push(`<span
            class="guides"
            style="${stylesSpan_Axis}"
            data-type="guides"
            data-direction="${item.direction}"
            data-offsetBy="${item.offsetBy}"
            data-count="${nbGuides++}"
            data-position="${item.position}"
            data-height="${item.height}"
          >
          </span>`);
      });

      return el_STRING;
    }
  }
}
