export const WORDS = [
    'TOWEL',
    'FLAKE',
    'DONUT'
]

export const getAnswer = (() => {
    return WORDS[Math.floor(Math.random() * WORDS.length)]
})