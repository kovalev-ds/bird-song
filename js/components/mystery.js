import { createElement } from "../lib.js";

const calcRatio = (curr, full) => (curr / full) * 100;
const genTimeString = (duration) => {
  const m = Math.floor(duration / 60)
    .toString()
    .padStart(2, "0")
  const s = Math.floor(duration % 60)
    .toString()
    .padStart(2, "0")
  return `${m}:${s}`;
}

export const createMysteryCard = (mystery) => {
  const song = new Audio(mystery.audio);

  song.addEventListener("loadedmetadata", () => {
    timeEnd.textContent = genTimeString(song.duration)
    timeRange.value = calcRatio(song.currentTime, song.duration)
    volumeRange.value = song.volume * 100;
  });

  song.addEventListener("timeupdate", () => {
    timeStart.textContent = genTimeString(song.currentTime)
    timeRange.value = calcRatio(song.currentTime, song.duration)
  });

  song.addEventListener("play", () => {
    button.innerHTML =
      '<svg viewBox="-200 0 1200 1000"><path  d="M96.51 11.97c-31.23 8.05-53.26 32.76-63.42 71.27-3.45 12.84-3.64 29.7-3.64 416.71s.19 403.87 3.64 416.71c16.09 60.74 61.69 86.03 120.9 67.25 9-2.87 53.65-25.1 116.49-58.24 56.14-29.51 221.29-116.3 367.28-192.93 145.99-76.64 271.29-143.31 278.38-148.1 39.28-25.68 59.59-63.04 53.26-97.52-4.79-26.63-24.33-53.07-52.88-71.65C892 399.37 172.58 22.32 154.95 16.38c-18.97-6.33-43.3-8.24-58.44-4.41z"></path></svg>'

  })

  song.addEventListener("pause", () => {
    button.innerHTML =
      '<svg viewBox="0 0 47.607 47.607"><path fill="#00bc8c" d="M17.991 40.976a6.631 6.631 0 01-13.262 0V6.631a6.631 6.631 0 0113.262 0v34.345zM42.877 40.976a6.631 6.631 0 01-13.262 0V6.631a6.631 6.631 0 0113.262 0v34.345z"></path></svg>'
  })

  song.addEventListener("ended", () => {
    console.log('song ended');
  })

  const title = createElement("h2", { class: "card__title", text: "******" })
  const picture = createElement("img", { src: '../assets/images/mystery.jpg', alt: mystery.name })

  const button = createElement('button', {
    class: "player__play-button",
    text: "Play",
    html: '<svg viewBox="-200 0 1200 1000"><path  d="M96.51 11.97c-31.23 8.05-53.26 32.76-63.42 71.27-3.45 12.84-3.64 29.7-3.64 416.71s.19 403.87 3.64 416.71c16.09 60.74 61.69 86.03 120.9 67.25 9-2.87 53.65-25.1 116.49-58.24 56.14-29.51 221.29-116.3 367.28-192.93 145.99-76.64 271.29-143.31 278.38-148.1 39.28-25.68 59.59-63.04 53.26-97.52-4.79-26.63-24.33-53.07-52.88-71.65C892 399.37 172.58 22.32 154.95 16.38c-18.97-6.33-43.3-8.24-58.44-4.41z"></path></svg>',
    events: {
      click: () => {
        song.paused ? song.play() : song.pause();
      }
    }
  })
  const volumeRange = createElement("input", {
    type: "range",
    min: 0,
    max: 100,
    value: 100,
    class: "player-volumeline range",
    events: {
      input: () => {
        song.volume = volume.valueAsNumber / 100
      }
    }
  })

  const timeStart = createElement("div", { text: "00:00" })
  const timeEnd = createElement("div", { text: "00:00" })
  const timeRange = createElement("input", {
    type: "range", min: 0, max: 100, value: "0", class: "range", events: {
      input: () => {
        song.currentTime = (song.duration * timeRange.valueAsNumber) / 100
      }
    }
  })

  const player = createElement('div', {
    class: "player",
    children: [
      button,
      createElement("div", {
        class: "player__timeline", children: [
          timeStart,
          timeRange,
          timeEnd
        ]
      }),
      createElement("div", {
        class: "player__volume",
        children: volumeRange
      }),
    ]
  })

  const html = createElement("div",
    {
      class: "card card--mystery",
      children: [
        picture,
        createElement('div', {
          class: "card__body",
          children: [
            title,
            player
          ]
        })]
    });

  const card = {
    html: html,
    update({ name, image, audio }) {
      title.textContent = name;
      picture.src = image;
      song.src = audio;
      song.currentTime = 0;
      song.pause()
    }
  }

  return card;
}
