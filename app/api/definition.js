async function getDefinition() {
    const res = await fetch(`https://dictionaryapi.com/api/v3/references/spanish/json/test?key=${process.env.API_KEY}`)
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
    return res
}

export default async function useDefinition() {
    
    const data = await getDefinition()
    console.log('data: ' + data)

    // get the overall short definitions
    const definitions = data[0].shortdef ?? 'definitions not found'
    // const definitionsText = definitions.join(', ') ?? null
    // get the english and spanish example phrases
    const exampleEnglish = data[0].def[0].sseq[0][0][1].dt.slice(-1)[0][1][0].tr ?? 'example english not found'
    const exampleSpanish = data[0].def[0].sseq[0][0][1].dt.slice(-1)[0][1][0].t ?? 'example spanish not found'

    return [
        definitions,
        exampleEnglish,
        exampleSpanish
    ]
}