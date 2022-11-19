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

// export const createCandidates = (candidates, { onSelect }) => {
//   const items = candidates.map((obj) =>
//     createElement("li", { class: "list__item", text: obj.name })
//   );

//   const list = createElement("ul", {
//     class: "list",
//     events: {
//       click: (e) => {
//         const idx = items.findIndex((el) => el.contains(e.target));
//         idx > -1 && onSelect(idx);
//       },
//     },
//     children: items,
//   });

//   return {
//     html: list,
//     update(candidates, isSolved) {
//       items.forEach((el, i) => {
//         const { id, name, isTried } = candidates[i];

//         el.textContent = name;

//         isSolved
//           ? el.classList.add("success")
//           : !isSolved && isTried
//           ? el.classList.add("error")
//           : el.classList.remove("error", "success");
//       });
//     },
//   };
// };
