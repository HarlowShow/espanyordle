'use client';
import styles from "./styles.module.css";
import { useEffect, useState } from 'react';

export default function Cell({ className, delayIdx, children }) {
    const [showColor, setShowColor] = useState(false)
  let delay = "zero";
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
        const timeout = setTimeout(() => {
            if (showColor === false) {
                setShowColor(true)
            }
        }, delayIdx * 700)

        return () => clearTimeout(timeout)
    }, [delayIdx, showColor])


  return <span className={style + `${showColor && className}`}>{children}</span>;
}
