import { supabase } from '../lib/supabase';
import Input from '../game/keyboard/keyboard';
import Grid from '../game/grid/grid';

import styles from '../game/styles.module.css'
import GameProvider from '../context/GameProvider';
import Toasts from "../components/toasts/toasts.jsx";
import Results from '../game/results/results.jsx';
import Help from '../game/help/help';
import { getDailyIndex } from '../data/helpers';
import Test from './test'




const WordData = (async() => {


    const wordIndex = getDailyIndex() + 1;


    // select data from specific column with that id, should be MARCA
    const { data } = await supabase.from('words-prod').select('word, maindef, examples, audio_url, other_defs').eq('index', wordIndex);
    // console.log(data)
    const wordData = data[0]

    /*
    [
  {
    word: 'MARCA',
    maindef: 'mark',
    examples: [ [Object], [Object], [Object], [Object] ],
    audio_url: 'https://media.merriam-webster.com/audio/prons/es/me/mp3/m/marca01sp.mp3',
    other_defs: 'brand, make, trademark'
  }
]
    */

    return (
        <GameProvider>
        <Toasts />

        <div className={styles['game-container']}>
            {/* <Test/> */}
            <Help />
            <Results newWordData={wordData}/>
            <Grid>
            </Grid>
            <Input />
        </div>
        </GameProvider>
    )
})
export default WordData