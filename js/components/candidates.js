import { createElement } from "../lib.js";


export const createCandidatesGroup = (group, { onSelect }) => {
  const items = group.map((obj) => createElement("div", { text: obj.name }));

  const list = createElement("div", {
    class: "group group--candidates",
    events: {
      click: (e) => {
        const idx = items.findIndex((el) => el.contains(e.target));
        idx > -1 && onSelect(idx);
      },
    },
    children: items,
  });

  const update = (candidates) => {
    const error = new Audio("./assets/audio/error.mp3")
    const success = new Audio("./assets/audio/win.mp3")

    items.forEach((el, i) => {
      const { name, isTried, isMystery } = candidates[i];

      el.textContent = name;

      if (isTried && isMystery) {
        !el.classList.contains("success") &&
          success.play()
        el.classList.add("success");
      } else if (isTried) {
        !el.classList.contains("error") &&
          error.play()
        el.classList.add("error")
      } else {
        el.classList.remove("success", "error")
      }
    });
  };

  return [list, update];
};