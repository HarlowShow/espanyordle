import Input from './input';
import Grid from './grid';
import styles from './styles.module.css'


const Game = (() => {
    return (
        <div className={styles['game-container']}>
            <Grid />
            <Input />
        </div>
    )
}) 

export default Game