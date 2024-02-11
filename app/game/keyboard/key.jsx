import { useContext} from 'react'
import { GameContext } from '../../context/GameProvider';
import styles from './Keyboard.module.css'




export default function Key({status, char, children}) {
    const { handleKeyboardInput } = useContext(GameContext)
    const className = `${styles.key} ` + status

    // two fns below accept only the enter event for users tabbing through keyboard, or the mouse pointer event
    // stops propagation to the event listener in the keyboard component
    const handleKeyDown = ((event) => {
        event.stopPropagation()
        if (event.key === 'Enter') {
            handleKeyboardInput(char)
        }
    })

    const handleClick = ((event) => {
        if (event.detail === 1) {
            handleKeyboardInput(char)
        }
    })

    return (
        <button className={className} onClick={handleClick} onKeyDown={handleKeyDown}>
        <span>{children}</span>
    </button>
    )
}

