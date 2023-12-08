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

    // const shouldBeTrue = isNumber('2')
    // const shouldBeFalse = isNumber('b')

    console.log(shouldBeTrue, shouldBeFalse)

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
                let subdirectory = ''
                if (audioRef !== null) {
                    const firstThree = audioRef.slice(0, 3)
                    const firstTwo = audioRef.slice(0, 2)
                    const first = audioRef.slice(0)

                    if (firstThree === 'bix') {
                        subdirectory = 'bix'
                    } else if (firstTwo === 'gg') {
                        subdirectory = 'gg'
                    } else if (isNumber(first) === true) {
                        // check if it starts with a number
                        subdirectory = 'number'
                    }
      
                } else {
                    console.log('no audio file found')
                }

                console.log(audioRef)
                const audio = `https://media.merriam-webster.com/audio/prons/es/me/mp3/[tbc]/[filename].mp3`
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
                            <h2>{ answer }</h2>
                            <h2>{ definition }</h2>
                            { pronounciation && <p>{pronounciation}</p>}
                            <h3>{ moreDefinitions }</h3>
                        </div>
                    </Modal>
                }
            </div>
        )
})
export default Results