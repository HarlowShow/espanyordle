import { ZERO_DAY_WORDLE } from "./config";
// import { ZERO_DAY_WORDLE_PLUS_ONE } from "./config";
import { WORDS } from "./words";
import { getGameIndexFromLocalStorage } from "./localstorage";

export const calcIndex = (startDate, currentDate) => {
  // milliseconds in a day
  const dailyMS = 86400000;

  // milliseconds for the start date
  const initTimeStamp = startDate.getTime();
  // get milliseconds for current date if not using Date.now()
  const newTimeStamp =
    typeof currentDate === "number" ? currentDate : currentDate.getTime();

  let diff = 0;

  if (newTimeStamp > initTimeStamp) {
    diff = newTimeStamp - initTimeStamp;
  } else {
    console.warn("error processing date");
  }

  // const hours = Math.floor((diff / 1000 / 60 / 60))

  // get days elapsed, round down
  const days = diff / dailyMS;
  const index = Math.floor(days);

  return index;
};

// get the index for each day
export const getDailyIndex = () => {
  return calcIndex(ZERO_DAY_WORDLE, Date.now());
};

// get the word for each day
export const getDailyWord = () => {
  const index = getDailyIndex();
  // TESTING
  const testIndex = index;
  const word = WORDS[testIndex];

  if (!word) {
    console.warn("something went wrong, word not found");
  } else {
    return word;
  }
};

// if false, returns { isOld: false }
// if true, returns { isOld: true, offSet: number}
export const isGameIndexOld = () => {
  const todaysIndex = getDailyIndex();
  const latestIndex = getGameIndexFromLocalStorage();
  console.log('todays index is: ' + todaysIndex)
  console.log('latest recorded index is: ' + latestIndex)
  return todaysIndex === latestIndex
    ? { isOld: false }
    : { isOld: true, offset: todaysIndex - latestIndex };
};

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

export const checkGuess = (guess, answer) => {
  const SOLVED_CHAR = "✓";

  if (!guess) {
    return null;
  }

  const guessChars = guess.toUpperCase().split("");

  const answerChars = removeAccents(answer);

  const result = [];

  // Step 1: Look for correct letters.
  for (let i = 0; i < guessChars.length; i++) {
    if (guessChars[i] === answerChars[i]) {
      result[i] = {
        letter: guessChars[i],
        status: "correct",
      };
      answerChars[i] = SOLVED_CHAR;
      guessChars[i] = SOLVED_CHAR;
    }
  }

  // Step 2: look for misplaced letters. If it's not misplaced,
  // it must be incorrect.
  for (let i = 0; i < guessChars.length; i++) {
    if (guessChars[i] === SOLVED_CHAR) {
      continue;
    }

    let status = "incorrect";
    const misplacedIndex = answerChars.findIndex(
      (char) => char === guessChars[i]
    );
    if (misplacedIndex >= 0) {
      status = "misplaced";
      answerChars[misplacedIndex] = SOLVED_CHAR;
    }

    result[i] = {
      letter: guessChars[i],
      status,
    };
  }

  return result;
};
