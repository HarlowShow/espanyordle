const gameStateKey = 'gameState'

export const setGameStateToLocalStorage = ((guesses) => {
    // tbc add answer param, probs need to check if the game changes
    const gameState = {
        guesses
    }
    localStorage.setItem(gameStateKey, JSON.stringify(gameState))
})

export const getGameStateFromLocalStorage = (() => {
    const state = localStorage.getItem(gameStateKey)
    return JSON.parse(state) ?? null
})