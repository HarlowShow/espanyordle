'use client'

const Definition = (({definition, exampleEnglish, exampleSpanish}) => {

        return (
            <div>
                <p>{definition}</p>
                <p>{exampleSpanish}</p>
                <p>{exampleEnglish}</p>
            </div>
        )
       
})

export default Definition