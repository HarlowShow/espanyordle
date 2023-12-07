'use client'

import Modal from '../../components/ui/modal';
import { useState, useContext, useEffect } from 'react'
import { GameContext } from "../../context/GameProvider";
// import useDefinition from '../../api/definition'


const Results = (() => {

    const [isShown, setIsShown] = useState(true)
    const [definitions, setDefinitions] = useState(null)
    const toggleModal = (() => setIsShown(!isShown))

    const { gameState, answer } = useContext(GameContext)

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

    useEffect(() => {
        console.log('game state changed to ' + gameState)
        if (gameState === 'win' || gameState === 'lose') {
            setIsShown(true)
        }
    }, [gameState])

        return (
            <div>
                { isShown === true && 
                    <Modal handleClose={toggleModal}>
                        <div>
                            <p>{ definitions }</p>
                        </div>
                    </Modal>
                }
            </div>
        )
})
export default Results