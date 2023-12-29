"use client";

import Modal from "../../components/ui/modal";
import { UIContext } from "../../context/UIProvider";
import { useContext } from "react";
import styles from "./styles.module.css";

const Help = () => {
  const cellCorrectStyle = ` ${styles.cell} ` + `${styles.correct} `;
  const cellIncorrectStyle = ` ${styles.cell} ` + `${styles.incorrect} `;
  const cellMisplacedStyle = ` ${styles.cell} ` + `${styles.misplaced} `;

  const { showHelpModal, setShowHelpModal } = useContext(UIContext);
  return (
    <div>
      {showHelpModal === true && (
        <Modal handleClose={() => setShowHelpModal(false)}>
          <div className={styles["content-wrapper"]}>
            <h2 className={styles.heading}>How to Play</h2>
            <div className={styles["text-wrapper"]}>
              <p>You have six turns to guess the Españordle.</p>
              <p>
                After each guess, the colour of the tiles changes. For example:
              </p>
              <div className={styles['example-wrapper']}>
              <div className={styles["cell-row"]}>
                <span className={cellCorrectStyle}>F</span>
                <span className={cellMisplacedStyle}>E</span>
                <span className={cellIncorrectStyle}>C</span>
                <span className={cellIncorrectStyle}>H</span>
                <span className={cellMisplacedStyle}>A</span>
              </div>
              <ul className={styles["list"]}>
                <li>The <b>F</b> is in the correct place</li>
                <li>The <b>E</b> and <b>A</b> are in the word at a different location</li>
                <li>The <b>C</b> and <b>H</b> are not in the word</li>
              </ul>
              </div>
            <p>
              After playing you&apos;ll receive the definition and audio for the
              word.
            </p>
            <p>
              Accents are not required for a correct guess, but will be included
              once the word is revealed.
            </p>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Help;
