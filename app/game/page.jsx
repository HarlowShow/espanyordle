'use client'

import Input from './input';
import Grid from './grid';
import styles from './styles.module.css'
import GameProvider from '../context/GameProvider';
import Toasts from "../components/toasts/toasts.jsx";
// import Dictionary from '../api/dictionary.jsx';
import { useState } from 'react';


const Game = (() => {

    const [hasWon, setHasWon] = useState('')


    return (
        <>
        <GameProvider>
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