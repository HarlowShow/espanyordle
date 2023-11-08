"use client";

import styles from "./styles.module.css";
import { useContext, useRef, useEffect } from "react";
import { GameContext } from "../../context/GameProvider";

export default function Toasts() {
  // trigger on a message being added
  // set to null if none?
  const { toastMsg, setToastMsg } = useContext(GameContext);
  const key = crypto.randomUUID()
  const defaultClasses = `${styles.toast} ${styles.hidden}`

  const resetMsg = (() => {
    setToastMsg(null);
  })

  return (
    <div className={styles["toast-wrapper"]}>
      {toastMsg !== null && (
        <div key={key} onAnimationEnd={resetMsg} className={defaultClasses}>
          <span>{toastMsg}</span>
        </div>
      )}
    </div>
  );
}
