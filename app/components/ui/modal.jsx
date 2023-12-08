import styles from './styles.module.css'

export default function Modal({ handleClose, children}) {
    return (
        <div className={styles['modal-wrapper']}>
            <section className={styles['modal']}>
                    { children }
                <button type="button" onClick={handleClose}>
                    Close
                </button>
            </section>
        </div>
    )
}