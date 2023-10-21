import Input from './input';
import Grid from './grid';
import styles from './styles.module.css'
import GameProvider from '../context/GameProvider';


const Game = (() => {
    return (
        <GameProvider>
        <div className={styles['game-container']}>
            <Grid />
            <Input />
        </div>
        </GameProvider>
    )
}) 

export default Game