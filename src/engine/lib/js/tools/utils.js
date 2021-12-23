export const createElementFromHTML = (htmlString) => {
  const div = document.createElement("div");
  div.innerHTML = htmlString.trim();

  // Change this to div.childNodes to support multiple top-level nodes
  return div.firstChild;
};

export const debounce = (callback, delay) => {
  let timer;
  return function () {
    let args = arguments;
    let context = this;
    clearTimeout(timer);
    timer = setTimeout(function () {
      callback.apply(context, args);
    }, delay);
  };
};

export function makeStyle(array) {
  let style = "";

  for (const key in array) {
    if (Object.hasOwnProperty.call(array, key)) {
      const element = array[key];
      style += `${key} : ${element}; `;
    }
  }

  return style;
}

export const removeUniqueEl = (selector) => {
  const removeThis = document.querySelector(selector);
  if (removeThis) {
    removeThis.remove();
  }
};

/**
 *
 * @param {object} args
 * @param {HTMLElement} args.el
 * @param {String} args.action  refers to a pseudo css selector :hover :focus :active
 * @param {object} args.css  css properties and value
 * @param {Boolean} args.preventDefault
 * @param {object} args.next
 *
 *  How it work the next argument
 *  the next args may be needed, for example with the event active.
 *  Because if a hover event is planned, the new active event will remain the hover.
 *  We can use the next argument to reapply the css at the end of the active event
 *
 */

export const changeStylesEvent = (args) => {
  const initialCss = getComputedStyle(args.el).cssText;

  const { el, action, css, preventDefault = true, next } = { ...args };
  

  let fired = "";
  let reset = "";

  if (action && action === "hover") {
    fired = "mouseover";
    reset = "mouseout";
  }

  if (action && action === "focus") {
    fired = "focus";
    reset = "focusout";
  }

  if (action && action === "active") {
    fired = "mousedown";
    reset = "mouseup";
  }

  el.addEventListener(fired, (e) => {
    if (preventDefault) {
      e.preventDefault();
    }

    console.log("????");

    for (const key in css) {
      if (Object.hasOwnProperty.call(css, key)) {
        const element = css[key];
        //define new styles
        el.style[key] = element;
      }
    }
  });
  el.addEventListener(reset, (e) => {
    if (preventDefault) {
      e.preventDefault();
    }
    // replace all initial css properties
    el.style.cssText = initialCss;

    if (next) {
      for (const key in next) {
        if (Object.hasOwnProperty.call(next, key)) {
          const element = next[key];
          //define new styles if element is hover
          el.style[key] = element;
        }
      }
    }
  });
};
