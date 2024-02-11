import styles from './Distro.module.css'
import DistroBar from './distrobar'
import { useState, useContext } from 'react'
import { GameContext } from "@/context/GameProvider";






const Distro = (({distro}) => {
    const [max, setMax] = useState(0)
    const { gameState, guesses } = useContext(GameContext);
    const winDistroNo = gameState === 'win' ? guesses.length : null
    
    const getWidths = (() => {
        // loop through to get the highest amount;
        for (const key in distro) {
            if (distro[key] > max) {
                setMax(distro[key])
            }
        }
        // don't accidentally set the fraction to infinity
        if (max === 0) {
            return 0
        } else {
            const frac = 100 / max
            return frac.toFixed(1)
        }
    })

    // divide to get a % fraction
    const fraction = getWidths()

    return (
        <div className={styles['distro-content']}>
        <h2 className='heading'>guess distribution</h2>
        <div className={styles['distro-wrapper']}>
            <DistroBar number={1} value={distro[1]} winNo={winDistroNo} frac={fraction}></DistroBar>
            <DistroBar number={2} value={distro[2]} winNo={winDistroNo} frac={fraction}></DistroBar>
            <DistroBar number={3} value={distro[3]} winNo={winDistroNo} frac={fraction}></DistroBar>
            <DistroBar number={4} value={distro[4]} winNo={winDistroNo} frac={fraction}></DistroBar>
            <DistroBar number={5} value={distro[5]} winNo={winDistroNo} frac={fraction}></DistroBar>
            <DistroBar number={6} value={distro[6]} winNo={winDistroNo} frac={fraction}></DistroBar>
        </div>
        </div>
    )
})
export default Distro