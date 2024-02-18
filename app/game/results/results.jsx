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

  // will be undefined when latet state not yet set, null if no prev index found, or last index played
  const [lastPlayed, setLastPlayed] = useState(undefined);

  // update the idx of the last played game
  useEffect(() => {
    const lastPlayedGame = getStatsFromLocalStorage(mode);
    const lastPlayedIdx = lastPlayedGame?.lastPlayedIdx ?? null
    // console.log('last played idx is: ' + lastPlayedIdx)
    setLastPlayed(lastPlayedIdx);
  }, [mode]);

  // trigger modal open on win or lose for first time each day
  useEffect(() => {

    // checks if null (has never played before) or if first win/loss trigger
    const indexConditions = (typeof lastPlayed === 'number' &&
    lastPlayed !== dailyIndex) || lastPlayed === null
    if (
      indexConditions &&
      hasFinishedGame
    ) {
      console.log('gonna open modal. last played: ' + lastPlayed + 'dailyIndex: ' + dailyIndex)
      setTimeout(() => {
        setShowResultsModal(true);
      }, BASE_ANIMATION_DELAY * 5);
    }
  }, [setShowResultsModal, dailyIndex, lastPlayed, hasFinishedGame]);

  return (
    <div>
      {showResultsModal === true && (
        <Modal title={"Results"} handleClose={() => setShowResultsModal(false)}>
          <div className={styles["results-wrapper"]}>
            <div>
              <Definition newWordData={newWordData} />
              <hr className={styles["divider"]}></hr>
            </div>
            <Stats mode={mode} />
            <ShareBar mode={mode} />
          </div>
        </Modal>
      )}
    </div>
  );
};
export default Results;
