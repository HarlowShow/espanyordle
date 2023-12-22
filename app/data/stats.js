import { setStatsInLocalStorage, getStatsFromLocalStorage } from "./localstorage"
import { getDailyIndex } from './helpers'

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
    },
    lastPlayedIdx: null,
    currentStreak: 0,
    longestStreak: 0,
}

export const updateStats = ((hasWon, winDistro) => {

    const todaysIndex = getDailyIndex()
    let currentStats = getStatsFromLocalStorage()

    if (currentStats === null) {
        console.log('stats assigned for the first time')
        currentStats = initStats
    }
    // update played and hasWon stats
    const nextPlayed = currentStats.played + 1
    const nextWon = hasWon === true ? currentStats.won + 1 : currentStats.won

    // if it's zero it means something's gone wrong.
    // TODO make this safer once it's working
    let nextCurrentStreak = 0

    // check if there's a game played. If so check if it was yesterday's game
    if (currentStats.latestGameIdx && todaysIndex - currentStats.lastPlayedIdx === 1) {
        console.log('streak continued!')
        nextCurrentStreak = currentStats.currentStreak + 1
    } else {
        nextCurrentStreak = 1
    }

    // if the new streak is longer than the old one, update it
    const nextLongestStreak = currentStats.longestStreak > nextCurrentStreak ? currentStats.longestStreak : nextCurrentStreak


    let nextDistro = currentStats.distro
    if (hasWon === true) {
        nextDistro = currentStats.distro
        nextDistro[winDistro] += 1   
    }

    const nextStats = {
        played: nextPlayed,
        won: nextWon,
        distro: nextDistro,
        lastPlayedIdx: todaysIndex,
        currentStreak: nextCurrentStreak,
        longestStreak: nextLongestStreak
    }

    setStatsInLocalStorage(nextStats)
})