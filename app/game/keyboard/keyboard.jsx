"use client";

import styles from "./Keyboard.module.css";
import React, { useEffect, useContext } from "react";
import { GameContext } from "../../context/GameProvider";
import Key from "./key";
import { BsBackspace } from "react-icons/bs";
import { INIT_KEYS } from "@/app/data/keys";

export default function Input() {
  const { handleKeyboardInput, keys } =
    useContext(GameContext);

  const rowOne = keys.slice(0, 10);
  const rowTwo = keys.slice(10, 20);
  const rowThree = keys.slice(21, 28);
  const enter = keys[20];
  const backspace = keys[28];

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
            <Key id={crypto.randomUUID} key={key} char={key} status={`${styles[status]}`}>
              {key}
            </Key>
          ))}
        </div>
        <div className={styles["keyboard-row"]}>
          {rowTwo.map(({ key, status }) => (
            <Key id={crypto.randomUUID} key={key} char={key} status={`${styles[status]}`}>
              {key}
            </Key>
          ))}
        </div>
        <div className={styles["keyboard-row"]}>
          <Key
            id={crypto.randomUUID}
            key={enter.key}
            char={enter.key}
            status={`${styles[enter.status]}`}
          >
            {enter.key}
          </Key>
          {rowThree.map(({ key, status }) => (
            <Key id={crypto.randomUUID} key={key} char={key} status={`${styles[status]}`}>
              {key}
            </Key>
          ))}
          <Key
            id={crypto.randomUUID}
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
