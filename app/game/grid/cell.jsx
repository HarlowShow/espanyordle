'use client';
import styles from "./styles.module.css";
import { useEffect, useState, useContext } from 'react';
import { BASE_ANIMATION_DELAY } from '../../data/ui';
import { GameContext } from "../../context/GameProvider";

export default function Cell({ className, delayIdx, children, index, activeIdx }) {
    
    // var to show colour after animation delay
    const [showColor, setShowColor] = useState(false)
    // animation is enabled when the row's index is the latest one 
    // and the var is enabled in the validate guess function
    const { animationIsDisabled } = useContext(GameContext);

    // determine the delay by the letter's index
    let delay = "zero";

  switch (delayIdx) {
    case 0:
      delay = "zero";
      break;
    case 1:
      delay = "one";
      break;
    case 2:
      delay = "two";
      break;
    case 3:
      delay = "three";
      break;
    case 4:
      delay = "four";
      break;
    default:
      console.warn("invalid animation delay index");
  }


    let style = ` ${styles.flip} ` + `${styles[delay]} `;

    useEffect(() => {

        // timeout for the word flip animation effect
        const timeout = setTimeout(() => {
            if (showColor === false) {
                setShowColor(true)
            }
        }, delayIdx * (BASE_ANIMATION_DELAY))

        return () => clearTimeout(timeout)
    }, [delayIdx, showColor])


  return (
    <> {
      index !== activeIdx || animationIsDisabled === true ? 
      <span className={`${className}`}>{children}</span>
      : 
      <span className={style + `${showColor && className}`}>{children}</span>
    }
       
    </>
  )
}
