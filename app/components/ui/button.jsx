import styles from './Buttons.module.css'

export default function Button({callback, label, children}) {
    return (
        <button type="button" aria-label={label} className={styles['button']} onClick={callback}>{children}</button>
    )
}