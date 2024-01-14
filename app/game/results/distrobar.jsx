import styles from './Distro.module.css'
import DistroArrow from './distroarrow'


const DistroBar = (({number, value, winNo, frac}) => {

    const width = `${frac * value}%`
    const distroStyle = {
        'width': width
    }
    return (
        <>
        <span>{number}</span>
        <div className={styles.bar} style={distroStyle}>
            <span className={styles['bar-value']}>{value}</span> 
        </div>
        <div>{ winNo === number && (
                <DistroArrow />
            )}</div>
        </>
    )
})
export default DistroBar