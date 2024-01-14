"use client";

import { getDailyIndex } from "./helpers.js";
const gameStateKey = "gameState";
const easyGameStateKey = "easyGameState";
const statsKey = "statsNew";
const easyStatsKey = "easyStatsNew";
const gameIndexKey = "gameNumber";
const easyGameIndexKey = "easyGameNumber";
// last game that was either one or lost.
// const lastPlayedKey = "lastPlayed";
// const ISSERVER = typeof window === "undefined";

export const setGameIndexInLocalStorage = (mode) => {
  // console.log('setting game index in local storage');
  const idx = getDailyIndex();
  if (mode === "easy") {
    localStorage?.setItem(easyGameIndexKey, JSON.stringify(idx));
  } else if (mode === "daily"){
    localStorage?.setItem(gameIndexKey, JSON.stringify(idx));
  } else {
    console.warn('invalid mode in setGameIndexInLocalStorage')
  }
  // if (!ISSERVER) {
  // }
};

export const getGameIndexFromLocalStorage = (mode) => {
  // console.log('getting game index from local storage')
  // if (!ISSERVER) {
  if (mode === "easy") {
    const gameNumber = localStorage?.getItem(easyGameIndexKey);
    return gameNumber ? JSON.parse(gameNumber) : null;
  } else if (mode === "daily"){
    const gameNumber = localStorage?.getItem(gameIndexKey);
    return gameNumber ? JSON.parse(gameNumber) : null;
  } else {
    console.warn('invalid mode in getGameIndexFromLocalStorage')
  }
  // }
};

export const setGameStateToLocalStorage = (guesses, answer = "", mode) => {
  // tbc add answer param, probs need to check if the game changes
  // console.log('setting game state to local storage')
  // console.log("setting game state to local storage, answer is: " + answer);
  const gameState = {
    guesses,
    answer,
  };
  // if (!ISSERVER) {
  if (mode === "easy") {
    localStorage?.setItem(easyGameStateKey, JSON.stringify(gameState));
  } else if (mode === "daily"){
    localStorage?.setItem(gameStateKey, JSON.stringify(gameState));
  } else {
    console.warn('invalid mode in getGameStateToLocalStorage')
  }
  // }
};

export const getGameStateFromLocalStorage = (mode) => {
  // console.log('getting game state from local storage')
  // otherwise get game state from local storage
  if (mode === "easy") {
    const state = localStorage?.getItem(easyGameStateKey);
    const latestState = state ? JSON.parse(state) : null;
    return latestState;
  } else if (mode === "daily") {
    const state = localStorage?.getItem(gameStateKey);
    const latestState = state ? JSON.parse(state) : null;
    return latestState;
  } else {
    console.warn('invalid mode in getGameStateFromLocalStorage')
  }
};

export const setStatsInLocalStorage = (stats, mode) => {
  // if (!ISSERVER) {
    if (mode === "easy") {
    // console.log('setting stats from local storage for: ' + mode)
    localStorage?.setItem(easyStatsKey, JSON.stringify(stats));
  } else if (mode === "daily") {
    // console.log('setting stats from local storage for: ' + mode)
    localStorage?.setItem(statsKey, JSON.stringify(stats));
  } else {
    console.warn('invalid mode in setStatsInLocalStorage')
  }
  // }
};

export const getStatsFromLocalStorage = (mode) => {
  // console.log('getting stats from local storage for: ' + mode)
  // if (!ISSERVER) {
  if (mode === "easy") {
    // console.log('setting stats from local storage for: ' + mode)
    const stats = localStorage?.getItem(easyStatsKey);
    return stats ? JSON.parse(stats) : null;
  } else if (mode === "daily") {
    // console.log('setting stats from local storage for: ' + mode)
    const stats = localStorage?.getItem(statsKey);
    return stats ? JSON.parse(stats) : null;
  } else {
    console.warn('invalid mode in getStatsFromLocalStorage')
  }

  // }
};
