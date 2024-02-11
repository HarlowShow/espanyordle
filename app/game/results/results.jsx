"use client";

import Modal from "../../components/ui/modal";
import { useContext, useEffect, useState } from "react";
import { GameContext } from "../../context/GameProvider";
import { UIContext } from "../../context/UIProvider";
import ShareBar from "./sharebar";
import { getStatsFromLocalStorage } from "@/data/localstorage";

import styles from "./Results.module.css";
import Definition from "./definition";
import Stats from "./stats";
import { BASE_ANIMATION_DELAY } from "@/data/ui";

const Results = ({ newWordData }) => {
  const { showResultsModal, setShowResultsModal } = useContext(UIContext);
  const { gameState, dailyIndex, mode } = useContext(GameContext);
  const hasFinishedGame = gameState === "win" || gameState === "lose";

  const [lastPlayed, setLastPlayed] = useState(undefined);

  // update the idx of the last played game
    useEffect(() => {
      const possibleLastPlayedGame = getStatsFromLocalStorage(mode)
      const lastPlayedIdx = possibleLastPlayedGame?.lastPlayedIdx ? possibleLastPlayedGame.lastPlayedIdx : null
      console.log('setting last played idx to: ' + lastPlayedIdx)
      setLastPlayed(lastPlayedIdx)
    }, [mode], )

  // trigger modal open on win or lose for first time each day
  useEffect(() => {
    console.log('last played index is: ' + lastPlayed + 'daily index is: ' + dailyIndex)
    if (lastPlayed !== undefined && lastPlayed !== dailyIndex && hasFinishedGame) {
      setTimeout(() => {
        setShowResultsModal(true);
      }, BASE_ANIMATION_DELAY * 5);
    }
  }, [setShowResultsModal, dailyIndex, lastPlayed, hasFinishedGame]);

  return (
    <div>
      {showResultsModal === true && (
        <Modal title={"Results"} handleClose={() => setShowResultsModal(false)}>
          <div className={styles['results-wrapper']}>
            <div>
            <Definition newWordData={newWordData} />
            <hr className={styles["divider"]}></hr>
            </div>
            <Stats mode={mode}/>
            <ShareBar mode={mode}/>
            </div>
        </Modal>
      )}
    </div>
  );
};
export default Results;
