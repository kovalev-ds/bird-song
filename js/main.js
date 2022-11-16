import { random, observable, createElement } from "./lib.js";
import birds from "./birds.js";

const MAX_CANDIDATES = birds[0].length - 1;
const MAX_ROUNDS = birds.length - 1;

const G_A_M_E = observable({
  round: 0,
  score: 0,
  mystery: birds[0][random(0, MAX_CANDIDATES)],
  guess: null,
  candidates: birds[0],
});

G_A_M_E.listen("round", ({ round }) => {
  G_A_M_E.candidates = birds[round];
  G_A_M_E.mystery = birds[round][random(0, MAX_CANDIDATES)];
});

G_A_M_E.listen("guess", ({ mystery, guess }) => {
  if (mystery.id === guess.id) {
    console.log("you won!!!", mystery, guess);
  } else {
    console.log("no, you lose");
  }
});

G_A_M_E.listen("mystery", (state) => {
  mystery.textContent = state.mystery.name;
});

G_A_M_E.listen("candidates", (state) => {
  candidates.forEach((element, i) => {
    element.textContent = state.candidates[i].name;
  });
});

// UI

document.querySelector(".button")?.addEventListener("click", () => {
  G_A_M_E.round = G_A_M_E.round >= MAX_ROUNDS ? 0 : G_A_M_E.round + 1;
});

const candidates = G_A_M_E.candidates.map((item) =>
  createElement("li", { text: item.name })
);

const list = createElement("ul", {
  events: {
    click: (e) => {
      const idx = candidates.findIndex((el) => el.contains(e.target));
      idx > -1 && (G_A_M_E.guess = G_A_M_E.candidates[idx]);
    },
  },

  children: candidates,
});

const mystery = createElement("div", { text: G_A_M_E.mystery.name });

document.body.append(mystery, list);
