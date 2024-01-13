"use client";

import { createContext, useState, useEffect } from "react";
import { INIT_KEYS } from "../data/keys.js";
import { isGameIndexOld, getDailyIndex } from "../data/helpers.js";
import { getLatestGameState } from "../data/statehelpers.js";
import { checkGuess } from "../data/helpers.js";
import {
  getGameStateFromLocalStorage,
  setGameIndexInLocalStorage,
  getStatsFromLocalStorage,
} from "@/data/localstorage";
import { updateStats } from "../data/stats.js";
import { GetDailyWord } from "../lib/supabase/getdailyword";
import { getRandomToast } from "../data/toasts.js";
import { isInWordList } from "../data/wordhelpers.mjs";

export const GameContext = createContext();

function GameProvider({ word, modeParam, children }) {
  // TBC, gonna pass mode to local storage to save easy game in state innit.
  const [isLoading, setIsLoading] = useState(true);
  const answer = word;
  const mode = modeParam === 'easy_index' ? 'easy' : 'daily'
  // console.log('in provider mode is: ' + mode)

  // console.log(answer)

  const [currentGuess, setCurrentGuess] = useState("");

  const [dailyIndex] = useState(getDailyIndex());

  const [lastPlayed, setLastPlayed] = useState(null);

  // console.log("daily index: " + dailyIndex);

  const [guesses, setGuesses] = useState([]);

  useEffect(() => {
    const latestState = getGameStateFromLocalStorage();
    const isOld = typeof window !== "undefined" ? isGameIndexOld() : null;
    const latestGuesses =
      latestState?.guesses && isOld.isOld === false ? latestState.guesses : [];
    setGuesses(latestGuesses);
    // TESTING: disable this
    setIsLoading(false);
  }, []);

  const [animationIsDisabled, setAnimationIsDisabled] = useState(true);

  // 'win' | 'lose' | 'in progress'
 const [gameState, setGameState] = useState(() => {
  const latestState =
    typeof window !== "undefined" ? getGameStateFromLocalStorage() : null;
  if (latestState?.guesses && latestState?.answer && latestState?.answer === answer) {
    const latestGameState = getLatestGameState(
      latestState.guesses,
      latestState.answer
    );
    return latestGameState;
  }
  return "in progress";
});


  const [toastMsg, setToastMsg] = useState(null);

  // X____X
  const getNextKeys = (nextGuesses) => {
    // console.log('next keys callback triggered')
    const newKeys = [];
    const active = new Map();

    // adds the key statuses to a map
    const addToMap = (word, status) => {
      // console.log('add to map function')
      for (let i = 0; i < word.length; i++) {
        const nextKey = word[i];
        const nextStatus = status[i];
        active.set(nextKey, nextStatus);
        // console.log(active)
      }
    };

    // loop through all guesses to update the map
    for (let i = 0; i < nextGuesses.length; i++) {
      const wordToCheck = nextGuesses[i].guess;
      const stylesToCheck = nextGuesses[i].style;
      addToMap(wordToCheck, stylesToCheck);
    }

    // loop through all the keys to update the status
    for (let i = 0; i < INIT_KEYS.length; i++) {
      const oldKey = INIT_KEYS[i];
      const newStatus = active.get(oldKey.key) ?? oldKey.status;
      // console.log('new status for' + oldKey.key + 'is ' + newStatus)
      const nextKey = {
        key: oldKey.key,
        status: newStatus,
      };
      // console.log('next key to push is' + JSON.stringify(nextKey))
      newKeys.push(nextKey);
    }

    return newKeys;
  };

  const [keys, setKeys] = useState(INIT_KEYS);
  useEffect(() => {
    const keys = getNextKeys(guesses);
    setKeys(keys);
  }, [guesses]);

  const enableAnimation = () => {
    setAnimationIsDisabled(false);
  };

  const validateGuess = (guess) => {
    if (guess.length !== 5) {
      // put some ui stuff here
      setToastMsg("word must be five letters");
    } else if (guess.length === 5 && guess !== answer && !isInWordList(guess)) {
      setToastMsg("word not in word list");
    } else {
      const styles = [];
      const results = checkGuess(guess, answer);
      results.forEach((result) => styles.push(result.status));
      const nextGuess = {
        guess: guess,
        id: crypto.randomUUID(),
        style: styles,
      };

      const nextGuesses = [...guesses, nextGuess];

      setGuesses(nextGuesses);
      const nextKeys = getNextKeys(nextGuesses);
      setKeys(nextKeys);
      // TODO: is this the best place to put this?
      if (typeof window !== "undefined") {
        setGameIndexInLocalStorage();
      }
      // enable animation for the latest row
      enableAnimation();
      const { lastPlayedIdx } = getStatsFromLocalStorage();

      // updateKeys(guess, styles)
      if (guess === answer) {
        console.log("setting last played idx to: " + lastPlayedIdx);
        setLastPlayed(lastPlayedIdx);
        console.log("win");
        setGameState("win");
        updateStats(true, guesses.length + 1);
        const toast = getRandomToast("win");
        setToastMsg(toast);
      } else if (guesses.length === 5) {
        console.log("setting last played idx to: " + lastPlayedIdx);
        setLastPlayed(lastPlayedIdx);
        console.log("lose");
        setGameState("lose");
        updateStats(false, 0);
        const toast = getRandomToast("lose");
        setToastMsg(toast);
      } else {
        // console.log('neither win nor loss triggered')
      }
      setCurrentGuess("");
    }
  };

  const handleKeyboardInput = (key) => {
    if (gameState === "in progress") {
      if (key === "Enter" || key === "ENTER") {
        validateGuess(currentGuess);
      } else if (key === "Backspace" || key === "BACKSPACE") {
        setCurrentGuess(currentGuess.slice(0, -1));
      } else if (currentGuess.length === 5) {
        console.log("word length limit reached");
      } else {
        const nextGuess = `${currentGuess}${key}`;
        setCurrentGuess(nextGuess);
      }
    } else {
      console.log("game state not in progress");
    }
  };

  return (
    <GameContext.Provider
      value={{
        keys,
        setKeys,
        currentGuess,
        guesses,
        setGuesses,
        setCurrentGuess,
        validateGuess,
        handleKeyboardInput,
        gameState,
        toastMsg,
        setToastMsg,
        answer,
        enableAnimation,
        animationIsDisabled,
        dailyIndex,
        isLoading,
        lastPlayed,
        mode
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export default GameProvider;
