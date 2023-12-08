'use client'

import Modal from '../../components/ui/modal';
import { useState, useContext, useEffect, useCallback } from 'react'
import { GameContext } from "../../context/GameProvider";
import { UIContext } from '../../context/UIProvider';
// import useDefinition from '../../api/definition'


const Results = (() => {

    const [definitions, setDefinitions] = useState(null)
    const { showResultsModal, setShowResultsModal } = useContext(UIContext)
    const { gameState, answer } = useContext(GameContext)

    // get the api data (TODO optimize this)
    useEffect(() => {
        async function getDefinition() {
            const res = await fetch(`https://www.dictionaryapi.com/api/v3/references/spanish/json/${answer}?key=${process.env.NEXT_PUBLIC_API_KEY}`)
            if (!res.ok) {
                throw new Error('Failed to fetch data')
            } else {
                const data = await res.json()
                const defs = data[0].shortdef
                const defsText = defs.join(', ')
                setDefinitions(defsText)
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
                            <h2>The results</h2>
                            <p>{ definitions }</p>
                        </div>
                    </Modal>
                }
            </div>
        )
})
export default Results