import { supabase } from '../lib/supabase';
import Input from '../game/keyboard/keyboard';
import Grid from '../game/grid/grid';

import styles from '../game/styles.module.css'
import GameProvider from '../context/GameProvider';
import Toasts from "../components/toasts/toasts.jsx";
import Results from '../game/results/results.jsx';
import Help from '../game/help/help'
import Test from './test'



const WordData = (async() => {

    const { data } = await supabase.from('words').select('word');
    const word = data[0].word


    return (
        <GameProvider>
        <Toasts />

        <div className={styles['game-container']}>
            <Test word={word}/>
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