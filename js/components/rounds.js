import { createElement } from "../lib.js";

export const createRoundsGroup = (items) => {
  const rounds = items.map((round, i) =>
    createElement("div", { text: round, class: i === 0 ? "active" : "" })
  );

  const group = createElement("div", { class: "group group--rounds", children: rounds })

  const update = (idx) => {
    rounds.forEach((el, i) => {
      idx === i ? el.classList.add("active") : el.classList.remove("active");
    });
  };

  return [group, update];
};
