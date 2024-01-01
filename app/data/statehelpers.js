

// guesses: string[] | null
// state: 'win' | 'lose' | 'in progress'
export const getLatestGameState = ((guesses, answer) => {
    let state = 'in progress'
    if (guesses && guesses.length > 0) {
        const latestGuess = guesses.pop()
        if (latestGuess === answer) {
            state = 'win'
        } else if (guesses.length === 6) {
            state = 'lose'
        }
    }
    return state
})