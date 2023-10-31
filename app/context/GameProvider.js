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

  const validateGuess = (guess) => {
    if (guess.length !== 5 || typeof guess !== 'string') {
      // put some ui stuff here
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
        setCurrentGuess('')
    }
  };

  const handleKeyboardInput = (key) => {
    if (key === "Enter" || key === "ENTER") {
      guesses.length < 6 ?
      validateGuess(currentGuess) : console.log('lenght limit reached')
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
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export default GameProvider;
