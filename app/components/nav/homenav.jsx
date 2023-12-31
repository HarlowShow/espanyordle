"use client";

import styles from "./styles.module.css";
import { useContext } from 'react';
import { LuHelpCircle } from "react-icons/lu";
import IconButton from '../ui/iconbutton';
import { UIContext } from "../../context/UIProvider";

export default function HomeNav() {
  const {
    showHelpModal,
    setShowHelpModal,
  } = useContext(UIContext);

  return (
        <ul className={styles["nav-home"]}>
          <li className={styles["button-group"]}>
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
