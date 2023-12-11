"use client";

import Modal from "../../components/ui/modal";
import { useState, useContext, useEffect, useRef } from "react";
import { GameContext } from "../../context/GameProvider";
import { UIContext } from "../../context/UIProvider";

import { getWordData } from './worddata.js';
import styles from "./styles.module.css";
import Definition from './definition';

const Results = () => {
  // const [definition, setDefinition] = useState("");
  // const [moreDefinitions, setMoreDefinitions] = useState(null);
  // const [exampleEn, setExampleEn] = useState("");
  // const [exampleSp, setExampleSp] = useState("");
  // const [audioURL, setAudioURL] = useState("");
  const [wordData, setWordData] = useState({})
  const { showResultsModal, setShowResultsModal } = useContext(UIContext);
  const { gameState, answer } = useContext(GameContext);
 
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

        const newWordData = getWordData(data)
        setWordData(newWordData)
    
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
        <Definition wordData={wordData}/>
        </Modal>
      )}
    </div>
  );
};
export default Results;