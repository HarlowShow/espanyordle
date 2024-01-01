"use client";

import styles from "./Grid.module.css";
import { useContext, useEffect } from "react";
import { GameContext } from "../../context/GameProvider";
import {
  setGameStateToLocalStorage,
} from "@/app/data/localstorage";
import { range } from "../../data/utils";
import Cell from "./cell.jsx";

export default function Grid() {
  const { currentGuess, guesses, answer } = useContext(GameContext);
  const guessesRemaining = 5 - guesses.length;

  // identify which row is active to enable/disable animation
  const activeIdx = guesses.length - 1;

  let activeGuessStyle = ` ${styles.active} `;

  useEffect(() => {
    // console.log('guesses use effect triggered')
    // save to ls when a guess is added
    setGameStateToLocalStorage(guesses, answer);
  }, [guesses, answer]);

  return (
    <div className={styles["grid-wrapper"]}>
      <div className={styles["grid"]}>
        {guesses.map(({ guess, id, style }, index) => (
          <p className={styles["guess-row"]} key={id}>
            <Cell
              className={styles[style[0]]}
              delayIdx={0}
              index={index}
              activeIdx={activeIdx}
            >
              {guess[0]}
            </Cell>
            <Cell
              className={styles[style[1]]}
              delayIdx={1}
              index={index}
              activeIdx={activeIdx}
            >
              {guess[1]}
            </Cell>
            <Cell
              className={styles[style[2]]}
              delayIdx={2}
              index={index}
              activeIdx={activeIdx}
            >
              {guess[2]}
            </Cell>
            <Cell
              className={styles[style[3]]}
              delayIdx={3}
              index={index}
              activeIdx={activeIdx}
            >
              {guess[3]}
            </Cell>
            <Cell
              className={styles[style[4]]}
              delayIdx={4}
              index={index}
              activeIdx={activeIdx}
            >
              {guess[4]}
            </Cell>
          </p>
        ))}
        {guesses.length <= 5 && (
          <p className={styles["guess-row"]}>
            <span
              className={currentGuess.length > 0 ? activeGuessStyle : undefined}
            >
              {currentGuess[0]}
            </span>
            <span
              className={currentGuess.length > 1 ? activeGuessStyle : undefined}
            >
              {currentGuess[1]}
            </span>
            <span
              className={currentGuess.length > 2 ? activeGuessStyle : undefined}
            >
              {currentGuess[2]}
            </span>
            <span
              className={currentGuess.length > 3 ? activeGuessStyle : undefined}
            >
              {currentGuess[3]}
            </span>
            <span
              className={currentGuess.length > 4 ? activeGuessStyle : undefined}
            >
              {currentGuess[4]}
            </span>
          </p>
        )}
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
