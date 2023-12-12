"use client";

import styles from "./styles.module.css";
import { useContext, useEffect } from "react";
import { GameContext } from "../../context/GameProvider";
import { setGameStateToLocalStorage, getGameStateFromLocalStorage } from "@/app/data/localstorage";
import { range } from "../../data/utils";
import Cell from './cell.jsx'

export default function Grid() {

  const { currentGuess, guesses, setGuesses, answer } = useContext(GameContext);
  const guessesRemaining = 5 - guesses.length;

  // useEffect(() => {
  //   console.log('game state got from ls')
  //   const gameState = getGameStateFromLocalStorage()
  //   if (gameState !== null) {
  //     setGuesses(gameState.guesses)
  //   } else {
  //     console.log('game state was null')
  //   }
  // }, [setGuesses])

  useEffect(() => {
    console.log('game state set to ls')
    setGameStateToLocalStorage(guesses)
  }, [guesses])

  return (
    <div className={styles["grid-wrapper"]}>
        <div className={styles["grid"]}>

          {guesses.map(({ guess, id, style }) => (
            <p className={styles["guess-row"]} key={id}>
              <Cell className={styles[style[0]]} delayIdx={0}>{guess[0]}</Cell>
              <Cell className={styles[style[1]]} delayIdx={1}>{guess[1]}</Cell>
              <Cell className={styles[style[2]]} delayIdx={2}>{guess[2]}</Cell>
              <Cell className={styles[style[3]]} delayIdx={3}>{guess[3]}</Cell>
              <Cell className={styles[style[4]]} delayIdx={4}>{guess[4]}</Cell>
            </p>
          ))}
          { guesses.length <= 5 &&
          <p className={styles["guess-row"]}>
            <span>{currentGuess[0]}</span>
            <span>{currentGuess[1]}</span>
            <span>{currentGuess[2]}</span>
            <span>{currentGuess[3]}</span>
            <span>{currentGuess[4]}</span>
          </p>
          }
          {range(guessesRemaining).map((num) => (
            <p className={styles["guess-row"]} key={num}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </p>
          ))}
        </div>
    </div>
  );
}
