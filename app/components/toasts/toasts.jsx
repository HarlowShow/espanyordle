"use client";

import styles from "./Toasts.module.css";
import { useContext, useEffect, useState, memo } from "react";
import { GameContext } from "../../context/GameProvider";

function ToastsImpure() {
  // trigger on a message being added
  const { toastMsg, setToastMsg } = useContext(GameContext);
  const key = crypto.randomUUID();
  const defaultClasses = `${styles.toast} ${styles.hidden}`;
  const [showNewToast, setShowNewToast] = useState(true)

  useEffect(() => {
    setShowNewToast(false)
  }, [toastMsg])

  const resetMsg = () => {
    setToastMsg(null);
  };


  return (
    <>
      <div className={styles["toast-wrapper"]}>
        {toastMsg !== null && (
          <div key={key} onAnimationEnd={resetMsg} className={defaultClasses}>
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
