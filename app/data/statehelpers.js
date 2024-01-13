

// guesses: string[] | null
// state: 'win' | 'lose' | 'in progress'
export const getLatestGameState = (async(guesses, answer) => {
    if (answer) {
        const length = guesses.length
        // console.log(length)
        let state = 'in progress'
        // console.log(guesses, answer)
        if (guesses && guesses.length > 0) {
            const latestGuess = guesses.pop()
            if (latestGuess.guess === answer) {
                state = 'win'
            } else if (length === 6) {
                state = 'lose'
            }
        }
        // console.log('about to return latest game stte of: ' + state)
        return state
    }
})

export const getModeIndexFromSearchParams = (async(searchParams) => {
    const mode = searchParams.mode
    const modeIndex = mode === 'easy' ? 'easy_index' : 'index'
    return modeIndex
  })


  export const getModeFromSearchParams = ((searchParams) => {
    // console.log(searchParams)
    const mode = searchParams.get('mode')
    // console.log(mode)
    return mode
  })



