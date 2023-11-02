import { useContext} from 'react'
import { GameContext } from '../context/GameProvider';
import styles from './styles.module.css'




export default function Key({status, char, children}) {
    const { handleKeyboardInput } = useContext(GameContext)
    return (
        <button className={`${styles.key} ` + status} onClick={() => handleKeyboardInput(char)}>
        <span>{children}</span>
    </button>
    )
}