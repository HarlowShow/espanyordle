"use client";

import { getDailyIndex } from "./helpers.js";
const gameStateKey = "gameState";
const easyGameStateKey = "easyGameState";
const statsKey = "statsNew";
const easyStatsKey = "easyStatsNew";

export const setGameStateToLocalStorage = (guesses, answer = "", mode) => {
  const gameState = {
    guesses,
    answer,
  };

  if (mode === "easy") {
    localStorage?.setItem(easyGameStateKey, JSON.stringify(gameState));
  } else if (mode === "daily"){
    localStorage?.setItem(gameStateKey, JSON.stringify(gameState));
  } else {
    console.warn('invalid mode in getGameStateToLocalStorage')
  }
};

export const getGameStateFromLocalStorage = (mode) => {

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
    if (mode === "easy") {
    localStorage?.setItem(easyStatsKey, JSON.stringify(stats));
  } else if (mode === "daily") {
    localStorage?.setItem(statsKey, JSON.stringify(stats));
  } else {
    console.warn('invalid mode in setStatsInLocalStorage')
  }
  // }
};

export const getStatsFromLocalStorage = (mode) => {

  if (mode === "easy") {
    const stats = localStorage?.getItem(easyStatsKey);
    return stats ? JSON.parse(stats) : null;
  } else if (mode === "daily") {
    const stats = localStorage?.getItem(statsKey);
    return stats ? JSON.parse(stats) : null;
  } else {
    console.warn('invalid mode in getStatsFromLocalStorage')
  }

};
