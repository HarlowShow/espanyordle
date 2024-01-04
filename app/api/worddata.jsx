import { supabase } from '../lib/supabase';
import Input from '../game/keyboard/keyboard';
import Grid from '../game/grid/grid';

import styles from '../game/styles.module.css'
import GameProvider from '../context/GameProvider';
import Toasts from "../components/toasts/toasts.jsx";
import Results from '../game/results/results.jsx';
import Help from '../game/help/help'
import Test from './test'
import { getWordData } from '../game/results/worddata';


async function getData() {
    const res = await fetch(
        `https://www.dictionaryapi.com/api/v3/references/spanish/json/NUEVO?key=${process.env.NEXT_PUBLIC_API_KEY}`
      );
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      } else {
        // TODO: add some validation here
        const data = await res.json();
    
        const newWordData = getWordData(data)
        return newWordData
}}

// mainDef: string
// otherDefs?: string
// exampleEnglish: string
// exampleSpanish: string
// audio: string
// examples: [{}] - { english: string, spanish: string: key }

/* Supabase:
word
maindef


*/



const WordData = (async() => {

    const defData = await getData()
    // console.log(defData)



    // select data from specific column with that id
    const { data } = await supabase.from('words').select('examples').eq('id', 1);
    console.log(data)


    return (
        <GameProvider>
        <Toasts />

        <div className={styles['game-container']}>
            <Test examples={data}/>
            <Help />
            <Results />
            <Grid>
            </Grid>
            <Input />
        </div>
        </GameProvider>
    )
})
export default WordData