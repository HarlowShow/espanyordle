import { FaLongArrowAltLeft } from "react-icons/fa";
import styles from './Distro.module.css'


const DistroArrow = (() => {
    return (
        <div className={styles['distro-arrow']}>
            <FaLongArrowAltLeft />
            <span>Today!</span>
        </div>
    )
})
export default DistroArrow