'use client'

import styles from './styles.module.css';
import Button from '../ui/button';
import { useRouter } from 'next/navigation';
import { useContext } from 'react'
import Logo from '../logo';
import { GameContext } from "../../context/GameProvider";

export default function Nav () {
    const { gameState } = useContext(GameContext)

    const router = useRouter()
    const goBack = (() => {
      router.push('/')
    })

    const openHelpModal = (() => {
        console.log('help modal will open')
    })

    const openResultsModal = (() => {
        console.log('results modal will open')
    })
    

    return (
        <ul role="menubar" className={styles.nav}>
        <li role="menuitembackbutton"><Button callback={goBack}>Back</Button></li>
        <li className={styles['logo-wrapper']} role="menuitemtitle"><Logo /></li>
        <li role="menuitemhelpbutton"><Button callback={openResultsModal}>Results</Button></li>
        <li role="menuitemhelpbutton"><Button callback={openHelpModal}>Help</Button></li>
        </ul>
    )
}