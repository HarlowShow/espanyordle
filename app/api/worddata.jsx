// ARCHIVED, could still use for testing


import { supabase } from "../lib/supabase";
import Input from "../game/keyboard/keyboard";
import Grid from "../game/grid/grid";

import styles from "../game/styles.module.css";
import GameProvider from "../context/GameProvider";
import Toasts from "../components/toasts/toasts.jsx";
import Results from "../game/results/results.jsx";
import Help from "../game/help/help";
import { getDailyIndex } from "../data/helpers.js";
import Test from "./test";

const WordData = async () => {
  const wordIndex = getDailyIndex() + 1;

  // get data for the day's word
  const { data } = await supabase
    .from("words-prod")
    .select("word, maindef, examples, audio_url, other_defs")
    .eq("index", wordIndex);
  const wordData = data[0];
  const newAnswer = wordData.word;

  return (
    <GameProvider>
      <Toasts />

      <div className={styles["game-container"]}>
        {/* <Test/> */}
        <Help />
        <Results newWordData={wordData} />
        <Grid newAnswer={newAnswer}></Grid>
        <Input />
      </div>
    </GameProvider>
  );
};
export default WordData;
