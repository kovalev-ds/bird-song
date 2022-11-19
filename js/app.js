import { random, observable, createElement } from "./lib.js";

import { data, rounds } from "./birds.js";
import { createRoundsGroup } from "./components/rounds.js";
import { createNextButton } from "./components/button.js";
import { createCandidatesGroup } from "./components/candidates.js";
import { createMystery } from "./components/mystery.js";
import { createCandidate } from "./components/candidate.js";

const createApp = (matrix, points = 5) => {
  const mystery = matrix[0][random(0, matrix.length - 1)];
  const candidates = matrix[0].map((item) => ({
    ...item,
    isTried: false,
    isMystery: item.id === mystery.id,
  }));

  const app = observable({
    round: 0,
    score: 0,
    mystery,
    candidates,
    candidate: null,
    isSolved: false,
    nextRound() {
      if (this.round === matrix.length - 1) return;

      this.round += 1;
      this.mystery = matrix[this.round][random(0, matrix.length - 1)];
      this.candidates = matrix[this.round].map((item) => ({
        ...item,
        isTried: false,
        isMystery: item.id === this.mystery.id,
      }));
      this.isSolved = false;
    },
    setCandidate(idx) {
      this.candidate = this.candidates[idx];
      if (!this.isSolved) {
        if (this.mystery.id === this.candidate?.id) {
          this.isSolved = true;
          this.score +=
            points - (this.candidates.filter((obj) => obj.isTried).length - 1);
          this.mystery = this.candidate;
        }
        this.candidates = this.candidates.map((obj, i) =>
          idx === i ? { ...obj, isTried: true } : obj
        );
      }
    },
  });

  return app;
};

const app = createApp(data);

app.listen("round", ({ round }) => {
  updateRoundEls(round);
});

app.listen("mystery", ({ isSolved, mystery }) => {
  isSolved
    ? updateMysteryEl(mystery)
    : updateMysteryEl({
        ...mystery,
        name: "******",
        image: "../assets/images/mystery.jpg",
      });
});

app.listen("isSolved", ({ isSolved }) => {
  updateNextEl(isSolved);
});

app.listen("candidate", ({ isSolved, mystery }) => {});

app.listen("candidates", ({ candidates }) => {
  updateCandidateEls(candidates);
});

app.listen("score", ({ score }) => {
  bindings.forEach((el) => {
    if (el.dataset["bind"] === "score") {
      el.textContent = score;
    }
  });
});

const [roundEls, updateRoundEls] = createRoundsGroup(rounds);
const [nextEl, updateNextEl] = createNextButton({
  onClick: () => app.nextRound(),
});
const [candidateEls, updateCandidateEls] = createCandidatesGroup(
  app.candidates,
  {
    onSelect: (idx) => app.setCandidate(idx),
  }
);

const [mysteryEl, updateMysteryEl] = createMystery(app.mystery);
// const [candidateEl, updateCandidateEl] = createCandidate(app.candidate);

document.querySelector(".group--rounds").append(...roundEls);

document.querySelector(".grid--app").append(candidateEls, nextEl);

document.querySelector(".card--mystery").replaceWith(mysteryEl);

document.querySelector(".group--candidates").replaceWith(candidateEls);

const bindings = document.querySelectorAll("[data-bind]");

// console.log(bindings);