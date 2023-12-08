'use client'

import Modal from '../../components/ui/modal';
import { useState, useContext, useEffect } from 'react'
import { GameContext } from "../../context/GameProvider";
import { UIContext } from '../../context/UIProvider';
import { isNumber } from '../../data/utils';
// import useDefinition from '../../api/definition'


const Results = (() => {

    const [definition, setDefinition ] = useState('')
    const [moreDefinitions, setMoreDefinitions] = useState(null)
    const [pronounciation, setPronounciation] = useState(null)
    const [audioURL, setAudioURL] = useState('')
    const { showResultsModal, setShowResultsModal } = useContext(UIContext)
    const { gameState, answer } = useContext(GameContext)

    // get the api data (TODO optimize this)
    useEffect(() => {
        async function getDefinition() {
            const res = await fetch(`https://www.dictionaryapi.com/api/v3/references/spanish/json/${answer}?key=${process.env.NEXT_PUBLIC_API_KEY}`)
            if (!res.ok) {
                throw new Error('Failed to fetch data')
            } else {
                // TODO: add some validation here
                const data = await res.json()

                // get the first definition
                const mainDef = data[0].shortdef[0] ?? 'definition not found'
                setDefinition(mainDef)

                // get the pronounciation in MW format (probs nix this)
                const phonetic = data[0].hwi.prs[0].mw ?? null
                setPronounciation(phonetic)

                // get the other definitions (TBC on these)
                const otherDefs = data[0].shortdef.join(', ') ?? 'definition not found'
                setMoreDefinitions(otherDefs)

                // get the audio file
                const audioRef = data[0].hwi.prs[0].sound.audio ?? null
                // for API rules about subdirectories
                // TODO extract this into a helper function
                let subdirectory = ''
                if (audioRef !== null) {
                    const firstThree = audioRef.slice(0, 3)
                    const firstTwo = audioRef.slice(0, 2)
                    const first = audioRef.slice(0, 1)

                    const stringCheck = /[a-záéíóúüñA-ZÁÉÍÓÚÜÑ]+/i

                    if (firstThree === 'bix') {
                        subdirectory = 'bix'
                    } else if (firstTwo === 'gg') {
                        subdirectory = 'gg'
                    } else if (isNumber(first) === true || !!first.match(/^[.,:!?]/)) {
                        // check if it starts with a number or punctuation
                        // TODO properly test this, esp. the regex
                        subdirectory = 'number'
                    } else if (first.match(stringCheck)) {
                        subdirectory = first
                        console.log(first)
                    } else {
                        console.log('no valid subdirectory was found. First char was: ' + first)
                    }

      
                } else {
                    console.log('no audio file found')
                }

                console.log(audioRef)
                const audio = `https://media.merriam-webster.com/audio/prons/es/me/mp3/${subdirectory}/${audioRef}.mp3`
                setAudioURL(audio)
            }
        }
        getDefinition()
    }, [answer])

    // trigger modal open on win
    useEffect(() => {
        console.log('game state changed to ' + gameState)
        if (gameState === 'win' || gameState === 'lose') {
           setShowResultsModal(true)
        }
    }, [gameState, setShowResultsModal])

        return (
            <div>
                { showResultsModal === true && 
                    <Modal handleClose={() => setShowResultsModal(false)}>
                        <div>
                            <h1>The results - win lose thing here</h1>
                            <audio controls src={audioURL}></audio>
                            <h2>{ answer }</h2>
                            <h2>first def: { definition }</h2>
                            { pronounciation && <p>pronounciation: {pronounciation}</p>}
                            <h3>more definitions: { moreDefinitions }</h3>
                        </div>
                    </Modal>
                }
            </div>
        )
})
export default Results