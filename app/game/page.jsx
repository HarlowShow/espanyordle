import Input from './input';
import Grid from './grid';
import styles from './styles.module.css'
import GameProvider from '../context/GameProvider';
import Toasts from "../components/toasts/toasts.jsx";


const Game = (() => {
    return (
        <GameProvider>
        <Toasts />
        <div className={styles['game-container']}>
            <Grid />
            <Input />
        </div>
        </GameProvider>
    )
}) 

export default Game