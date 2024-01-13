import { supabase } from '@/lib/supabase';
import Input from "./keyboard/keyboard";
import Grid from "./grid/grid";

import styles from "./styles.module.css";
import GameProvider from "@/context/GameProvider";
import Toasts from "@/components/toasts/toasts.jsx";
import Results from "./results/results.jsx";
import Help from "./help/help";
import { getDailyIndex, calcMSOffset } from "@/data/helpers.js";
import { getModeIndexFromSearchParams } from "@/data/statehelpers.js";
export const revalidate = calcMSOffset()

const Game = async ({searchParams}) => {

  // const getModeFromSearchParams = (async() => {
  //   const mode = searchParams.mode
  //   const modeIndex = mode === 'easy' ? 'easy_index' : 'index'
  //   return modeIndex
  // })


  const wordIndex = getDailyIndex() + 1;

  // get data for the day's word
  const modeIndex = await getModeIndexFromSearchParams(searchParams)
  const { data } = await supabase
    .from("words-prod")
    .select("word, maindef, examples, audio_url, other_defs")
    .eq(modeIndex, wordIndex);
  const wordData = data[0];
  const newAnswer = wordData.word;
  console.log('answer is:' + newAnswer)

  return (
    <>
    <GameProvider modeParam={modeIndex} word={newAnswer}>
      <Toasts />

      <div className={styles["game-container"]}>
        {/* <Test/> */}
        <Help />
        <Results newWordData={wordData} />
        <Grid newAnswer={newAnswer}></Grid>
        <Input newAnswer={newAnswer}/>
      </div>
    </GameProvider>
    </>
  );
};
export default Game;

