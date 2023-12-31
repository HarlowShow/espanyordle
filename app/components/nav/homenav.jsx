"use client";

import styles from "./styles.module.css";
import Logo from "../ui/logo";

export default function HomeNav() {

  return (
        <div className={styles["nav-home"]}>
          <Logo />
        </div>
  );
}
