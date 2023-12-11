import IconButton from "../../components/ui/iconbutton";
import { GameContext } from "../../context/GameProvider";
import { AiFillSound } from "react-icons/ai";
import styles from "./styles.module.css";
import { useRef, useContext } from "react";

const Definition = ({ wordData }) => {
  const { answer } = useContext(GameContext);
  const audioRef = useRef(null);

  
  const playAudio = () => {
      audioRef.current.play();
    };


  return (
    <div className={styles["definition-wrapper"]}>
        <h2 className={styles['heading']}>Today&apos;s Word</h2>
      <div className={styles['inline']}>
        <h3 className={styles["definition"]}> {answer.toLowerCase()}</h3>
        {wordData.audio && (
          <IconButton callback={playAudio}>
            <audio ref={audioRef} src={wordData.audio}></audio>
            <AiFillSound className={styles["icon-button"]} />
          </IconButton>
        )}
      </div>
      <div>
        { wordData.mainDef &&
        <h3 className={`${styles.definition} ${styles.green}`}>
          {wordData.mainDef}
        </h3>
        }
      </div>
      { wordData.exampleEnglish && wordData.exampleSpanish && 
      <div>
        { wordData.examples.length > 0 &&
        <div>
            { wordData.examples.map(({english, spanish, key}) => (
                <div key={key}>
                    <span className={`${styles.example}`}>{spanish}</span>
                    <span className={`${styles.example} ${styles.light}`}>
                    {" "}
                    — {english}
                    </span>
                </div>
            ))}
        </div>
        
        }
        {/* <p>Can also mean: {wordData.otherDefs}</p> */}
      </div>
      }

    </div>
  );
};
export default Definition;
