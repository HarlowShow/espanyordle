"use client";

import { createContext, useState, useEffect } from "react";
import { INIT_KEYS } from "@/data/keys.js";
import { isGameIndexOld, getDailyIndex } from "@/data/helpers.js";
import { getLatestGameState } from "@/data/statehelpers.js";
import { checkGuess } from "@/data/helpers.js";
import {
  getGameStateFromLocalStorage,
  setGameIndexInLocalStorage,
  getStatsFromLocalStorage,
} from "@/data/localstorage";
import { updateStats } from "@/data/stats.js";
import { getRandomToast } from "@/data/toasts.js";
import { isInWordList } from "@/data/wordhelpers.mjs";
import { removeAccentsString } from '@/api/scripts/removeaccents.mjs'

export const GameContext = createContext();

function GameProvider({ word, modeParam, children }) {
  // TBC, gonna pass mode to local storage to save easy game in state innit.
  const [isLoading, setIsLoading] = useState(true);
  const answer = word;
  const answerNoAccents = removeAccentsString(answer)
  const mode = modeParam === 'easy_index' ? 'easy' : 'daily'
  // console.log('in provider mode is: ' + mode)

  // console.log(answer)

  const [currentGuess, setCurrentGuess] = useState("");

  const [dailyIndex] = useState(getDailyIndex());

  const [lastPlayed, setLastPlayed] = useState(null);

  // console.log("daily index: " + dailyIndex);

  const [guesses, setGuesses] = useState([]);

  useEffect(() => {
    const latestState = getGameStateFromLocalStorage(mode);
    const isOld = typeof window !== "undefined" ? isGameIndexOld(mode) : null;
    const latestGuesses =
      latestState?.guesses && isOld.isOld === false ? latestState.guesses : [];
    setGuesses(latestGuesses);
    // TESTING: disable this
    setIsLoading(false);
  }, [mode]);

  const [animationIsDisabled, setAnimationIsDisabled] = useState(true);

  // 'win' | 'lose' | 'in progress'
 const [gameState, setGameState] = useState(() => {
  // TODO come back to this for the accents thing
  const latestState =
    typeof window !== "undefined" ? getGameStateFromLocalStorage(mode) : null;
  console.log(latestState?.guesses)
  if (latestState?.guesses && latestState?.answer && (latestState?.answer === answer || latestState?.guesses.length === 6)) {
    console.log('checking latest game state')
    const latestGameState = getLatestGameState(
      latestState.guesses,
      latestState.answer,
      answer
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
    } else if (guess.length === 5 && guess !== answer && guess !== answerNoAccents && !isInWordList(guess)) {
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
        setGameIndexInLocalStorage(mode);
      }
      // enable animation for the latest row
      enableAnimation();
      const possibleLastPlayedGame = getStatsFromLocalStorage(mode)
      const lastPlayedIdx = possibleLastPlayedGame?.lastPlayedIdx ? possibleLastPlayedGame.lastPlayedIdx : null

      // updateKeys(guess, styles)
      console.log('validating guess. guess was: ' + guess + 'answer was: ' + answer + 'no accents is: ' + answerNoAccents)
      if (guess === answer ||  guess === answerNoAccents) {
        console.log("setting last played idx to: " + lastPlayedIdx);
        if (lastPlayedIdx) {
          setLastPlayed(lastPlayedIdx);
        }
        console.log("win");
        setGameState("win");
        console.log('passing on mode to update stats: ' + mode)
        updateStats(true, guesses.length + 1, mode);
        const toast = getRandomToast("win");
        setToastMsg(toast);
      } else if (guesses.length === 5) {
        console.log("setting last played idx to: " + lastPlayedIdx);
        if (lastPlayedIdx) {
        setLastPlayed(lastPlayedIdx);
        }
        console.log("lose");
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
