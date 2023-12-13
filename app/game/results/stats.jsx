import styles from "./styles.module.css";
import { getStatsFromLocalStorage } from "../../data/localstorage.js";

const Stats = () => {
  const stats = getStatsFromLocalStorage();
  const winPerc = stats.won / stats.played * 100
  return (
    <div className={styles["content-wrapper"]}>
      {stats ? (
        <div>
          <h2 className={styles["heading"]}>Statistics</h2>
          <ul className={styles['key-stats-wrapper']}>
            <li className={styles['key-stat']}>
                <p>{ stats.played }</p>
                <p>Played</p>
            </li>
            <li className={styles['key-stat']}>
                <p>{ winPerc }%</p>
                <p>Games Won</p>
            </li>
            
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
