import styles from './styles.module.css'

export default function Button({callback, children}) {
    return (
        <button type="button" className={styles.button} onClick={callback}>{children}</button>
    )
}