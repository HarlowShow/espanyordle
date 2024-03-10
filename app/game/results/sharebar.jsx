import { useContext } from "react";
import ShareButton from "./sharebutton";
import Countdown from "./countdown";
import styles from "./Sharebar.module.css";
import { GameContext } from "@/context/GameProvider";

const ShareBar = () => {
  const { gameState } = useContext(GameContext);

  return (
    <div className={styles["stretched-out"]}>
      <div className={styles["share-bar-wrapper"]}>
        <hr className={styles["divider"]}></hr>
        <div className={styles["share-bar"]}>
          <div>{gameState !== "in progress" && <Countdown />}</div>

          <ShareButton />
        </div>
      </div>
    </div>
  );
};
export default ShareBar;
