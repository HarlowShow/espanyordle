"use client";

import { createContext, useState } from "react";
import { initKeys } from "../data/keys.js";
import { getAnswer } from '../data/words.js';

export const GameContext = createContext();

function GameProvider({ children }) {
  const [keys, setKeys] = useState(initKeys);
  const [currentGuess, setCurrentGuess] = useState("");
  const [guesses, setGuesses ] = useState([])
  const answer = getAnswer()

  const validateGuess = (guess) => {
    if (guess.length !== 5 || typeof guess !== 'string') {
      // put some ui stuff here
      console.error("guess length must be five");
    } else {
        console.log('guess was: ' + guess, 'answer was: ' + answer)
        const nextGuess = {
          guess: guess,
          id: crypto.randomUUID(),
          styles: []
        }

        setGuesses([nextGuess, ...guesses])
        setCurrentGuess('')
    }
  };

  const handleUIKeyboardInput = (key) => {
    if (key === "Enter") {
      validateGuess(currentGuess);
    } else if (key === "Backspace") {
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
        handleUIKeyboardInput,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export default GameProvider;
