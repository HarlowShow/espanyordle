'use client'

const gameStateKey = 'gameState'
const statsKey = 'stats'

export const setGameStateToLocalStorage = ((guesses) => {
    // tbc add answer param, probs need to check if the game changes
    const gameState = {
        guesses
    }

    localStorage.setItem(gameStateKey, JSON.stringify(gameState))
})

export const getGameStateFromLocalStorage = (() => {

    const state = localStorage.getItem(gameStateKey)
    
    return state ? JSON.parse(state) : null
})

export const setStatsInLocalStorage = ((stats) => {
    localStorage.setItem(statsKey, JSON.stringify(stats))
})

export const getStatsFromLocalStorage = (() => {

    const stats = localStorage.getItem(statsKey)
    
    return stats ? JSON.parse(stats) : null
})