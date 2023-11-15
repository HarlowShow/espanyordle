'use client'

import Input from './keyboard/keyboard';
import Grid from './grid/grid';
import Results from './results/results';
import styles from './styles.module.css'
import GameProvider from '../context/GameProvider';
import Toasts from "../components/toasts/toasts.jsx";
// import Dictionary from '../api/dictionary.jsx';


const Game = (() => {


    return (
        <>
        <GameProvider>
        <Results />
        {/* <Dictionary /> */}
        <Toasts />
        <div className={styles['game-container']}>
            <Grid />
            <Input />
        </div>
        </GameProvider>
        </>
    )
}) 

export default Game