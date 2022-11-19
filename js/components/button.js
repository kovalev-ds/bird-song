import { createElement } from "../lib.js";

export const createNextButton = ({ onClick }) => {
  const button = createElement("button", {
    class: "button button--next",
    text: "next round",
    events: {
      click: onClick,
    },
  });

  button.disabled = true;

  const update = (isSolved) => {
    button.disabled = !isSolved;
  };

  return [button, update];
};
