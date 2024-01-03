import { useContext} from 'react'
import { GameContext } from '../../context/GameProvider';
import styles from './Keyboard.module.css'




export default function Key({status, char, children, optStyle = ''}) {
    const { handleKeyboardInput } = useContext(GameContext)
    const className = `${styles.key} ` + status

    const handleKeyDown = ((event) => {
        event.stopPropagation()
        // console.log('keydown')
        if (event.key === 'Enter') {
            // console.log('handling input for: ' + char)
            handleKeyboardInput(char)
        }
    })

    const handleClick = ((event) => {
        // event.preventDefault()
        console.log(event.detail)
        if (event.detail === 1) {
            // console.log('handling click event, pointer type was mouse')
            handleKeyboardInput(char)
        }
    })

    return (
        <button className={className} onClick={handleClick} onKeyDown={handleKeyDown}>
        <span>{children}</span>
    </button>
    )
}

