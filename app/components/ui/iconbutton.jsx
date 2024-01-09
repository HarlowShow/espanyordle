import styles from './Buttons.module.css'
import VisuallyHidden from './visuallyhidden'
import { useRef, useEffect } from 'react'

export default function IconButton({callback, label, children}) {
const buttonRef = useRef()

// for close buttons, focus on modal open
useEffect(() => {
    if (label === 'close') {
        buttonRef.current.focus()
    }
}, [label])

    return (
        <button type="button" className={styles['icon-button']} onClick={callback} ref={buttonRef} data-ui>
            <VisuallyHidden>
                {label}
            </VisuallyHidden>
            {children}
            </button>
    )
}