import { createElement } from "../lib.js";
import { createPlayer } from "./player.js";

export const createMystery = (mystery) => {
  const [player, updatePlayer] = createPlayer(mystery.audio);

  const title = createElement("h2", { class: "title", text: "******" });
  const picture = createElement("img", {
    class: "picture",
    src: "./assets/images/mystery.jpg",
    alt: "mystery",
  });

  const card = createElement("div", {
    class: "card card--mystery",
    children: [picture, title, player],
  });

  const update = ({ name, audio, image }) => {
    title.textContent = name;

    fetch(image).then(() => {
      picture.src = image;
      picture.alt = name;
    })

    updatePlayer(audio);
  };

  return [card, update];
};
