import { random, observable } from "./lib.js";
import birds from "./birds.js";

// const bird = birds[0][random(0, 5)];

const MAX_CANDIDATES = birds[0].length - 1;

const G_A_M_E = observable({
  round: 0,
  score: 0,
  mystery: birds[0][random(0, MAX_CANDIDATES)],
  guess: null,
  candidates: birds[0],
});

G_A_M_E.listen("round", ({ round }) => {
  console.log(round);
  G_A_M_E.candidates = birds[round];
  G_A_M_E.mystery = birds[round][random(0, MAX_CANDIDATES)];
});

G_A_M_E.listen("score", () => {
  console.log("score");
});

G_A_M_E.listen("mystery", (state) => {
  console.log("mystery", state);
});

G_A_M_E.listen("candidates", () => {
  console.log("candidates");
});

document.querySelector("#next")?.addEventListener("click", () => {
  G_A_M_E.round += 1;
});
