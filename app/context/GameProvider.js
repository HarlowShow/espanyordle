"use client";

import { createContext, useState } from "react";
import { initKeys } from "../data/keys.js";
import { getAnswer } from '../data/words.js';
import { checkGuess } from '../data/helpers.js';

export const GameContext = createContext();
const answer = getAnswer()

function GameProvider({ children }) {
  const [keys, setKeys] = useState(initKeys);
  const [currentGuess, setCurrentGuess] = useState("");
  const [guesses, setGuesses ] = useState([])
  // 'win' | 'lose' | 'in progress'
  const [gameState, setGameState] = useState('in progress')
  const [toastMsg, setToastMsg] = useState(null)

  const updateKeys = ((word, status) => {
    const nextKeys = [...keys]
    for (let i = 0; i < word.length; i++) {
      const nextKey = word[i]
      const index = nextKeys.map(i => i.key).indexOf(nextKey)
      nextKeys[index].status = status[i]
    }
    setKeys(nextKeys)
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
        updateKeys(guess, styles)
        if (guess === answer) {
          console.log('win')
          setGameState('win')
        } else if (guesses.length === 5) {
          console.log('lose')
          setGameState('lose')
        } else {
          console.log('neither win nor loss triggered')
        }
        setCurrentGuess('')
    }
  };

  const handleKeyboardInput = (key) => {
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
  };

  

  return (
    <GameContext.Provider
      value={{
        keys,
        setKeys,
        currentGuess,
        guesses,
        setCurrentGuess,
        validateGuess,
        handleKeyboardInput,
        gameState,
        toastMsg,
        setToastMsg,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export default GameProvider;
