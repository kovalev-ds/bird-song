import { createElement } from "../lib.js";
import { createPlayer } from "./player.js";

export const createCandidate = (candidate) => {
  if (!candidate) return;
  const [player] = createPlayer(candidate.audio);

  const title = createElement("h2", { class: "title", text: "******" });
  const picture = createElement("img", {
    class: "picture",
    src: "../assets/images/mystery.jpg",
    alt: "mystery",
  });

  const card = createElement("div", {
    class: "card card--mystery",
    children: [picture, title, player],
  });

  const update = () => {};

  return [card, update];
};

export const createCandidateCard = (candidate) => {
  const title = createElement("h2", { class: "card__title" });
  const picture = createElement("img");

  const content = createElement("div", {
    children: [picture, title],
  });

  const html = createElement("div", {
    class: "card card--candidate",
    children: candidate
      ? content
      : createElement("div", { text: "select bird" }),
  });

  return {
    html,
    update(candidate) {
      console.log(candidate);
    },
  };
};
