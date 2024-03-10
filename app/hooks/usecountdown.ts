import { useState, useEffect } from 'react'
import { ZERO_DAY_WORDLE } from '../data/config'
import { getCountdown } from '../data/countdown'

const useCountdown = (() => {

    const [time, setTime] = useState(getCountdown(ZERO_DAY_WORDLE, Date.now()))

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTime(getCountdown(ZERO_DAY_WORDLE, Date.now()))
        }, 1000)

        return () => clearInterval(intervalId)
    })

    return time

})

export default useCountdown