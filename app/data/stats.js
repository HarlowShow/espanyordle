import {
  setStatsInLocalStorage,
  getStatsFromLocalStorage,
} from "./localstorage";
import { getDailyIndex } from "./helpers.js";

// win: true/false
// winDistro: 1-6 | null
const TEST_LAST_PLAYED_IDX = getDailyIndex() - 1

export const updateStats = (hasWon, winDistro, mode) => {
  
  const initStats = {
    played: 0,
    won: 0,
    statsKey: null,
    distro: {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
    },
    lastPlayedIdx: null,
    currentStreak: 0,
    longestStreak: 0,
    currentWinStreak: 0,
    longestWinStreak: 0,
  };


  const todaysIndex = getDailyIndex();
  let currentStats = getStatsFromLocalStorage(mode);

  // fill with the init stats if it's the first game
  if (currentStats === null) {
    currentStats = initStats
    currentStats.statsKey = mode
  }

  const nextPlayed = currentStats.played + 1;
  const nextWon = hasWon === true ? currentStats.won + 1 : currentStats.won;

  let nextCurrentStreak = 0;
  let nextCurrentWinStreak = 0;

  // update the play streak

  // console.log('setting stats: ' + todaysIndex)
  // console.log('last played idx: ' + currentStats.lastPlayedIdx)
  // console.log(typeof todaysIndex)
  // console.log(typeof currentStats.lastPlayedIdx)
  // console.log(`${todaysIndex - 1 === currentStats.lastPlayedIdx}`)
  if (
    typeof currentStats.lastPlayedIdx === 'number' &&
    todaysIndex - 1 === currentStats.lastPlayedIdx
  ) {
    // add one to the streak
    nextCurrentStreak = currentStats.currentStreak + 1;
    console.log('play streak continued! nextCurrentStreak is: ' + nextCurrentStreak)
  } else {
    // or set the streak to one
    console.log('play streak not continued :( setting current streak to 1')
    nextCurrentStreak = 1;
  }

  // update the win streak
  if (
    typeof currentStats.lastPlayedIdx === 'number' &&
    todaysIndex - 1 === currentStats.lastPlayedIdx &&
    hasWon === true
  ) {
    // add one to the streak
    nextCurrentWinStreak = currentStats.currentWinStreak + 1;
    console.log('win streak continued! nextCurrentStreak is: ' + nextCurrentWinStreak)
  } else if (hasWon === true) {
    nextCurrentWinStreak = 1
    console.log('win streak not started today!')
  } else {
    // or set it to zero
    console.log('win streak on zero :(')
    nextCurrentWinStreak = 0;
  }

  // if the new streak is longer than the old one, update it
  const nextLongestStreak =
    currentStats.longestStreak > nextCurrentStreak
      ? currentStats.longestStreak
      : nextCurrentStreak;

  const nextLongestWinStreak =
    currentStats.longestWinStreak > nextCurrentWinStreak
      ? currentStats.longestWinStreak
      : nextCurrentWinStreak;

  // update the win distro
  let nextDistro = currentStats.distro;

  if (hasWon === true && currentStats.statsKey === mode) {
    nextDistro = currentStats.distro;
    nextDistro[winDistro] += 1;
  }

  const nextStats = {
    played: nextPlayed,
    won: nextWon,
    statsKey: currentStats.statsKey,
    distro: nextDistro,
    lastPlayedIdx: todaysIndex,
    currentStreak: nextCurrentStreak,
    longestStreak: nextLongestStreak,
    currentWinStreak: nextCurrentWinStreak,
    longestWinStreak: nextLongestWinStreak,
  };

  setStatsInLocalStorage(nextStats, mode);
};
