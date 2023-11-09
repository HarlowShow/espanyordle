import { useContext} from 'react'
import { GameContext } from '../../context/GameProvider';
import styles from './styles.module.css'




export default function Key({status, char, children, optStyle = ''}) {
    const { handleKeyboardInput } = useContext(GameContext)
    const className = `${styles.key} ` + status
    return (
        <button className={className} onClick={() => handleKeyboardInput(char)}>
        <span>{children}</span>
    </button>
    )
}

