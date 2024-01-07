"use client";

import styles from "./Nav.module.css";
import IconButton from "../ui/iconbutton";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { BiHomeAlt2 } from "react-icons/bi";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { VscGraph } from "react-icons/vsc";
import { UIContext } from "../../context/UIProvider";
import { getDailyIndex } from "../../data/helpers.js";

export default function Nav() {
  const {
    showHelpModal,
    showResultsModal,
    setShowHelpModal,
    setShowResultsModal,
  } = useContext(UIContext);

  const router = useRouter();
  const goBack = () => {
    router.push("/");
  };

  const index = getDailyIndex();
  const gameNumber = index + 1;

  return (
    <ul role="menubar" className={styles["nav"]}>
      <li className={styles.left}>
        <IconButton callback={goBack} label="home">
          <BiHomeAlt2 aria-hidden="true" focusable="false" />
        </IconButton>
      </li>
      <li className={styles.center}>
        <h1>Daily #{gameNumber}</h1>
      </li>
      <li className={styles.right}>
        <IconButton
          callback={() => setShowResultsModal(!showResultsModal)}
          label="statistics"
        >
          <VscGraph aria-hidden="true" focusable="false" />
        </IconButton>
        <IconButton
          callback={() => setShowHelpModal(!showHelpModal)}
          label="help"
        >
          <IoIosHelpCircleOutline
            className={styles["scale"]}
            aria-hidden="true"
            focusable="false"
          />
        </IconButton>
      </li>
    </ul>
  );
}
