import { createElement } from "../lib.js";

export const createNextButton = ({ onClick }) => {
  const button = createElement("button", {
    class: "button button--next",
    text: "Следующий раунд",
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
