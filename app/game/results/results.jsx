"use client";

import Modal from "../../components/ui/modal";
import { useState, useContext, useEffect, useRef } from "react";
import { GameContext } from "../../context/GameProvider";
import { UIContext } from "../../context/UIProvider";

import { getWordData } from './worddata.js';
import styles from "./styles.module.css";
import IconButton from "../../components/ui/iconbutton";
import { AiFillSound } from "react-icons/ai";

const Results = () => {
  const [definition, setDefinition] = useState("");
  const [moreDefinitions, setMoreDefinitions] = useState(null);
  const [exampleEn, setExampleEn] = useState("");
  const [exampleSp, setExampleSp] = useState("");
  const [audioURL, setAudioURL] = useState("");
  const { showResultsModal, setShowResultsModal } = useContext(UIContext);
  const { gameState, answer } = useContext(GameContext);
  const audioRef = useRef(null);

  const playAudio = () => {
    audioRef.current.play();
  };

  // get the api data (TODO optimize this)
  useEffect(() => {
    async function getDefinition() {
      const res = await fetch(
        `https://www.dictionaryapi.com/api/v3/references/spanish/json/${answer}?key=${process.env.NEXT_PUBLIC_API_KEY}`
      );
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      } else {
        // TODO: add some validation here
        const data = await res.json();

        const wordData = getWordData(data)
        setDefinition(wordData.mainDef);
        setMoreDefinitions(wordData.otherDefs);
        setExampleEn(wordData.exampleEnglish);
        setExampleSp(wordData.exampleSpanish);
        setAudioURL(wordData.audio);
    
      }
    }
    getDefinition();
  }, [answer]);

  // trigger modal open on win
  useEffect(() => {
    console.log("game state changed to " + gameState);
    if (gameState === "win" || gameState === "lose") {
      setShowResultsModal(true);
    }
  }, [gameState, setShowResultsModal]);

  return (
    <div>
      {showResultsModal === true && (
        <Modal handleClose={() => setShowResultsModal(false)}>
          <div>
            <h1 className={styles["title"]}>You Won / Lost</h1>
            <div className={styles["definition-wrapper"]}>
              <div>
                <h3 className={styles["definition"]}>
                  {" "}
                  {answer.toLowerCase()}
                </h3>
                <audio ref={audioRef} src={audioURL}></audio>
                <IconButton callback={playAudio}>
                  <AiFillSound className={styles["icon-button"]} />
                </IconButton>
              </div>
              <div>
                <h3 className={`${styles.definition} ${styles.green}`}>
                  {definition}
                </h3>
              </div>
            </div>
            <div>
              <span className={`${styles.example}`}>{exampleSp}</span>
              <span className={`${styles.example} ${styles.light}`}> -- {exampleEn}</span>
            </div>
            {/* poss get rid of more defs */}
            <p>more definitions: {moreDefinitions}</p>
          </div>
        </Modal>
      )}
    </div>
  );
};
export default Results;
