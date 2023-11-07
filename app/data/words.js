export const WORDS = [
    'NUEVO'
]

export const getAnswer = (() => {
    return WORDS[Math.floor(Math.random() * WORDS.length)]
})