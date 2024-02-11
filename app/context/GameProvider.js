"use client";

import { createContext, useState, useEffect } from "react";
import { INIT_KEYS } from "@/data/keys.js";
import { isGameIndexOld, getDailyIndex } from "@/data/helpers.js";
import { getLatestGameState } from "@/data/statehelpers.js";
import { checkGuess } from "@/data/helpers.js";
import {
  getGameStateFromLocalStorage,
} from "@/data/localstorage";
import { updateStats } from "@/data/stats.js";
import { getRandomToast } from "@/data/toasts.js";
import { isInWordList } from "@/data/wordhelpers.mjs";
import { removeAccentsString } from '@/api/scripts/removeaccents.mjs'

export const GameContext = createContext();

function GameProvider({ word, modeParam, children }) {

  const [isLoading, setIsLoading] = useState(true);
  const answer = word;
  const answerNoAccents = removeAccentsString(answer)
  const mode = modeParam === 'easy_index' ? 'easy' : 'daily'

  const [currentGuess, setCurrentGuess] = useState("");
  const [dailyIndex] = useState(getDailyIndex());
  const [guesses, setGuesses] = useState([]);
  const [keys, setKeys] = useState(INIT_KEYS);
  const [toastMsg, setToastMsg] = useState(null);

  // get the latest guesses from local storage
  useEffect(() => {
    const latestState = getGameStateFromLocalStorage(mode);
    const isOld = typeof window !== "undefined" ? isGameIndexOld(mode) : null;
    const latestGuesses =
      latestState?.guesses && isOld.isOld === false ? latestState.guesses : [];
    setGuesses(latestGuesses);
    setIsLoading(false);
  }, [mode]);

  const [animationIsDisabled, setAnimationIsDisabled] = useState(true);

  // 'win' | 'lose' | 'in progress'
 const [gameState, setGameState] = useState(() => {
  const latestState =
    typeof window !== "undefined" ? getGameStateFromLocalStorage(mode) : null;
  if (latestState?.guesses && latestState?.answer && (latestState?.answer === answer || latestState?.guesses.length === 6)) {
    const latestGameState = getLatestGameState(
      latestState.guesses,
      latestState.answer,
      answer
    );
    return latestGameState;
  }
  return "in progress";
});


  // X____X
  const getNextKeys = (nextGuesses) => {
    const newKeys = [];
    const active = new Map();

    // adds the key statuses to a map
    const addToMap = (word, status) => {
      for (let i = 0; i < word.length; i++) {
        const nextKey = word[i];
        const nextStatus = status[i];
        active.set(nextKey, nextStatus);
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
      const nextKey = {
        key: oldKey.key,
        status: newStatus,
      };
      newKeys.push(nextKey);
    }

    return newKeys;
  };


  useEffect(() => {
    const keys = getNextKeys(guesses);
    setKeys(keys);
  }, [guesses]);

  const enableAnimation = () => {
    setAnimationIsDisabled(false);
  };

  const validateGuess = (guess) => {
    if (guess.length !== 5) {
      // check guess length
      setToastMsg("word must be five letters");
    } else if (guess.length === 5 && guess !== answer && guess !== answerNoAccents && !isInWordList(guess)) {
      // check if not in word list
      setToastMsg("word not in word list");
    } else {
      // update state for valid guesses
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
      // enable animation for the latest row
      enableAnimation();

      // trigger win/lose states
      if (guess === answer || guess === answerNoAccents) {
        setGameState("win");
        updateStats(true, guesses.length + 1, mode);
        const toast = getRandomToast("win");
        setToastMsg(toast);
      } else if (guesses.length === 5) {
        setGameState("lose");
        updateStats(false, 0, mode);
        const toast = getRandomToast("lose");
        setToastMsg(toast);
      } else {
        // console.log('neither win nor loss triggered')
      }
      setCurrentGuess("");
    }
  };

  // one function to handle all input
  const handleKeyboardInput = (key) => {
    if (gameState === "in progress") {
      if (key === "Enter" || key === "ENTER") {
        validateGuess(currentGuess);
      } else if (key === "Backspace" || key === "BACKSPACE") {
        setCurrentGuess(currentGuess.slice(0, -1));
      } else if (currentGuess.length === 5) {
        return
      } else {
        const nextGuess = `${currentGuess}${key}`;
        setCurrentGuess(nextGuess);
      }
    } else {
      return;
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
        mode
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export default GameProvider;
