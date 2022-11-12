import { random, observable } from "./lib.js";
import birds from "./birds.js";

const bird = birds[0][random(0, 5)];

const round = observable({ value: 1 });

console.log(round);
