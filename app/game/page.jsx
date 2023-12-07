import Input from './keyboard/keyboard';
import Grid from './grid/grid';

import styles from './styles.module.css'
import GameProvider from '../context/GameProvider';
import Toasts from "../components/toasts/toasts.jsx";
// import Test from './results/test';
// import Dictionary from '../api/dictionary.jsx';
import Results from './results/results';


const Game = (() => {


    return (
        <>
        <GameProvider>
        <Toasts />
        <Results />

        <div className={styles['game-container']}>
            <Grid>
            </Grid>
            <Input />
        </div>
        </GameProvider>
        </>
    )
}) 

export default Game