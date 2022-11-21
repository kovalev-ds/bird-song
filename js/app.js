import { random, observable } from "./lib.js";

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
    isCompleted: false,
    nextRound() {
      if (this.round === matrix.length - 1) {
        this.isCompleted = true;
        return;
      }

      this.round += 1;
      this.mystery = matrix[this.round][random(0, matrix.length - 1)];
      this.candidates = matrix[this.round].map((item) => ({
        ...item,
        isTried: false,
        isMystery: item.id === this.mystery.id,
      }));
      this.isSolved = false;
      this.candidate = null;
    },
    setCandidate(idx) {
      this.candidate = this.candidates[idx];
      if (!this.isSolved) {
        if (this.mystery.id === this.candidate?.id) {
          this.isSolved = true;
          this.score +=
            points - this.candidates.filter((obj) => obj.isTried).length;
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
      image: "./assets/images/mystery.jpg",
    });
});

app.listen("isSolved", ({ isSolved }) => {
  updateNextEl(isSolved);
});

app.listen("candidate", ({ candidate }) => {
  updateCandidateEl(candidate);
});

app.listen("candidates", ({ candidates }) => {
  updateCandidateEls(candidates);
});

app.listen("score", ({ score }) => {
  scoreEl.textContent = score;
});

app.listen("isCompleted", ({ score, isCompleted }) => {
  localStorage.setItem("state", JSON.stringify({ isCompleted, score }));
  location.href = "./score.html";
});

const [roundEl, updateRoundEls] = createRoundsGroup(rounds);
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
const [candidateEl, updateCandidateEl] = createCandidate(app.candidate);

const scoreEl = document.querySelector(".score");

document
  .querySelector(".grid--app")
  .append(roundEl, mysteryEl, candidateEls, candidateEl, nextEl);
