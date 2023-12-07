'use client'
import { useState, useEffect } from 'react'

export default function Test() {
    const [definitions, setDefinitions] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetch(`https://www.dictionaryapi.com/api/v3/references/spanish/json/polvo?key=${process.env.NEXT_PUBLIC_API_KEY}`)
        .then((res) => res.json())
        .then((data) => {

        // get the overall short definitions
        const defs = data[0].shortdef
        const defsText = defs.join(', ')
    // get the english and spanish example phrases
    // const exampleEnglish = data[0].def[0].sseq[0][0][1].dt.slice(-1)[0][1][0].tr
    // const exampleSpanish = data[0].def[0].sseq[0][0][1].dt.slice(-1)[0][1][0].t

            setDefinitions(defsText)
            setIsLoading(false)
        })
    }, [definitions])

    if (isLoading) return <p>Loading...</p>
    if (!definitions) return <p>No profile data</p>
   
    return (
      <div>
        <h1>{definitions}</h1>
      </div>
    )
}