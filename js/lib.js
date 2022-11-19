export const random = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

export const makeRequest = ({ url }) => {
  return fetch(url).then((response) => response.json());
};

const listeners = new WeakMap();
const dispatch = Symbol();

export const observable = (obj) => {
  return new Proxy(
    {
      ...obj,
      listen(property, fn) {
        if (!listeners.has(obj)) {
          listeners.set(obj, {});
        }

        const watchers = listeners.get(obj);

        if (!watchers[property]) {
          watchers[property] = [];
        }

        watchers[property].push(fn);
      },
      [dispatch](property, value) {
        const watchers = listeners.get(obj);

        watchers[property] &&
          setTimeout(() => {
            watchers[property].forEach((fn) =>
              // try just use this
              fn({ ...this, [property]: value })
            );
          }, 0);
      },
    },
    {
      set(target, property, value) {
        if (target[property] !== value) {
          target[property] = value;
          target[dispatch](property, value);
        }
        return true;
      },
    }
  );
};

export const createElement = (type, options = {}) => {
  const { events, text, html, children, ...attrs } = options;

  const el = document.createElement(type);

  events &&
    Object.keys(events).forEach((key) => {
      el.addEventListener(key, events[key]);
    });

  attrs &&
    Object.keys(attrs).forEach((key) => {
      attrs[key] && el.setAttribute(key, attrs[key]);
    });

  children && Array.isArray(children)
    ? el.append(...children)
    : el.append(children);

  text && (el.textContent = text);
  html && (el.innerHTML = html);

  return el;
};

export const calcRatio = (curr, full) => (curr / full) * 100;
export const formatDuration = (duration) => {
  const m = Math.floor(duration / 60)
    .toString()
    .padStart(2, "0");
  const s = Math.floor(duration % 60)
    .toString()
    .padStart(2, "0");
  return `${m}:${s}`;
};
