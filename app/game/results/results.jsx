'use client'

import Modal from '../../components/ui/modal';
import { useState, useContext, useEffect } from 'react'
import { GameContext } from "../../context/GameProvider";


const Results = (() => {

    const [isShown, setIsShown] = useState(false)
    const toggleModal = (() => setIsShown(!isShown))

    const { gameState } = useContext(GameContext)

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
                            <p>the results of the game</p>
                        </div>
                    </Modal>
                }
            </div>
        )
})
export default Results