import Input from './keyboard/keyboard';
import Grid from './grid/grid';

import styles from './styles.module.css'
import GameProvider from '../context/GameProvider';
import Toasts from "../components/toasts/toasts.jsx";
// import UIProvider from '../context/UIProvider';
// import Test from './results/test';
// import Dictionary from '../api/dictionary.jsx';
import Results from './results/results';


const Game = (() => {



    return (
        <>
        <GameProvider>
        <Toasts />

        <div className={styles['game-container']}>
            <Results />
            <Grid>
            </Grid>
            <Input />
        </div>
        </GameProvider>
        </>
    )
}) 

export default Game