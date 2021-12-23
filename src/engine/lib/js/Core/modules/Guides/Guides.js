import { Create_guides } from "./Create_guides";
import { createElementFromHTML, debounce, removeUniqueEl } from "./../../../tools/utils";
import { ManageStorage } from "./../../common/Storage/MangageStorage";

export class Guides {
  constructor() {
    this.ctrlKey = null;
    this.shiftKey = null;
    this.controlUser = {
      grab: null,
      move: null,
      hover: null,
    };
    this.currentItem = "";
    this.currentStorage = [];
    this.currentColor = "#FF0000";
    this.showGuides = false;
    this.showContextMenu = false;

    this.UI_body = document.getElementById("UI_body");

    this.create = new Create_guides();
    this.manageStorage = new ManageStorage();

    //Catch event press key

    document.addEventListener("keydown", (e) => {
      e.ctrlKey ? (this.ctrlKey = true) : null;
      e.shiftKey ? (this.shiftKey = true) : null;

      if (this.ctrlKey === true && this.shiftKey === true) {
        if (this.showGuides) {
          this.switch_UI("hidden");
        } else {
          this.switch_UI("show");
        }
      }
    });

    /** When keyControlas null , can't add guides */

    document.addEventListener("keyup", (e) => {
      this.ctrlKey = false;
      this.shiftKey = false;
      this.deleteKey = false;
    });

    /**
     * Trigger addGuides if shift or ctrl as pressed
     * Define the current direction X OR Y
     */
    document.addEventListener("mousedown", (e) => {
      console.log('down')
      //this.showGuides = true;
      this.ctrlKey ? this.add_guides(e, "X") : false;
      this.shiftKey ? this.add_guides(e, "Y") : false;

      if (document.querySelectorAll('[data-type="guides"]').length && this.showGuides) {
        this.switch_UI("show");
      }

      this.ctrlKey = false;
      this.shiftKey = false;
    });

    document.addEventListener("mouseup", (e) => {});

    /** this event is only triggered when the user maintains
     *  the right click on a mark and performs a movement with the mouse */

    document.addEventListener(
      "mousemove",
      debounce((e) => {
        e.preventDefault();
        if (this.controlUser.grab && this.controlUser.move) {
          if (this.currentItem.dataset.direction === "X") {
            this.currentItem.style.top = e.pageY + "px";
            this.currentItem.dataset.position = e.pageY;
            this.inputEl.value = e.pageY;
          } else if (this.currentItem.dataset.direction === "Y") {
            this.currentItem.style.left = e.pageX + "px";
            this.currentItem.dataset.position = e.pageX;
            this.inputEl.value = e.pageX;
          }
        }
      }),
      300
    );

    this.UI_body.addEventListener("contextmenu", (e) => {
      console.log(e)
      if (this.controlUser.hover) {
        e.preventDefault();
        this.getContextMenu = this.create.get_contextMenu(e);
        this.showContextMenu = true;

        this.contextMenu = this.getContextMenu[0];
        this.interactiveElement = this.getContextMenu[1];

        this.UI_body.insertAdjacentElement("afterBegin", this.contextMenu);

        this.interactiveElement.change_thickness.value =
          this.currentItem.dataset.height;

        //add event for interactive of contextMenu

        this.interactiveElement.deleteBtn.addEventListener("click", (e) => {
          this.deleteGuides();
        });

        this.interactiveElement.change_thickness.addEventListener(
          "change",
          (e) => {
            this.changeThickness(e);
          }
        );

        this.interactiveElement.changeColor.addEventListener("change", (e) => {
          this.changeColor_guides(e);
        });

        this.interactiveElement.close_contextMenu.addEventListener(
          "click",
          (e) => {
            this.contextMenu.remove();
          }
        );
      }
    });

    //localStorage.clear()
    this.injectGuidesInStorage();
  }

  /****************************************/
  /****************************************/
  /*****       GUIDES  METHOD         *****/
  /****************************************/
  /****************************************/

  /**
   * @param {*} e
   * @param {string} direction
   */

  add_guides(e, direction) {
    if (direction === "X" || direction === "Y") {
      const elHtml = createElementFromHTML(
        this.create.get_guides(e, direction, this.currentColor, 1)
      );
      this.UI_body.insertAdjacentElement("afterBegin", elHtml);
      this.addGuidesEvent(elHtml);

      this.currentItem = elHtml;

      document.querySelectorAll('[data-type="guides"]').length === 1
        ? this.addUI()
        : null;

      this.inputEl.value = this.currentItem.dataset.position;

      //storage
      this.manageStorage.manage("guides");
      this.defineTerminal(this.currentItem);
    }
  }

  /**
   * @param {HTML_element} item
   */

  addGuidesEvent(item) {
    // Mouse grab
    item.addEventListener("mouseover", (e) => {
      item.style.cursor = "pointer";
      this.controlUser.grab = true;
      this.controlUser.hover = true;
    });

    // Mouse Down
    item.addEventListener("mousedown", (e) => {
      e.preventDefault();

      this.currentItem = item;
      this.inputEl.value = item.dataset.position;
      this.inputEl.focus();

      if (this.showContextMenu) {
        this.interactiveElement.change_thickness.value = item.dataset.height;
      }

      if (this.controlUser.grab) {
        this.controlUser.move = true;
        this.currentItem = item;
        this.defineTerminal(item);
      }
    });

    //Mouse Out

    item.addEventListener("mouseout", (e) => {
      this.controlUser.hover = null;
      if (this.controlUser.grab && this.controlUser.move) {
        this.controlUser.move = true;
      }
    });

    //Mouse up , cancel mouvement of guides

    item.addEventListener(
      "mouseup",
      debounce((e) => {
        this.controlUser.grab = null;
        this.controlUser.move = null;
        this.manageStorage.manage("guides");
      }),
      300
    );
  }

  changeGuidesPosition(e) {
    let intValue = parseInt(e.target.value);
    const direction = this.currentItem.dataset.direction;

    this.currentItem.dataset.position = intValue;

    this.inputEl.value = intValue + "px";

    direction === "X"
      ? (this.currentItem.style.top = intValue + "px")
      : (this.currentItem.style.left = intValue + "px");
  }

  injectGuidesInStorage() {
    if (localStorage.getItem("guides")) {
      const res = JSON.parse(localStorage.getItem("guides"));

      this.currentStorage = [];
      res.forEach((item) => {
        this.currentStorage.push(item);
      });

      const guidesCollection = this.create.deployStorage(
        this.currentStorage,
        this.currentColor
      );

      let injectEl = "";

      guidesCollection.forEach((item, key) => {
        injectEl = createElementFromHTML(item);
        this.addGuidesEvent(injectEl);
        this.UI_body.insertAdjacentElement("afterBegin", injectEl);
        injectEl.style.background = this.makeGradient(
          injectEl.dataset.direction,
          this.currentColor,
          injectEl.dataset.height
        );
      });

      const currentIndex = guidesCollection.length - 1;
      this.currentItem = createElementFromHTML(guidesCollection[currentIndex]);

      this.addUI();

      const allGuides = document.querySelectorAll('[data-type="guides"]');
      const lastIndex = allGuides.length - 1;
      this.defineTerminal(allGuides[lastIndex]);
    }
  }

  /****************************************/
  /****************************************/
  /****       GUIDES UI Method         ****/
  /****************************************/
  /****************************************/

  addUI() {
    const getUI = this.create.get_UI();
    this.UI_body.insertAdjacentElement("afterBegin", getUI[0]);

    this.initUI_event(getUI[1]);

    if (this.currentItem !== "") {
      this.inputEl.value = this.currentItem.dataset.position;
    }
  }

  initUI_event(item) {
    //Cursor position, display in UI
    this.inputEl = item;
    this.inputEl.addEventListener("change", (e) => {
      this.changeGuidesPosition(e);
    });

    this.inputEl.addEventListener("keydown", (e) => {
      this.changeGuidesPositionByKeys(e);
    });
  }

  //Event for User Interface

  //Changes guides position by mouse move
  changeGuidesPosition(e) {
    let initialValue = parseInt(e.target.value);
    const direction = this.currentItem.dataset.direction;

    this.currentItem.dataset.position = initialValue;

    this.inputEl.value = initialValue + "px";

    direction === "X"
      ? (this.currentItem.style.top = initialValue + "px")
      : (this.currentItem.style.left = initialValue + "px");
  }

  //Changes guides position with keyboard arrow

  changeGuidesPositionByKeys(e) {
    let intValue = parseInt(e.target.value);
    const direction = this.currentItem.dataset.direction;

    if (e.key === "ArrowUp") {
      intValue++;
      this.inputEl.value = intValue;
    }
    if (e.key === "ArrowDown") {
      intValue--;
      this.inputEl.value = intValue;
    }

    this.currentItem.dataset.position = intValue;

    direction === "X"
      ? (this.currentItem.style.top = intValue + "px")
      : (this.currentItem.style.left = intValue + "px");
  }

  /****************************************/
  /****************************************/
  /****       TERMINAL METHOD         *****/
  /****************************************/
  /****************************************/

  /**
   * @param {HTML_element} item
   */

  defineTerminal(item) {
    if (this.showContextMenu) {
      //this.interactiveElement.change_thickness.value = item.dataset.height;
    }
    this.removeTerminal();
    const el = this.create.addTerminal(item, this.currentColor);
    item.insertAdjacentElement("afterBegin", el.after);
    item.insertAdjacentElement("afterBegin", el.before);
  }

  removeTerminal() {
    const terminals = document.querySelectorAll('[data-type="terminal"]');
    terminals.forEach((item) => {
      item.remove();
    });
  }

  /****************************************/
  /****************************************/
  /****      CONTEXT MENU METHOD      *****/
  /****************************************/
  /****************************************/

  deleteGuides() {
    this.controlUser.grab ? this.currentItem.remove() : null;
    this.currentItem.remove();
    this.manageStorage.manage("guides");

    if (document.querySelectorAll("[data-type='guides']").length) {
      const allGuides = document.querySelectorAll('[data-type="guides"]');
      const lastIndex = allGuides.length - 1;
      this.currentItem = allGuides[lastIndex];
      this.defineTerminal(this.currentItem);
    }

    //If the last guides as delete

    if (!document.querySelectorAll('[data-type="guides"]').length) {
      //Remove storage
      const UI = document.querySelector('[data-type="UI"]');
      UI.remove();
      localStorage.removeItem("guides");

      if (this.showContextMenu) {
        this.showContextMenu = false
        removeUniqueEl(".contextMenu")
      }

    }

    //Check if user exprience is good
    //this.contextMenu.remove();
  }

  changeThickness(e) {
    const direction = this.currentItem.dataset.offsetby;
    const newVal = e.target.value;
    const newThickness = 4 + parseInt(e.target.value);
    const newGradient = `linear-gradient(
    to ${direction},
    transparent 3px, 
    ${this.currentColor} 3px,
    ${this.currentColor} ${parseInt(newVal) + 3}px,
    transparent ${parseInt(newVal) + 3}px ,
    transparent ${parseInt(newVal) + 5}px)`;

    this.currentItem.dataset.height = newVal;
    this.currentItem.style.background = newGradient;
    direction === "top"
      ? (this.currentItem.style.height = `${parseInt(newThickness)}px`)
      : (this.currentItem.style.width = `${newThickness}px`);

    this.manageStorage.manage("guides");
  }

  changeColor_guides(e) {
    const guidesCollection = document.querySelectorAll('[data-type="guides"]');
    this.currentColor = e.target.value;

    guidesCollection.forEach((item) => {
      item.style.background = this.makeGradient(
        item.dataset.offsetby,
        this.currentColor,
        item.dataset.height
      );
    });

    const terminals = document.querySelectorAll('[data-type="terminal"]');

    terminals.forEach((item) => {
      let borderType = "";

      if (item.dataset.direction === "X") {
        if (item.dataset.el === "before") {
          borderType = "left";
        } else if (item.dataset.el === "after") {
          borderType = "right";
        }
      } else if (item.dataset.direction === "Y") {
        if (item.dataset.el === "before") {
          borderType = "top";
        } else if (item.dataset.el === "after") {
          borderType = "bottom";
        }
      }

      const constructRules = `border-${borderType}`;
      item.style[constructRules] = `8px solid ${this.currentColor}`;
    });
  }

  /****************************************/
  /****************************************/
  /****      UTILS METHOD             *****/
  /****************************************/
  /****************************************/

  makeGradient(direction, color, thickness) {
    const gradient = `transparent 3px, 
  ${color} 3px,
  ${color} ${parseInt(thickness) + 3}px,
  transparent ${parseInt(thickness) + 3}px ,
  transparent ${parseInt(thickness) + 5}px`;

    return `linear-gradient(to ${direction}, ${gradient})`;
  }

  switch_UI(action) {
    if (action === "hidden") {
      this.showGuides = false;

      this.UI_body.style.display = "none";
    } else if (action === "show") {
      this.showGuides = true;

      this.UI_body.style.display = "flex";
    }
  }
}
