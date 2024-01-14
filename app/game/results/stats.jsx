'use client'
import styles from "./Results.module.css";
import { GameContext } from "@/context/GameProvider";
import { useEffect, useContext, useState} from 'react'
import { getStatsFromLocalStorage } from "../../data/localstorage.js";
import SingleStat from './singlestat'
import Distro from './distro';

const Stats = () => {
  const { mode } = useContext(GameContext)
  const stats = getStatsFromLocalStorage(mode);
  const getLiveStats = ((stats) => {
    const played = stats && stats.played ? stats.played : 0
    const currentStreak = stats && stats.currentStreak ? stats.currentStreak : 0
    const longestStreak = stats && stats.longestStreak ? stats.longestStreak : 0
    const currentWinStreak = stats && stats.currentWinStreak ? stats.currentWinStreak : 0
    const longestWinStreak = stats && stats.longestWinStreak ? stats.longestWinStreak : 0
    const winPerc = stats && stats.won ? `${(stats.won / stats.played * 100).toFixed()}%` : 0
    const distro = stats?.distro ? stats.distro : null
    
    return {
      initPlayed: played,
      initCurrentStreak: currentStreak,
      initLongestStreak: longestStreak,
      initCurrentWinStreak: currentWinStreak,
      initLongestWinStreak: longestWinStreak,
      initWinPerc: winPerc,
      initDistro: distro
    }
  })
  
  const {
    initPlayed,
    initCurrentStreak,
    initLongestStreak,
    initCurrentWinStreak,
    initLongestWinStreak,
    initWinPerc,
    initDistro
  } = getLiveStats(stats)
  

  const [played, setPlayed] = useState(initPlayed)
  const [currentStreak, setCurrentStreak] = useState(initCurrentStreak)
  const [longestStreak, setLongestStreak] = useState(initLongestStreak)
  const [currentWinStreak, setCurrentWinStreak] = useState(initCurrentWinStreak)
  const [longestWinStreak, setLongestWinStreak] = useState(initLongestWinStreak)
  const [winPerc, setWinPerc] = useState(initWinPerc)
  const [distro, setDistro] = useState(initDistro)

  const testDistro = {
    1: 0,
    2: 1,
    3: 2,
    4: 4,
    5: 5,
    6: 6,
}

useEffect(() => {
  const nextStats = getStatsFromLocalStorage(mode);
  const {
    initPlayed,
    initCurrentStreak,
    initLongestStreak,
    initCurrentWinStreak,
    initLongestWinStreak,
    initWinPerc,
    initDistro
  } = getLiveStats(nextStats)

  setPlayed(initPlayed)
  setCurrentStreak(initCurrentStreak)
  setLongestStreak(initLongestStreak)
  setCurrentWinStreak(initCurrentWinStreak)
  setLongestWinStreak(initLongestWinStreak)
  setWinPerc(initWinPerc)
  setDistro(initDistro)
}, [mode])

  
  return (
    <div className={styles["content-wrapper"]}>
      {stats ? (
        <div>
          <h2 className={styles["heading"]}>Statistics ({mode})</h2>
          <ul className={styles['key-stats-wrapper']}>
            <SingleStat stat={played} label={"Played"}/>
            <SingleStat stat={currentStreak} label={"Play Streak"}/>
            <SingleStat stat={longestStreak} label={"Best Play Streak"}/>
            <SingleStat stat={winPerc} label={"Games Won"}/>
            <SingleStat stat={currentWinStreak} label={"Win Streak"}/>
            <SingleStat stat={longestWinStreak} label={"Best Win Streak"}/>
          </ul>
          { distro && 
          <Distro distro={distro}/>
          }
        </div>
      ) : (
        <div>
          <h2 className={styles["heading"]}>No Statistics Found ({mode})</h2>
          <p>Play some games to see your statistics</p>
        </div>
      )}
    </div>
  );
};
export default Stats;
