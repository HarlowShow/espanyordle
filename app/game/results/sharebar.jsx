import ShareButton from "./sharebutton";
import Countdown from './countdown';
import styles from "./Results.module.css";

const ShareBar = () => {

  
  return (
    <div className={styles['stretched-out']}>
      <div className={styles["share-bar"]}>
        <hr className={styles["divider"]}></hr>
        <div className={styles["buttons"]}>
          <Countdown />
          <ShareButton />
        </div>
      </div>
    </div>
  );
};
export default ShareBar;
