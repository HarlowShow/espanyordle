import styles from './Modal.module.css'
import { IoClose } from "react-icons/io5";
import IconButton from './iconbutton';

export default function Modal({ handleClose, children}) {
    return (
        <div className={styles['modal-wrapper']}>
            <div className={styles['modal']}>
            <div className={styles['modal-header']}>
                <IconButton callback={handleClose}>
                   <IoClose />
                </IconButton>
            </div>
            <div className={styles['modal-content']}>
                    { children }

            </div>
            </div>
        </div>
    )
}