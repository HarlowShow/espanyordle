const startDate = new Date(2023, 11, 17)



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