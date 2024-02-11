import styles from './Distro.module.css'
import DistroArrow from './distroarrow'


const DistroBar = (({number, value, winNo, frac}) => {

    const width = value === 0 ? `7%`: `${frac * value}%`
    const color = winNo === number ? '#478d7b' : '#747474';
    const distroStyle = {
        'width': width,
        'backgroundColor': color
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