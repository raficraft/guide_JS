export class Drag_event {
  constructor() {
    this.dragPosition = {
      start: { x: 0, y: 0 },
      end: { x: 0, y: 0 },
    };
  }

  dragStart(e) {
    this.dragPosition.start.x = e.screenX;
    this.dragPosition.start.y = e.screenY;
  }

  dragEnd(e, el) {
    this.dragPosition.end.x = e.screenX;
    this.dragPosition.end.y = e.screenY;

    const origin = {
      x: parseInt(
        getComputedStyle(el, null).getPropertyValue("left").split("px")[0]
      ),
      y: parseInt(
        getComputedStyle(el, null).getPropertyValue("top").split("px")[0]
      ),
    };

    const moveTo = {
      x: this.dragPosition.end.x - this.dragPosition.start.x,
      y: this.dragPosition.end.y - this.dragPosition.start.y,
    };

    el.style.left = origin.x + moveTo.x + "px";
    el.style.top = origin.y + moveTo.y + "px";
    el.style.opacity = 1;
  }
}
