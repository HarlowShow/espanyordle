"use client";

import { createContext, useState } from "react";
import { INIT_KEYS, KEYS } from "../data/keys.js";
import { getDailyWord, isGameIndexOld, getDailyIndex } from '../data/helpers.js';
import { getLatestGameState } from '../data/statehelpers.js';
import { checkGuess } from '../data/helpers.js';
import { getGameStateFromLocalStorage, setGameIndexInLocalStorage } from "@/app/data/localstorage";
import { updateStats } from "../data/stats.js";
import cloneDeep from 'lodash.clonedeep';
export const GameContext = createContext();

const answer = getDailyWord()


function GameProvider({ children }) {
  const test = cloneDeep(INIT_KEYS)
  // console.log(test)

  const [currentGuess, setCurrentGuess] = useState("");
  
  const [dailyIndex] = useState(getDailyIndex())
  console.log('daily index: ' + dailyIndex)
  
  const [guesses, setGuesses ] = useState(() => {
    const latestState = getGameStateFromLocalStorage()
    const isOld = isGameIndexOld()
    return latestState?.guesses && isOld.isOld === false ? latestState.guesses : []
  })
  const [animationIsDisabled, setAnimationIsDisabled] = useState(true)
  


  // 'win' | 'lose' | 'in progress'
  const [gameState, setGameState] = useState(() => {
    const latestState = getGameStateFromLocalStorage()
    if (latestState?.guesses && latestState?.answer) {
      const latestGameState = getLatestGameState(latestState.guesses, latestState.answer)
      return latestGameState
    }
    return 'in progress'
  })

  const [toastMsg, setToastMsg] = useState(null)

  // TODO rewrite using map or something bcus mutability issue
  const getNextKeys = (() => {
    // console.log('next keys callback triggered')
    const isOld = isGameIndexOld()
    console.log('init keys, Q is ' + INIT_KEYS[0].status)
    if (isOld.isOld) {
      console.log('returning init keys as keys')
      const initKeys = [...INIT_KEYS];
      return initKeys
    } else {
      // update keys for a single word
      const nextKeys = [...test]
      const updateKeysForWord = (word, status) => {
        for (let i = 0; i < word.length; i++) {
          const nextKey = word[i];
          const index = nextKeys.map((i) => i.key).indexOf(nextKey);
          if (nextKeys[index].status === "default") {
            nextKeys[index].status = status[i];
          }
        }
      };
      // loop through all guesses to update keys
      for (let i = 0; i < guesses.length; i++) {
        const wordToCheck = guesses[i].guess;
        const stylesToCheck = guesses[i].style;
        updateKeysForWord(wordToCheck, stylesToCheck);
      }
      return nextKeys;
    }
  })

  const [keys, setKeys] = useState(getNextKeys())
  const [newKeys, setNewKeys] = useState(() => {
    return Array.from(KEYS)
  })

  console.log('new keys: ' + newKeys)

  const updateKeys = (() => {
    const next = getNextKeys()
    setKeys(next)
  })


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
        updateKeys()
        // TODO: is this the best place to put this?
        setGameIndexInLocalStorage()
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
        dailyIndex,
        newKeys
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export default GameProvider;
