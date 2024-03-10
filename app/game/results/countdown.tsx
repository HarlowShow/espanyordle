import useCountdown from '../../hooks/usecountdown'


const Countdown = () => {
    const time = useCountdown()
    return (
        <>
                <div>
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
                </div>
        </>
    )
}

export default Countdown