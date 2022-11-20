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
    items.forEach((el, i) => {
      const { name, isTried, isMystery } = candidates[i];

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