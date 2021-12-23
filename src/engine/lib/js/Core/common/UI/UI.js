import "./styles/menu.scss";
import { createElementFromHTML } from './../../../tools/utils';
import { Drag_event } from './../DragEvent/DragEvent';

const icon = `<svg version="1.1" id="Calque_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
viewBox="0 0 1000 1000" style="enable-background:new 0 0 1000 1000;" xml:space="preserve">
<g>
<path d="M500,240.6c-76.1,0-138.4,62.3-138.4,138.4S423.9,517.4,500,517.4S638.4,455.1,638.4,379
 C638.4,302.8,576.1,240.6,500,240.6z M500,471.2c-50.7,0-92.2-41.5-92.2-92.2s41.5-92.2,92.2-92.2s92.2,41.5,92.2,92.2
 S550.7,471.2,500,471.2z M868.9,378.9C868.9,176,702.9,10,500,10S131.1,176,131.1,378.9c0,87.6,30,168.3,80.7,230.6l0,0l249,359.7
 C470,983,483.9,990,497.7,990s27.7-6.9,36.9-20.8l253.6-359.7l0,0C839,547.3,868.9,466.6,868.9,378.9z M746.7,586.5L500,943.9
 L253.3,586.5c-2.3-2.3-2.3-4.6-4.6-6.9C202.6,522,177.2,452.8,177.2,379c0-177.6,145.3-322.8,322.8-322.8
 c177.6,0,322.8,145.3,322.8,322.8c0,73.8-25.4,143-71.5,200.6C749,581.9,749,584.2,746.7,586.5z"/>
</g>
</svg>`

export class UI {
  constructor() {
    console.log("init_UI");
    this.UI_body();
    this.UI_menu();
    this.dragEvent = new Drag_event();

  }

  UI_body() {
    // Add Terminal view, for inject all HTML element for the project.
    this.UI = createElementFromHTML(
      `<section id="UI_body" class="UI_body"></section>`
    );
    document.body.insertAdjacentElement("beforeBegin", this.UI);
  }

  UI_menu() {
    const menu_STRING = `<nav class="container" draggable="true"><header></header><ul class="menu_content"><li id="guides_icon" class="active">${icon}</li><li>2</li><li>3</li><li>4</li></ul></nav>`;
    const menu = createElementFromHTML(menu_STRING);

    //Add drag event

    menu.addEventListener("dragstart", (e) => {
      this.dragEvent.dragStart(e);
    });
    menu.addEventListener("dragend", (e) => {
      this.dragEvent.dragEnd(e, menu);
    });

    //Inject menu
    this.UI.insertAdjacentElement("afterbegin", menu);
  }
}
