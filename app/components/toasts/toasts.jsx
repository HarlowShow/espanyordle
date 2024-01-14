"use client";

import styles from "./Toasts.module.css";
import { useContext, useEffect, useState, memo } from "react";
import { GameContext } from "../../context/GameProvider";

function ToastsImpure() {
  // trigger on a message being added
  const { toastMsg, setToastMsg } = useContext(GameContext);
  const key = crypto.randomUUID();
  const defaultClasses = `${styles.toast} ${styles.hidden}`;

  const throttle = ((callback, delay) => {
    // Returning a throttled version 
  let timerFlag = null;

  return (...args) => {
    if (timerFlag === null) { // If there is no timer currently running
      callback(...args); // Execute the main function 
      timerFlag = setTimeout(() => { // Set a timer to clear the timerFlag after the specified delay
        timerFlag = null; // Clear the timerFlag to allow the main function to be executed again
      }, delay);
    }
  };
  })

  const resetMsg = () => {
    setToastMsg(null);
  };


  return (
    <>
      <div className={styles["toast-wrapper"]}>
        {toastMsg !== null && (
          <div key={key} onAnimationEnd={() => { throttle(resetMsg, 2500)}} className={defaultClasses}>
            <span>{toastMsg}</span>
          </div>
        )}
      </div>
      {/* <div className={styles["static-toast-wrapper"]}>
        <div className={styles["static-toast"]}>
          <span>There&apos;s always tomorrow</span>
        </div>
      </div> */}
    </>
  );
}

const Toasts = memo(ToastsImpure)
export default Toasts
