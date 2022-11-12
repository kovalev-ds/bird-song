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
      listen(fn) {
        if (!listeners.has(obj)) {
          listeners.set(obj, []);
        }
        listeners.get(obj).push(fn);
      },
      [dispatch](property, value) {
        if (listeners.has(obj)) {
          listeners.get(obj).forEach((fn) => fn({ ...obj, [property]: value }));
        }
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
