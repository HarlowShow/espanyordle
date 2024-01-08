"use client";

import Modal from "../../components/ui/modal";
import { useContext, useEffect } from "react";
import { GameContext } from "../../context/GameProvider";
import { UIContext } from "../../context/UIProvider";
import ShareBar from './sharebar';

import styles from "./Results.module.css";
import Definition from './definition';
import Stats from './stats';
import { BASE_ANIMATION_DELAY } from "@/app/data/ui";

const Results = ({newWordData}) => {

  const { showResultsModal, setShowResultsModal} = useContext(UIContext);
  const { gameState, dailyIndex, lastPlayed  } = useContext(GameContext);


  // trigger modal open on win or lose for first time each day
  useEffect(() => {
    // console.log("game state changed to " + gameState);
    // console.log(lastPlayed, dailyIndex)
    const hasFinishedGame = gameState === 'win' || gameState === 'lose'
    if (lastPlayed && lastPlayed !== dailyIndex && hasFinishedGame) {
      // console.log('setting timeout')
      setTimeout(() => {
        setShowResultsModal(true);
      }, BASE_ANIMATION_DELAY * 5)

    }
  }, [gameState, setShowResultsModal, dailyIndex, lastPlayed]);

  return (
    <div>
      {showResultsModal === true && (
        <Modal handleClose={() => setShowResultsModal(false)}>
        <Definition newWordData={newWordData}/>
        <hr className={styles['divider']}></hr>
        <Stats />
        <ShareBar />
        </Modal>
      )}
    </div>
  );
};
export default Results;
