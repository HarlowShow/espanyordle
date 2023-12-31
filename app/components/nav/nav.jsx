"use client";

import styles from "./Nav.module.css";
import IconButton from "../ui/iconbutton";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { LuHelpCircle } from "react-icons/lu";
import { VscGraph } from "react-icons/vsc";
import { AiFillHome } from "react-icons/ai";
import { UIContext } from "../../context/UIProvider";

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


  return (
        <ul role="menubar" className={styles.nav}>
          <li>
            <IconButton callback={goBack} label="home">
              <AiFillHome aria-hidden="true" focusable="false" />
            </IconButton>
          </li>
          <li className={styles["button-group"]}>
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
              <LuHelpCircle aria-hidden="true" focusable="false" />
            </IconButton>
          </li>
          </ul>
  );
}
