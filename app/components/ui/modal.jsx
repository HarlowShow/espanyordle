"use client";

import styles from "./Modal.module.css";
import { IoClose } from "react-icons/io5";
import IconButton from "./iconbutton";
import FocusLock from "react-focus-lock";
import { RemoveScroll } from "react-remove-scroll";
import { useEffect } from "react";

export default function Modal({ handleClose, title, children }) {
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.code === "Escape") {
        handleClose();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleClose]);

  return (
    <FocusLock returnFocus={true}>
      <RemoveScroll>
        <div className={styles["modal-wrapper"]}>
          <div
            className={styles["modal"]}
            role="dialog"
            aria-modal="true"
            aria-label={title}
          >
            <div className={styles["modal-header"]}>
              <IconButton callback={handleClose} label={"close"}>
                <IoClose aria-hidden="true" focusable="false" />
              </IconButton>
            </div>
            <div className={styles["modal-content"]}>{children}</div>
          </div>
        </div>
      </RemoveScroll>
    </FocusLock>
  );
}
