import styles from "./Results.module.css";
import { getStatsFromLocalStorage } from "../../data/localstorage.js";
import SingleStat from './singlestat'
import Distro from './distro';

const Stats = ({mode}) => {
  const stats = getStatsFromLocalStorage(mode);
  const played = stats && stats.played ? stats.played : 0
  const currentStreak = stats && stats.currentStreak ? stats.currentStreak : 0
  const longestStreak = stats && stats.longestStreak ? stats.longestStreak : 0
  const currentWinStreak = stats && stats.currentWinStreak ? stats.currentWinStreak : 0
  const longestWinStreak = stats && stats.longestWinStreak ? stats.longestWinStreak : 0
  const winPerc = stats && stats.won ? `${(stats.won / stats.played * 100).toFixed()}%` : 0

  const testDistro = {
    1: 0,
    2: 1,
    3: 2,
    4: 4,
    5: 5,
    6: 6,
}
  // TESTING. DISABLE THIS
  const distro = stats?.distro ? stats.distro : testDistro

  
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
          <Distro distro={distro}/>
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
