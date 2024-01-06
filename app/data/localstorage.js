"use client";

import { getDailyIndex } from "../data/helpers";
const gameStateKey = "gameState";
const statsKey = "stats";
const gameIndexKey = "gameNumber";
// last game that was either one or lost.
const lastPlayedKey = "lastPlayed";

export const setGameIndexInLocalStorage = () => {
    // console.log('setting game index in local storage');
    const idx = getDailyIndex()
    localStorage?.setItem(gameIndexKey, JSON.stringify(idx));
};

export const getGameIndexFromLocalStorage = () => {
    // console.log('getting game index from local storage')
  const gameNumber = localStorage?.getItem(gameIndexKey);
  return gameNumber ? JSON.parse(gameNumber) : null;
};

export const setGameStateToLocalStorage = (guesses, answer = '') => {
  // tbc add answer param, probs need to check if the game changes
  const gameState = {
    guesses,
    answer
  };

  localStorage?.setItem(gameStateKey, JSON.stringify(gameState));
};

export const getGameStateFromLocalStorage = () => {
  // otherwise get game state from local storage
  const state = localStorage?.getItem(gameStateKey);
  const latestState = state ? JSON.parse(state) : null;
  return latestState
};

export const setStatsInLocalStorage = (stats) => {
  localStorage?.setItem(statsKey, JSON.stringify(stats));
};

export const getStatsFromLocalStorage = () => {
  const stats = localStorage?.getItem(statsKey);

  return stats ? JSON.parse(stats) : null;
};

export const setLastPlayedInLocalStorage = (lastPlayedIdx) => {
  localStorage.setItem(lastPlayedKey, JSON.stringify(lastPlayedIdx));
}

export const getLastPlayedFromLocalStorage = () => {
  const lastPlayed = localStorage?.getItem(lastPlayedKey);
  return lastPlayed ? JSON.parse(lastPlayed) : null;
};
