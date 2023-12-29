import styles from './styles.module.css'
import VisuallyHidden from './visuallyhidden'

export default function IconButton({callback, label, children}) {
    return (
        <button type="button" className={styles['icon-button']} onClick={callback}>
            <VisuallyHidden>
                {label}
            </VisuallyHidden>
            {children}
            </button>
    )
}