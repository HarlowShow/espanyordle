import styles from './styles.module.css'

export default function Button({callback, label, children}) {
    return (
        <button type="button" aria-label={label} className={styles['button-two']} onClick={callback}>{children}</button>
    )
}