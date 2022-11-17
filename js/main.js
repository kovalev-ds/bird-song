import { random, observable, createElement } from "./lib.js";
import { createMysteryCard } from "./components/mystery.js";
import { createCandidates } from "./components/candidates.js";
import { createButton } from "./components/button.js";

import birds from "./birds.js";

const MAX_CANDIDATES = birds[0].length - 1;
const MAX_ROUNDS = birds.length - 1;
const POINTS_PER_ROUND = 5;
const POINTS_MAX = MAX_ROUNDS * POINTS_PER_ROUND;


const createGame = (matrix, points = 5) => {

  const mapCandidates = (list,) => list.map((item) =>
    ({ ...item, isTried: false }));

  const mystery = matrix[0][random(0, matrix[0].length - 1)]

  const app = observable({
    round: 0,
    score: 0,
    mystery: matrix[0][random(0, matrix[0].length - 1)],
    candidate: null,
    candidates: mapCandidates(matrix[0]),
    isSolved() {
      return this.mystery.id === this.candidate?.id
    },
    countScore() {
      return points - this.candidates.filter((obj) => obj.isTried).length + 1;
    },

  });

  return app;
}

const G_A_M_E = createGame(birds)

G_A_M_E.listen("round", ({ round }) => {
  G_A_M_E.mystery = birds[round][random(0, MAX_CANDIDATES)];
  G_A_M_E.candidates = birds[round].map((item) => ({
    ...item,
    isTried: false,
  }));
  G_A_M_E.candidate = null;
});

G_A_M_E.listen("candidate", ({ candidate, candidates }) => {
  G_A_M_E.candidates = candidates.map((obj) =>
    obj.id === candidate?.id ? { ...obj, isTried: true } : obj
  );

  if (G_A_M_E.isSolved()) {
    G_A_M_E.score += G_A_M_E.countScore();
  }
});

// ==================== UI ========================


const mysteryComponent = createMysteryCard(G_A_M_E.mystery)
const listComponent = createCandidates(G_A_M_E.candidates, {
  onSelect: (idx) => (G_A_M_E.candidate = G_A_M_E.candidates[idx])
})
const nextRoundButton = createButton({
  onClick: () => {
    G_A_M_E.round = G_A_M_E.round >= MAX_ROUNDS ? 0 : G_A_M_E.round + 1
  }
})

const scoreUiBlock = createElement("div", { text: G_A_M_E.score.toString() });

const app = createElement("div", {
  class: "grid grid--app container",
  children: [scoreUiBlock, mysteryComponent.html, listComponent.html, nextRoundButton.html],
});

document.querySelector("#root").append(app);

// ============================= WATCHERS ==============================

G_A_M_E.listen("candidates", ({ candidates }) => {
  listComponent.update(candidates, G_A_M_E.isSolved())
});

G_A_M_E.listen("mystery", ({ mystery }) => {
  G_A_M_E.isSolved()
    ? mysteryComponent.update(mystery)
    : mysteryComponent.update({
      ...mystery,
      name: "******",
      image: "../assets/images/mystery.jpg"
    })
});

G_A_M_E.listen("score", ({ score }) => {
  scoreUiBlock.textContent = score;
});

G_A_M_E.listen("candidate", ({ candidate }) => {
  const isSolved = G_A_M_E.isSolved()
  nextRoundButton.update(isSolved)
  if (isSolved) {
    mysteryComponent.update(candidate)
  }
});
