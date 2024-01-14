import styles from './Distro.module.css'
import DistroArrow from './distroarrow'


const DistroBar = (({number, value, winNo, frac}) => {

    const width = `${frac * value}%`
    const distroStyle = {
        'width': width
    }
    // console.log(widthClass)

    // let style = ` ${styles.flip} ` + `${styles[delay]} `;
    return (
        <>
        <span>{number}</span>
        <div className={styles.bar} style={distroStyle}>
            <span className={styles['bar-value']}>{value}</span> 
        </div>
        <div>{ winNo === value && (
                <DistroArrow />
            )}</div>
        </>
    )
})
export default DistroBar