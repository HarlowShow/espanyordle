export const WORDS = [
    'apuro'
]

export const getAnswer = (() => {
    return WORDS[Math.floor(Math.random() * WORDS.length)]
})