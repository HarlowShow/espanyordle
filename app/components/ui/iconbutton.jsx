import styles from './styles.module.css'

export default function IconButton({callback, children}) {
    return (
        <button type="button" className={styles['icon-button']} onClick={callback}>{children}</button>
    )
}