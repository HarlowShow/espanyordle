'use client';
import styles from "./styles.module.css";
import { useEffect, useState, useContext } from 'react';
import { BASE_ANIMATION_DELAY } from '../../data/ui';

export default function Cell({ className, delayIdx, children, index, activeIdx }) {
    
    const [showColor, setShowColor] = useState(false)
    console.log('index: ' + index)
    console.log('active index: ' + activeIdx)

    let delay = "zero";
    const disableAnimation = true
  // just do a combined class with the delay and colour

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
      index !== activeIdx ? 
      <span className={`${className}`}>{children}.</span>
      : 
      <span className={style + `${showColor && className}`}>{children}</span>
    }
       
    </>
  )
}
