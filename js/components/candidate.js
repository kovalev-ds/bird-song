import { createElement } from "../lib.js";
import { createPlayer } from "./player.js";

export const createCandidate = () => {

  const [player, updatePlayer] = createPlayer("");

  const title = createElement("h2", { class: "title" });
  const subTitle = createElement("h4", { class: "subtitle" });
  const description = createElement("p", { class: "description" });
  const picture = createElement("img", { class: "picture" });

  const plug = createElement("div", { text: "Послушайте плеер. Выберите птицу из списка" })

  const card = createElement("div", {
    class: "card card--candidate",
    children: [plug],
  });

  const update = (candidate) => {

    if (candidate) {
      title.textContent = candidate.name;
      subTitle.textContent = candidate.species;
      description.textContent = candidate.description;

      picture.src = candidate.image;
      picture.alt = candidate.name;

      fetch(candidate.image).then(() => {
        picture.src = candidate.image;
        picture.alt = candidate.name;
      })

      updatePlayer(candidate.audio)

      if (!card.contains(title)) {
        card.replaceChildren(picture, title, subTitle, player, description);
      }
    } else {
      updatePlayer(null)
      card.replaceChildren(plug);
    }
  };

  return [card, update];
};


