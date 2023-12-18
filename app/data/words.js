// TODO: test on dates with specific timestamps
// if you know how many miliseconds in a day you could just remainder that 
export const calcIndex = (() => {
    const startDate = new Date(2023, 11, 18)
    const threeDaysLater = new Date(2023, 11, 21)
    const initTimeStamp = startDate.getTime()
    const newTimeStamp = threeDaysLater.getTime()
    console.log(initTimeStamp)
    console.log(newTimeStamp)

    let diff = 0

    if (newTimeStamp > initTimeStamp) {
        diff = newTimeStamp - initTimeStamp
    } else {
        console.warn('error processing date')
    }
    const hours = Math.floor((diff / 1000 / 60 / 60))
    console.log('difference is: ' + diff)
    console.log('in hours that is: ' + hours)
})

// index for testing words
const testIndex = 0
// ÁÉÍÓÜÑ

export const WORDS = [
    'APURO',
    'NUEVO',
    'MUSEO',
    'TEMER',
    'AZADA',
    'FALDA',
    'BORDE',
    'VOLAR',
    'FONDO',
    'FARDO',
    'GRADO',
    'HONDO',
    'NOPAL',
    'SEÑAL',
    'BESAR',
    'CAVAR',
    'CAZAR',
    'COLAR',
    'DAÑAR',
    'SEGÚN',
    'LUGAR',
    'ASOMO',
    'MOJAR',
    'ATAJO',
    'AVENA',
    'PASEO',
    'HUEVO',
    'FÓSIL',
    'FRENO',
    'ABAJO',


]

export const getAnswer = (() => {

        return WORDS[WORDS.length -1]
})