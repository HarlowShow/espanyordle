"use client";

import styles from "./Nav.module.css";
import { useContext } from 'react';
import { IoIosHelpCircleOutline } from "react-icons/io";
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
              <IoIosHelpCircleOutline className={styles['scale']} aria-hidden="true" focusable="false" />
            </IconButton>
          </li>
          </ul>
  );
}
