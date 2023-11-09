"use client";

import styles from "./styles.module.css";
import { useContext } from "react";
import { GameContext } from "../../context/GameProvider";
import { range } from "../../data/utils";
import Cell from './cell.jsx'

export default function Grid() {
  console.log('grid rendered')
  const { currentGuess, guesses } = useContext(GameContext);
  const guessesRemaining = 5 - guesses.length;
  return (
    <div className={styles["grid-wrapper"]}>
        <div className={styles["grid"]}>

{/* 
          <p className={styles['guess-row']}>
            <Cell delayIdx={0}/>
            <Cell delayIdx={1}/>
          </p> */}



          {guesses.map(({ guess, id, style }) => (
            <p className={styles["guess-row"]} key={id}>
              <Cell className={styles[style[0]]} delayIdx={0}>{guess[0]}</Cell>
              <Cell className={styles[style[1]]} delayIdx={1}>{guess[1]}</Cell>
              <Cell className={styles[style[2]]} delayIdx={2}>{guess[2]}</Cell>
              <Cell className={styles[style[3]]} delayIdx={3}>{guess[3]}</Cell>
              <Cell className={styles[style[4]]} delayIdx={4}>{guess[4]}</Cell>
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