import { createElement } from "../lib.js"

export const createCandidates = (candidates, { onSelect }) => {
  const items = candidates.map((obj) =>
    createElement("li", { class: "list__item default", text: obj.name })
  );

  const list = createElement("ul", {
    class: "list",
    events: {
      click: (e) => {
        const idx = items.findIndex((el) => el.contains(e.target));
        idx > -1 && onSelect(idx);
      },
    },
    children: items,
  });

  return {
    html: list,
    update(candidates, isSolved) {
      items.forEach((el, i) => {
        const { name, isTried } = candidates[i];

        el.textContent = name;

        isSolved && isTried
          ? el.classList.add("success")
          : isTried
            ? el.classList.add("error")
            : el.classList.remove("error", "success")

      });
    }
  }
}