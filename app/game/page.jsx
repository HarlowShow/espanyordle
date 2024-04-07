import { supabase } from "@/lib/supabase";
import Input from "./keyboard/keyboard";
import Grid from "./grid/grid";

import styles from "./styles.module.css";
import GameProvider from "@/context/GameProvider";
import Toasts from "@/components/toasts/toasts.jsx";
import { MAX_EASY_INDEX, MAX_DAILY_INDEX } from "@/data/config";
import Results from "./results/results.jsx";
import Help from "./help/help";
import { getDailyIndex, calcMSOffset } from "@/data/helpers.js";
import { getModeIndexFromSearchParams } from "@/data/statehelpers.js";
import Spinner from '@/components/ui/spinner'

export const revalidate = calcMSOffset();

const Game = async ({ searchParams }) => {
  const wordIndex = getDailyIndex() + 1;
  // get data for the day's word
  const modeIndex = await getModeIndexFromSearchParams(searchParams);

  // fallback for if the number of available words ever runs out, it will pick a random one.
  const fallbackIndexMax =
    modeIndex === "easy_index" ? MAX_EASY_INDEX : MAX_DAILY_INDEX;
  const fallbackIndex = Math.floor(Math.random() * fallbackIndexMax) + 1;

  const getData = async () => {
    const { data } = await supabase
      .from("words-prod")
      .select("word, maindef, examples, audio_url, other_defs")
      .eq(modeIndex, wordIndex);
    const wordData = data[0] ?? null
    const newAnswer = wordData?.word ?? null

    if (newAnswer && wordData) {
      return { wordData: wordData, answer: newAnswer };
    } else {
      // console.log('getting fallback data at fallback index of: ' + fallbackIndex);
      const { data } = await supabase
        .from("words-prod")
        .select("word, maindef, examples, audio_url, other_defs")
        .eq(modeIndex, fallbackIndex);
      const fallbackWordData = data[0];
      const fallbackAnswer = fallbackWordData.word;
      return {
        wordData: fallbackWordData,
        answer: fallbackAnswer
      }
    }
  };

  const { wordData, answer} = await getData()

  return (
    <>
    { answer ? (
      <GameProvider modeParam={modeIndex} word={answer}>
        <Toasts />

        <div className={styles["game-container"]}>
          {/* <Test/> */}
          <Help />
          <Results newWordData={wordData} />
          <Grid newAnswer={answer}></Grid>
          <Input newAnswer={answer} />
        </div>
      </GameProvider>

) : (
  <Spinner />
)}
</>
  );
};
export default Game;
