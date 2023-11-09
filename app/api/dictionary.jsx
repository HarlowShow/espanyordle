import Definition from '../components/definition.jsx'

async function getDefinition() {
    console.log('function called')
    const res = await fetch(`https://www.dictionaryapi.com/api/v3/references/spanish/json/polvo?key=${process.env.WEBSTER_API}`)
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
    return res.json()
    
}


 


export default async function Dictionary({word}) {
    const data = await getDefinition()


    // get the overall short definitions
    const definitions = data[0].shortdef
    const definitionsText = definitions.join(', ')
    // get the english and spanish example phrases
    const exampleEnglish = data[0].def[0].sseq[0][0][1].dt.slice(-1)[0][1][0].tr
    const exampleSpanish = data[0].def[0].sseq[0][0][1].dt.slice(-1)[0][1][0].t

    if (data) {
        return<Definition definition={definitionsText} exampleEnglish={exampleEnglish} exampleSpanish={exampleSpanish}/>
    } else {
        return <span>loading</span>
    }
}