import styles from "./Results.module.css";
import { getStatsFromLocalStorage } from "../../data/localstorage.js";
import SingleStat from './singlestat'

const Stats = () => {
  const stats = getStatsFromLocalStorage();
  const played = stats && stats.played ? stats.played : 0
  const currentStreak = stats && stats.currentStreak ? stats.currentStreak : 0
  const longestStreak = stats && stats.longestStreak ? stats.longestStreak : 0
  const winPerc = stats && stats.won ? `${stats.won / stats.played * 100}%` : 0
  
  return (
    <div className={styles["content-wrapper"]}>
      {stats ? (
        <div>
          <h2 className={styles["heading"]}>Statistics</h2>
          <ul className={styles['key-stats-wrapper']}>
            <SingleStat stat={played} label={"Played"}/>
            <SingleStat stat={winPerc} label={"Games Won"}/>
            <SingleStat stat={currentStreak} label={"Current Streak"}/>
            <SingleStat stat={longestStreak} label={"Longest Streak"}/>
          </ul>
        </div>
      ) : (
        <div>
          <h2 className={styles["heading"]}>No Statistics Found</h2>
          <p>Play some games to see your statistics</p>
        </div>
      )}
    </div>
  );
};
export default Stats;
