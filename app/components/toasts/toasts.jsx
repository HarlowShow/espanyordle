import styles from "./styles.module.css";

export default function Toasts() {
// trigger on a message being added
    return (
        <div className={styles['toast-wrapper']}>
        <div className={styles.toast}>
            <span>this is a toast</span>
        </div>
        </div>

    )
}