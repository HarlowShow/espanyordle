import { removeAccentsString } from '../api/scripts/removeaccents.mjs'
import { ACCEPTED_WORDS } from './wordlist'

export const removeAccents = (answer) => {
  // create a version of the answer with accents removed
  const answerChars = answer.split("");
  const result = [];

  for (let i = 0; i < answerChars.length; i++) {
    switch (answerChars[i]) {
      case "Ú":
        result.push("U");
        break;
      case "É":
        result.push("E");
        break;
      case "Á":
        result.push("A");
        break;
      case "Í":
        result.push("I");
        break;
      case "Ó":
        result.push("O");
        break;
      case "Ü":
        result.push("U");
        break;
      default:
        result.push(answerChars[i]);
    }
  }
  return result;
};


export const isInWordList = ((guess) => {
  const noAccents = removeAccentsString(guess)
  return ACCEPTED_WORDS.includes(noAccents)
})