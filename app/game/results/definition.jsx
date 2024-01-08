import IconButton from "../../components/ui/iconbutton";
import { GameContext } from "../../context/GameProvider";
import { AiFillSound } from "react-icons/ai";
import styles from "./Results.module.css";
import { useRef, useContext } from "react";

const Definition = ({ newWordData }) => {
  const testing = true
  const { gameState } = useContext(GameContext);
  const audioRef = useRef(null);

  const newWord = newWordData.word
  const newMainDef = newWordData.maindef
  const newAudio = newWordData.audio_url ?? null
  const newExamples = newWordData.examples || null
  // should check for string length here
  const newOtherDefs = newWordData.other_defs 

  const playAudio = () => {
    audioRef.current.play();
  };

  return (
    <div className={styles["content-wrapper"]}>
      <h2 className={styles["heading"]}>Today&apos;s Word</h2>
      {gameState !== "in progress" || testing === true ? (
        <>
        { testing === true && <span>*results testing mode</span>}
          <div className={styles["inline"]}>
            <h3 className={styles["definition"]}> {newWord.toLowerCase()}</h3>
            {newAudio && (
              <IconButton callback={playAudio}>
                <audio ref={audioRef} src={newAudio}></audio>
                <AiFillSound className={styles["icon-button"]} />
              </IconButton>
            )}
          </div>
          <div className={styles["inline"]}>
            {newWordData.maindef && (
              <h3 className={`${styles.definition} ${styles.green}`}>
                {newMainDef}
              </h3>
            )}
          </div>
          <div className={styles['can-also-mean']}>{
            newOtherDefs && newOtherDefs !== '' &&
            <>
            <span>Can also mean:{" "}</span><span>{newOtherDefs}</span>
            </>
            }
          </div>
          {newExamples && newExamples.length > 0 && (
            <div>
                <div>
                  {newExamples.map(({ english, spanish }) => (
                    <div key={english}>
                      <span className={`${styles.example}`}>{spanish}</span>
                      <span className={`${styles.example} ${styles.light}`}>
                        {" "}
                        — {english}
                      </span>
                    </div>
                  ))}
                </div>
              {/* <p>Can also mean: {wordData.otherDefs}</p> */}
            </div>
          )}
        </>
      ) : (
        <p>Play today&apos;s game to see the word</p>
      )}
    </div>
  );
};
export default Definition;
