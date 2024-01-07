import { ZERO_DAY_WORDLE } from "./config";
import { removeAccents } from './wordhelpers.mjs'
// import { ZERO_DAY_WORDLE_PLUS_ONE } from "./config";
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

// if false, returns { isOld: false }
// if true, returns { isOld: true, offSet: number}
export const isGameIndexOld = () => {
  const todaysIndex = getDailyIndex();

  const latestIndex =
    typeof window !== "undefined" ? getGameIndexFromLocalStorage() : null;
  // console.log('todays index is: ' + todaysIndex)
  // console.log('latest recorded index is: ' + latestIndex)
  return todaysIndex === latestIndex
    ? { isOld: false }
    : { isOld: true, offset: todaysIndex - latestIndex };
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

export const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};
