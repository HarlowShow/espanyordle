import { useState, useEffect } from "react";
import styles from "./styles.module.css";

// TODO: figure out when to trigger this - atm game no. updates in LS automatically so there's no comparison
// trigger on win/lose via parent
// make it look nice
// clear LS on page refresh

const NextDayPrompt = ({ isOld, offset }) => {
  // make it so it only shows if haswon is true as well
  const [offsetNo, setOffsetNo] = useState(null);

  useEffect(() => {
    if (offset !== null) {
      setOffsetNo(offset);
    }
  }, [offset, setOffsetNo]);
  return (
    <>
      {isOld && (
        <>
            <span>*</span>
            <p className={styles['note']}>
          <span>*This españordle is&nbsp;</span>
          {offsetNo && <span>{offsetNo}&nbsp;</span>}
          <span>
            {`${offsetNo === 1 ? "day" : "days"}` }&nbsp;old.&nbsp;
          </span>
          <span>Play today&apos;s game</span>
            </p>
        </>
      )}
    </>
  );
};
export default NextDayPrompt;
