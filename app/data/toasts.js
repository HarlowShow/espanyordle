const WIN_TOASTS = [
    '¡Bravo!', '¡Bien hecho!', '¡Muy Bien!'
]

const LOSE_TOASTS = [
    'Not today', 'Better luck next time', 'There&apos;s always tomorrow', 'Them&apos;s the breaks'
]

export const getRandomToast = ((condition) => {
    if (condition === 'win') {
        return WIN_TOASTS[Math.floor(Math.random()*WIN_TOASTS.length)];
    } else if (condition === 'lose') {
        return LOSE_TOASTS[Math.floor(Math.random()*LOSE_TOASTS.length)];

    }
})