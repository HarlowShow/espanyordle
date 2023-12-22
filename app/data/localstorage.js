"use client";

import { isGameIndexOld, getDailyIndex } from "../data/helpers";
const gameStateKey = "gameState";
const statsKey = "stats";
const gameIndexKey = "gameNumber";
const offsetKey = "offset";

export const setGameIndexInLocalStorage = () => {
    // get current index first
    const isOld = isGameIndexOld()
    console.log('is old: ' + isOld)
    // if the index has changed, update the is behind key
    const idx = getDailyIndex()
    if (parsed !== idx) {
        // console.log('days behind: ' + currentIndex - parsed)
        console.log('mismatch')
        console.log('last index: ' + parsed)
        console.log('todays index: ' + idx)
    } else {
        console.log('playing todays game')
    }

    console.log('setting index')
  localStorage.setItem(gameIndexKey, JSON.stringify(idx));
};

export const getGameIndexFromLocalStorage = () => {
  const gameNumber = localStorage.getItem(gameIndexKey);
  return gameNumber ? JSON.parse(gameNumber) : null;
};

export const setGameStateToLocalStorage = (guesses) => {
  // tbc add answer param, probs need to check if the game changes
  const gameState = {
    guesses,
  };

  localStorage.setItem(gameStateKey, JSON.stringify(gameState));
};

export const getGameStateFromLocalStorage = () => {
  // otherwise get game state from local storage
  const state = localStorage.getItem(gameStateKey);
  return state ? JSON.parse(state) : null;
};

export const setStatsInLocalStorage = (stats) => {
  localStorage.setItem(statsKey, JSON.stringify(stats));
};

export const getStatsFromLocalStorage = () => {
  const stats = localStorage.getItem(statsKey);

  return stats ? JSON.parse(stats) : null;
};
