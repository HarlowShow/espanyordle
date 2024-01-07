import { WORDS } from "../../data/wordhelpers.mjs";
// const util = require('util')

const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const shuffled = shuffle(WORDS);
console.dir(shuffled, { maxArrayLength: null });
