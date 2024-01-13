"use client";

import { getDailyIndex } from "./helpers.js";
const gameStateKey = "gameState";
const easyGameStateKey = "easyGameState";
const statsKey = "stats";
const gameIndexKey = "gameNumber";
// last game that was either one or lost.
const lastPlayedKey = "lastPlayed";
const ISSERVER = typeof window === "undefined";

export const setGameIndexInLocalStorage = () => {
  // console.log('setting game index in local storage');
  const idx = getDailyIndex();
  // if (!ISSERVER) {
  localStorage?.setItem(gameIndexKey, JSON.stringify(idx));
  // }
};

export const getGameIndexFromLocalStorage = () => {
  // console.log('getting game index from local storage')
  // if (!ISSERVER) {
  const gameNumber = localStorage?.getItem(gameIndexKey);
  return gameNumber ? JSON.parse(gameNumber) : null;
  // }
};

export const setGameStateToLocalStorage = (guesses, answer = "", mode) => {
  // tbc add answer param, probs need to check if the game changes
  // console.log('setting game state to local storage')
  console.log('setting game state to local storage, answer is: ' + answer)
  const gameState = {
    guesses,
    answer,
  };
  // if (!ISSERVER) {
    if (mode === 'easy') {
      localStorage?.setItem(easyGameStateKey, JSON.stringify(gameState));
    } else {
      localStorage?.setItem(gameStateKey, JSON.stringify(gameState));
    }
  // }
};

export const getGameStateFromLocalStorage = () => {
  // console.log('getting game state from local storage')
  // otherwise get game state from local storage
  const state = localStorage?.getItem(gameStateKey);
  const latestState = state ? JSON.parse(state) : null;
  return latestState;
};

export const setStatsInLocalStorage = (stats) => {
  // if (!ISSERVER) {
  localStorage?.setItem(statsKey, JSON.stringify(stats));
  // }
};

export const getStatsFromLocalStorage = () => {
  // if (!ISSERVER) {
  const stats = localStorage?.getItem(statsKey);

  return stats ? JSON.parse(stats) : null;
  // }
};

export const setLastPlayedInLocalStorage = (lastPlayedIdx) => {
  // if (!ISSERVER) {
  localStorage.setItem(lastPlayedKey, JSON.stringify(lastPlayedIdx));
  // }
};

export const getLastPlayedFromLocalStorage = () => {
  // if (!ISSERVER) {
  const lastPlayed = localStorage?.getItem(lastPlayedKey);
  return lastPlayed ? JSON.parse(lastPlayed) : null;
  // }
};
