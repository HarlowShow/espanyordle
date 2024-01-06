"use client";

import Modal from "../../components/ui/modal";
import { useState, useContext, useEffect } from "react";
import { GameContext } from "../../context/GameProvider";
import { UIContext } from "../../context/UIProvider";
import { getLastPlayedFromLocalStorage } from "@/app/data/localstorage";

import styles from "./Results.module.css";
import Definition from './definition';
import Stats from './stats';
import { BASE_ANIMATION_DELAY } from "@/app/data/ui";

const Results = ({newWordData}) => {

  const [wordData, setWordData] = useState({})
  const { showResultsModal, setShowResultsModal } = useContext(UIContext);
  const { gameState, dailyIndex } = useContext(GameContext);

  // get the api data (TODO optimize this)


  // trigger modal open on win or lose for first time each day
  useEffect(() => {
    // console.log("game state changed to " + gameState);
    const lastPlayed = getLastPlayedFromLocalStorage()
    if (gameState === "win" || gameState === "lose" && lastPlayed !== dailyIndex) {
      setTimeout(() => {
        setShowResultsModal(true);
      }, BASE_ANIMATION_DELAY * 5)

      if (gameState === "win") {

      }
    }
  }, [gameState, setShowResultsModal, dailyIndex]);

  return (
    <div>
      {showResultsModal === true && (
        <Modal handleClose={() => setShowResultsModal(false)}>
        <Definition wordData={wordData} newWordData={newWordData}/>
        <hr className={styles['divider']}></hr>
        <Stats />
        </Modal>
      )}
    </div>
  );
};
export default Results;
