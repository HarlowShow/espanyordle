'use client'

import styles from './styles.module.css'
import { useContext} from 'react'
import { GameContext } from '../context/GameProvider';
import { range } from '../data/utils'


export default function Grid(){
    const { currentGuess, guesses } = useContext(GameContext)
    const guessesRemaining = 5 - guesses.length
    return (
        <div className={styles['grid-wrapper']}>
            <div className={styles['grid']}>
            { guesses.map(({guess, id}) => (
                <p className = {styles['guess-row']} key={id}>
                <span className={styles['cell']}>{guess[0]}</span>
                <span className={styles['cell']}>{guess[1]}</span>
                <span className={styles['cell']}>{guess[2]}</span>
                <span className={styles['cell']}>{guess[3]}</span>
                <span className={styles['cell']}>{guess[4]}</span>
                </p>
            ))}
            <p className={styles['guess-row']}>
                <span className={styles['cell']}>{currentGuess[0]}</span>
                <span className={styles['cell']}>{currentGuess[1]}</span>
                <span className={styles['cell']}>{currentGuess[2]}</span>
                <span className={styles['cell']}>{currentGuess[3]}</span>
                <span className={styles['cell']}>{currentGuess[4]}</span>
            </p>
            { range(guessesRemaining).map((num) => (
                  <p className = {styles['guess-row']} key={num}>
 <span className={styles['cell']}></span>
 <span className={styles['cell']}></span>
 <span className={styles['cell']}></span>
 <span className={styles['cell']}></span>
 <span className={styles['cell']}></span>
                  </p>
            ))}
            </div>
        </div>
    )
}