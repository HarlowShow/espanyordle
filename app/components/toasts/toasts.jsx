"use client";

import styles from "./Toasts.module.css";
import { useContext, useCallback, useState, memo } from "react";
import { GameContext } from "../../context/GameProvider";

function ToastsImpure() {
  // trigger on a message being added
  const { toastMsg, setToastMsg } = useContext(GameContext);
  const key = crypto.randomUUID();
  const defaultClasses = `${styles.toast} ${styles.hidden}`;
  const [shouldWait, setShouldWait] = useState(false)

  // const throttle = (callback, delay) => {
  //   console.log("throttlin");

  //     if (shouldWait === true) {
  //       console.log('should wait')
  //       return;
  //     } else {
  //       console.log("doing callback");
  //       setShouldWait(true);
  //       setTimeout(() => {
  //         callback();
  //         setShouldWait(false);
  //       }, delay);
  //     }
  // };

  const resetMsg = () => {
    console.log("resetting toast message");
    setToastMsg(null);
  };

  const memoizedResetMsg = useCallback(resetMsg, [setToastMsg])

  return (
    <>
      <div className={styles["toast-wrapper"]}>
        {toastMsg !== null && (
          <div
            key={toastMsg}
            // onAnimationStart={() => {
            //   throttle(resetMsg, 2500);
            // }}
            onAnimationEnd={memoizedResetMsg}
            className={defaultClasses}
          >
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

const Toasts = memo(ToastsImpure);
export default Toasts;
