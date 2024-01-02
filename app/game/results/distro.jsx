import styles from './Distro.module.css'
import { useState } from 'react'




const DistroBar = (({number, value, frac}) => {

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
            <span className={styles['bar-value']}>({value})</span>
        </div>
        <div></div>
        </>
    )
})

const Distro = (({distro}) => {
    const [max, setMax] = useState(0)
    
    const getWidths = (() => {
        // loop through to get the highest amount;
        for (const key in distro) {
            if (distro[key] > max) {
                setMax(distro[key])
            }
        }
        const frac = 100 / max
        return frac.toFixed(1)
    })

    const fraction = getWidths()
    // divide to get a % fraction
    return (
        <div className={styles['distro-content']}>
        <h2 className='heading'>guess distribution</h2>
        <div className={styles['distro-wrapper']}>
            <DistroBar number={1} value={distro[1]} frac={fraction}></DistroBar>
            <DistroBar number={2} value={distro[2]} frac={fraction}></DistroBar>
            <DistroBar number={3} value={distro[3]} frac={fraction}></DistroBar>
            <DistroBar number={4} value={distro[4]} frac={fraction}></DistroBar>
            <DistroBar number={5} value={distro[5]} frac={fraction}></DistroBar>
            <DistroBar number={6} value={distro[6]} frac={fraction}></DistroBar>
        </div>
        </div>
    )
})
export default Distro