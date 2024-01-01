"use client";

import { createContext, useState } from "react";
import { initKeys } from "../data/keys.js";
import { getDailyWord, isGameIndexOld } from '../data/helpers.js';
import { getLatestGameState } from '../data/statehelpers.js';
import { checkGuess } from '../data/helpers.js';
import { getGameStateFromLocalStorage, setGameIndexInLocalStorage } from "@/app/data/localstorage";
import { updateStats } from "../data/stats.js";
export const GameContext = createContext();

// const { latestGuesses, latestAnswer } = getGameStateFromLocalStorage()
const answer = getDailyWord()


function GameProvider({ children }) {
  const [keys, setKeys] = useState(initKeys);
  const [currentGuess, setCurrentGuess] = useState("");

  // resets the guesses to zero if the last recorded game is old
    // const latestStoredState = latestGuesses ? latestGuesses : []
    // console.log('latest stored guesses: ' + latestStoredState)
    // const stateToUse = isOld.isOld ? [] : latestStoredState

  // TODO: add back?
  // if (stateToUse.length === 0) {
  //   console.log('found no prev guesses, setting new game index in ls')
  //   setGameIndexInLocalStorage()
  // }

  const [guesses, setGuesses ] = useState(() => {
    const latestState = getGameStateFromLocalStorage()
    const isOld = isGameIndexOld()
    return latestState?.guesses && isOld.isOld === false ? latestState.guesses : []
  })
  const [animationIsDisabled, setAnimationIsDisabled] = useState(true)

  // 'win' | 'lose' | 'in progress'
  // const latestGameState = getLatestGameState(latestGuesses, latestAnswer)
  // TODO add logic back once bug fixed
  const [gameState, setGameState] = useState(() => {
    const latestState = getGameStateFromLocalStorage()
    if (latestState?.guesses && latestState?.answer) {
      const latestGameState = getLatestGameState(latestState.guesses, latestState.answer)
      return latestGameState
    }
    return 'in progress'
  })
  const [toastMsg, setToastMsg] = useState(null)

  const enableAnimation = (() => {
    setAnimationIsDisabled(false)
  })

  const validateGuess = (guess) => {
    if (guess.length !== 5) {
      // put some ui stuff here
      setToastMsg('word must be five letters')
      console.error("guess length must be five");
    } else {
        const styles = []
        const results = checkGuess(guess, answer);
        results.forEach((result) => styles.push(result.status))
        const nextGuess = {
          guess: guess,
          id: crypto.randomUUID(),
          style: styles,
        }
        
        setGuesses([...guesses, nextGuess])
        // enable animation for the latest row
        enableAnimation()
        
        // updateKeys(guess, styles)
        if (guess === answer) {
          console.log('win')
          updateStats(true, guesses.length + 1)
          setGameState('win')
        } else if (guesses.length === 5) {
          console.log('lose')
          updateStats(false, 0)
          setGameState('lose')
        } else {
          // console.log('neither win nor loss triggered')
        }
        setCurrentGuess('')
    }
  };

 

  const handleKeyboardInput = (key) => {

    if (gameState === 'in progress') {
      if (key === "Enter" || key === "ENTER") {
        validateGuess(currentGuess)
      } else if (key === "Backspace" || key === "BACKSPACE") {
          setCurrentGuess(currentGuess.slice(0, -1))
      } else if (currentGuess.length === 5) {
        console.log("word length limit reached");
      } else {
        const nextGuess = `${currentGuess}${key}`;
        setCurrentGuess(nextGuess);
      }
    } else {
      console.log('game state not in progress')
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
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export default GameProvider;
