import { setStatsInLocalStorage, getStatsFromLocalStorage } from "./localstorage"

// win: true/false
// winDistro: 1-6 | null
const initStats = {
    played: 0,
    won: 0,
    distro: {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0
    }
}

export const updateStats = ((hasWon, winDistro) => {

    let currentStats = getStatsFromLocalStorage()

    if (currentStats === null) {
        console.log('stats assigned for the first time')
        currentStats = initStats
    }

    const nextPlayed = currentStats.played + 1
    const nextWon = hasWon === true ? currentStats.won + 1 : currentStats.won
    let nextDistro = currentStats.distro
    if (hasWon === true) {
        nextDistro = currentStats.distro
        nextDistro[winDistro] += 1   
    }

    const nextStats = {
        played: nextPlayed,
        won: nextWon,
        distro: nextDistro
    }

    setStatsInLocalStorage(nextStats)
})