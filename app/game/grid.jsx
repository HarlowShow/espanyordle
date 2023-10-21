'use client'

import styles from './styles.module.css'
import { useContext } from 'react'
import { GameContext } from '../context/GameProvider';


export default function Grid(){
    const { currentGuess } = useContext(GameContext)
    return (
        <div className={styles['grid-wrapper']}>
            <h2>{currentGuess}</h2>
        </div>
    )
}