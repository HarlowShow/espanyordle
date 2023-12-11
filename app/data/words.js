export const WORDS = [
    'APURO'
]

export const getAnswer = (() => {
    return WORDS[Math.floor(Math.random() * WORDS.length)]
})