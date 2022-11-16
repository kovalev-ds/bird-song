import { random, observable, createElement } from "./lib.js";
import birds from "./birds.js";

const MAX_CANDIDATES = birds[0].length - 1;
const MAX_ROUNDS = birds.length - 1;
const POINTS_PER_ROUND = 5;
const POINTS_MAX = MAX_ROUNDS * POINTS_PER_ROUND;

const G_A_M_E = observable({
  round: 0,
  score: 0,
  mystery: birds[0][random(0, MAX_CANDIDATES)],
  guess: null,
  candidates: birds[0].map((item) => ({ ...item, isTried: false })),
});

G_A_M_E.listen("round", ({ round }) => {
  G_A_M_E.mystery = birds[round][random(0, MAX_CANDIDATES)];
  G_A_M_E.candidates = birds[round].map((item) => ({
    ...item,
    isTried: false,
  }));
  G_A_M_E.guess = null;
});

G_A_M_E.listen("guess", ({ mystery, guess, candidates }) => {
  G_A_M_E.candidates = candidates.map((obj) =>
    obj.id === guess?.id ? { ...obj, isTried: true } : obj
  );

  if (mystery.id === guess?.id) {
    G_A_M_E.score +=
      POINTS_PER_ROUND - candidates.filter((obj) => obj.isTried).length;
  }
});

// ==================== UI ========================
G_A_M_E.listen("candidates", ({ candidates, mystery }) => {
  candidatesUI.forEach((el, i) => {
    el.textContent = candidates[i].name;
    el.style.color =
      candidates[i].id === mystery.id && candidates[i].isTried
        ? "green"
        : candidates[i].isTried
        ? "red"
        : "";
  });
});

G_A_M_E.listen("mystery", (state) => {
  mystery.textContent = state.mystery.name;
});

G_A_M_E.listen("score", ({ score }) => {
  scoreUiBlock.textContent = score;

  // check if score MAX and output result
});

G_A_M_E.listen("guess", ({ guess }) => {
  scoreUiBlock.textContent = score;

  // check if score MAX and output result
});

const candidatesUI = G_A_M_E.candidates.map((item) =>
  createElement("li", { text: item.name })
);

const list = createElement("ul", {
  events: {
    click: (e) => {
      const idx = candidatesUI.findIndex((el) => el.contains(e.target));
      idx > -1 && (G_A_M_E.guess = G_A_M_E.candidates[idx]);
    },
  },
  children: candidatesUI,
});

const button = createElement("button", {
  class: "button",
  text: "next round",
  events: {
    click: () => {
      if (G_A_M_E.mystery.id === G_A_M_E.guess?.id) {
        G_A_M_E.round = G_A_M_E.round >= MAX_ROUNDS ? 0 : G_A_M_E.round + 1;
      }
    },
  },
});

const mystery = createElement("div", { text: G_A_M_E.mystery.name });
const scoreUiBlock = createElement("div", { text: G_A_M_E.score.toString() });

const app = createElement("div", {
  class: "grid grid--app container",
  children: [scoreUiBlock, mystery, list, UI.it, button],
});

// const router = {
//   landing: "",
//   app: "",
//   finish: "",
// };

document.querySelector("#root").append(app);
