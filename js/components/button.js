import { createElement } from "../lib.js";

export const createButton = ({ onClick }) => {
  const button = createElement("button", {
    class: "button",
    text: "next round",
    events: {
      click: onClick,
    },
  });

  button.disabled = true;

  return {
    html: button,
    update(isSolved) {
      button.disabled = !isSolved
    }
  }
}