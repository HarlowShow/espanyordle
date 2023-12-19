"use client";

import { getDailyIndex } from "../data/helpers";
const gameStateKey = "gameState";
const statsKey = "stats";
const gameNumberKey = "gameNumber";

export const setGameNumberInLocalStorage = (() => {
    const idx = getDailyIndex();
    localStorage.setItem(gameNumberKey, JSON.stringify(idx))
})

export const getGameNumberFromLocalStorage = (() => {
    const gameNumber = localStorage.getItem(gameNumberKey);
    return gameNumber ? JSON.parse(gameNumber) : null;
})

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

