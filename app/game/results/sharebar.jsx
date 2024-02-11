import ShareButton from "./sharebutton";
import styles from "./Results.module.css";

const ShareBar = () => {

  
  return (
    <div className={styles['stretched-out']}>
      <div className={styles["share-bar"]}>
        <hr className={styles["divider"]}></hr>
        <div className={styles["buttons"]}>
          <ShareButton />
        </div>
      </div>
    </div>
  );
};
export default ShareBar;
