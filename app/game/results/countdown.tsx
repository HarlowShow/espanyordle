import useCountdown from '../../hooks/usecountdown'
import styles from "./Sharebar.module.css";


const Countdown = () => {
    const time = useCountdown()
    return (
        <>
                <div className={styles['countdown-wrapper']}>
                    <span className={styles['countdown-label']}>Next game in:</span>
                    <span className={styles['countdown']}>
                    {time.hoursUntil.toLocaleString('en-US', {
                        minimumIntegerDigits: 2,
                    })}{' '}
                    :{' '}
                    {time.minutesUntil.toLocaleString('en-US', {
                        minimumIntegerDigits: 2,
                    })}{' '}
                    :{' '}
                    {time.secondsUntil.toLocaleString('en-US', {
                        minimumIntegerDigits: 2,
                    })}
                    </span>
                </div>
        </>
    )
}

export default Countdown