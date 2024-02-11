"use client";

import MainButton from "@/components/ui/mainbutton";
import styles from "./Home.module.css";
import { useRouter } from "next/navigation";
import Logo from "./components/ui/logo";
import Help from "./game/help/help";

export default function Home() {
  const router = useRouter();
  const goToGame = (mode) => {
    router.push(`/game?mode=${mode}`);
  };

  return (
    <div className={styles.home}>
      <Help />
      <div className={styles["home-content"]}>
        <Logo />
        <h1>(Españordle)</h1>
        <h2>A Daily Word Game For Spanish Learners</h2>
        <div className={styles["button-wrapper"]}>
          <MainButton callback={() => goToGame("daily")} label={"play"}>
            DAILY GAME
          </MainButton>
        </div>
        <div className={styles["button-wrapper"]}>
          <MainButton callback={() => goToGame("easy")} label={"play"} note={"Basic vocab only"}>
           EASY MODE
          </MainButton>
        </div>
      </div>
    </div>
  );
}
