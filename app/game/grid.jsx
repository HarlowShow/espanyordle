"use client";

import styles from "./styles.module.css";
import { useContext } from "react";
import { GameContext } from "../context/GameProvider";
import { range } from "../data/utils";

export default function Grid() {
  const { currentGuess, guesses } = useContext(GameContext);
  const guessesRemaining = 5 - guesses.length;
  return (
    <div className={styles["grid-wrapper"]}>
        <div className={styles["grid"]}>
          {guesses.map(({ guess, id, style }) => (
            <p className={styles["guess-row"]} key={id}>
              <span className={styles[style[0]]}>{guess[0]}</span>
              <span className={styles[style[1]]}>{guess[1]}</span>
              <span className={styles[style[2]]}>{guess[2]}</span>
              <span className={styles[style[3]]}>{guess[3]}</span>
              <span className={styles[style[4]]}>{guess[4]}</span>
            </p>
          ))}
          <p className={styles["guess-row"]}>
            <span>{currentGuess[0]}</span>
            <span>{currentGuess[1]}</span>
            <span>{currentGuess[2]}</span>
            <span>{currentGuess[3]}</span>
            <span>{currentGuess[4]}</span>
          </p>
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
