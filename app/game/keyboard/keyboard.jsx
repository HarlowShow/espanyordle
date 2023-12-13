"use client";

import styles from "./styles.module.css";
import React, { useEffect, useContext } from "react";
import { GameContext } from "../../context/GameProvider";
import Key from "./key";
import { BsBackspace } from "react-icons/bs";

export default function Input() {
  const { keys, setKeys, handleKeyboardInput, guesses } =
    useContext(GameContext);
  const rowOne = keys.slice(0, 10);
  const rowTwo = keys.slice(10, 20);
  const rowThree = keys.slice(21, 28);
  const enter = keys[20];
  const backspace = keys[28];
  const nextKeys = keys;

  // update keys for each word
  const updateKeys = (word, status) => {
    const nextKeys = [...keys];
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
    updateKeys(wordToCheck, stylesToCheck);
  }

  useEffect(() => {
    setKeys(nextKeys);

  }, [setKeys, nextKeys])

  useEffect(() => {
    const handleInput = (event) => {
      const key = event.key.toUpperCase();
      const checkLetters = /[a-záéíóúüñA-ZÁÉÍÓÚÜÑ]+/i;
      if (
        (key.match(checkLetters) && key.length === 1) ||
        key === "ENTER" ||
        key === "BACKSPACE"
      ) {
        handleKeyboardInput(key);
      } else {
        console.warn("unsuitable keyboard input");
      }
    };

    window.addEventListener("keydown", handleInput);

    return () => {
      window.removeEventListener("keydown", handleInput);
    };
  }, [handleKeyboardInput]);
  return (
    <div className={styles["keyboard-wrapper"]}>
      <div className={styles["keyboard"]}>
        <div className={styles["keyboard-row"]}>
          {rowOne.map(({ key, status }) => (
            <Key key={key} char={key} status={`${styles[status]}`}>
              {key}
            </Key>
          ))}
        </div>
        <div className={styles["keyboard-row"]}>
          {rowTwo.map(({ key, status }) => (
            <Key key={key} char={key} status={`${styles[status]}`}>
              {key}
            </Key>
          ))}
        </div>
        <div className={styles["keyboard-row"]}>
          <Key
            key={enter.key}
            char={enter.key}
            status={`${styles[enter.status]}`}
          >
            {enter.key}
          </Key>
          {rowThree.map(({ key, status }) => (
            <Key key={key} char={key} status={`${styles[status]}`}>
              {key}
            </Key>
          ))}
          <Key
            key={backspace.key}
            char={backspace.key}
            status={`${styles[backspace.status]}`}
          >
            <BsBackspace />
          </Key>
        </div>
        <div className={styles["keyboard-row"]}></div>
      </div>
    </div>
  );
}
