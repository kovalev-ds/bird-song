import { createElement } from "../lib.js";

export const createRoundsGroup = (rounds) => {
  const group = rounds.map((round, i) =>
    createElement("div", { text: round, class: i === 0 ? "active" : "" })
  );

  const update = (idx) => {
    group.forEach((el, i) => {
      idx === i ? el.classList.add("active") : el.classList.remove("active");
    });
  };

  return [group, update];
};
