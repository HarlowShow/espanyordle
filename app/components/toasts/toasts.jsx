"use client";

import styles from "./Toasts.module.css";
import { useContext, useCallback, memo } from "react";
import { GameContext } from "@/context/GameProvider";

function ToastsImpure() {
  // trigger on a message being added
  const { toastMsg, setToastMsg } = useContext(GameContext);
  const defaultClasses = `${styles.toast} ${styles.hidden}`;


  const resetMsg = () => {
    // console.log("resetting toast message");
    setToastMsg(null);
  };

  const memoizedResetMsg = useCallback(resetMsg, [setToastMsg])

  return (
    <>
      <div className={styles["toast-wrapper"]}>
        {toastMsg !== null && (
          <div
            key={toastMsg}
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
