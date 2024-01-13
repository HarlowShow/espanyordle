"use client";

import Button from "./components/ui/button";
import MainButton from "@/components/ui/mainbutton";
import styles from "./Home.module.css";
import { useRouter } from "next/navigation";
import Logo from "./components/ui/logo";
import Help from "./game/help/help";
// import { createClient } from '@/utils/supabase/server';
//   import { cookies } from 'next/headers';

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
          <Button callback={() => goToGame("daily")} label={"play"}>
            DAILY GAME
          </Button>
        </div>
        <div className={styles["button-wrapper"]}>
          <MainButton callback={() => goToGame("easy")} label={"play"} note={"Basic words only"}>
           EASY MODE
          </MainButton>
        </div>
      </div>
    </div>
  );
}
