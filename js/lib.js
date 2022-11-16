export const random = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

export const makeRequest = ({ url }) => {
  return fetch(url).then((response) => response.json());
};

const listeners = new WeakMap();
const dispatch = Symbol();
const timer = Symbol();

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
      [timer]: null,
      [dispatch](property, value, target) {
        if (listeners.has(obj)) {
          clearTimeout(target[timer]);
          target[timer] = setTimeout(() => {
            listeners
              .get(obj)
              [property].forEach((fn) => fn({ ...target, [property]: value }));
          }, 0);
        }
      },
    },
    {
      set(target, property, value) {
        if (target[property] !== value) {
          target[property] = value;
          target[dispatch](property, value, target);
        }
        return true;
      },
    }
  );
};
