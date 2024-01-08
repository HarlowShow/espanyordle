"use client";

import Modal from "../../components/ui/modal";
import { useState, useContext, useEffect } from "react";
import { GameContext } from "../../context/GameProvider";
import { UIContext } from "../../context/UIProvider";
import { getStatsFromLocalStorage } from "@/app/data/localstorage";
import ShareBar from './sharebar';

import styles from "./Results.module.css";
import Definition from './definition';
import Stats from './stats';
import { BASE_ANIMATION_DELAY } from "@/app/data/ui";

const Results = ({newWordData}) => {

  const { showResultsModal, setShowResultsModal } = useContext(UIContext);
  const { gameState, dailyIndex } = useContext(GameContext);

  // get the api data (TODO optimize this)


  // trigger modal open on win or lose for first time each day
  useEffect(() => {
    console.log("game state changed to " + gameState);
    const { lastPlayedIdx } = getStatsFromLocalStorage()
    console.log(lastPlayedIdx, dailyIndex)
    const hasFinishedGame = gameState === 'win' || gameState === 'lose'
    if (lastPlayedIdx !== dailyIndex && hasFinishedGame) {
      console.log('setting timeout')
      setTimeout(() => {
        setShowResultsModal(true);
      }, BASE_ANIMATION_DELAY * 5)

    }
  }, [gameState, setShowResultsModal, dailyIndex]);

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
