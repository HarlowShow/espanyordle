import {
  setStatsInLocalStorage,
  getStatsFromLocalStorage,
} from "./localstorage";
import { getDailyIndex } from "./helpers.js";

// win: true/false
// winDistro: 1-6 | null

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


  // console.log("UPDATESTATS: has won is: " + hasWon + 'mode is: ' + mode);
  const todaysIndex = getDailyIndex();
  let currentStats = getStatsFromLocalStorage(mode);
  // console.log('updating stats')
  // if (currentStats !== null) {
  //   console.log('UPDATESTATS: current stats are not null, they are: ' + JSON.stringify(currentStats))
  // }

  if (currentStats === null) {
    // console.log("UPDATESTATS: stats assigned for the first time for mode: " + mode);
    currentStats = initStats
    currentStats.statsKey = mode
    // console.log(JSON.stringify(currentStats))
  }
  // update played and hasWon stats
  const nextPlayed = currentStats.played + 1;
  const nextWon = hasWon === true ? currentStats.won + 1 : currentStats.won;

  // if it's zero it means something's gone wrong.
  // TODO make this safer once it's working
  let nextCurrentStreak = 0;
  let nextCurrentWinStreak = 0;

  // check if there's a game played. If so check if it was yesterday's game
  if (
    currentStats.lastPlayedIdx &&
    todaysIndex - currentStats.lastPlayedIdx === 1
  ) {
    // console.log("play streak continued!");
    nextCurrentStreak = currentStats.currentStreak + 1;
  } else {
    nextCurrentStreak = 1;
  }

  if (
    currentStats.lastPlayedIdx &&
    todaysIndex - currentStats.lastPlayedIdx === 1 &&
    hasWon === true
  ) {
    // console.log("win streak continued!");
    nextCurrentWinStreak = currentStats.currentWinStreak + 1;
  } else if (hasWon === true) {
    nextCurrentWinStreak = 1
  } else {
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

  let nextDistro = currentStats.distro;
  if (hasWon === true && currentStats.statsKey === mode) {
    // console.log('UPDATE STATS: updating distro for: ' + winDistro + 'and mode: ' + mode)
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
