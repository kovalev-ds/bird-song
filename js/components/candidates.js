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

  const error = new Audio("../../../assets/audio/error.mp3")
  const success = new Audio("./assets/audio/win.mp3")

  const update = (group) => {

    items.forEach((el, i) => {
      const { name, isTried, isMystery } = group[i];

      el.textContent = name;


      isTried && isMystery
        ? el.classList.add("success")
        : isTried
          ? el.classList.add("error")
          : el.classList.remove("success", "error");
    });
  };

  return [list, update];
};