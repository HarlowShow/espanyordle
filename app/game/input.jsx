'use client'

import styles from './styles.module.css'
import React, { useEffect, useContext } from 'react'
import { GameContext } from '../context/GameProvider';

export default function Input(){

    const { keys, handleUIKeyboardInput } = useContext(GameContext)
    const rowOne = keys.slice(0, 10)
    const rowTwo = keys.slice(10, 19)
    const rowThree = keys.slice(19, 28)

    useEffect(() => {
        console.log(keys)
    }, [keys])
    return (
        <div className={styles['keyboard-wrapper']}>
            <div className={styles['keyboard-row']}>
                { rowOne.map(({key}) => (
                    <div className={styles.key} key={key} onClick={() => handleUIKeyboardInput(key)}>
                        <span>{key}</span>
                    </div>
                ))}
            </div>
            <div className={styles['keyboard-row']}>
                { rowTwo.map(({key}) => (
                    <div className={styles.key} key={key} onClick={() => handleUIKeyboardInput(key)}>
                        <span>{key}</span>
                    </div>
                ))}
            </div>
            <div className={styles['keyboard-row']}>
                { rowThree.map(({key}) => (
                    <div className={styles.key} key={key} onClick={() => handleUIKeyboardInput(key)}>
                        <span>{key}</span>
                    </div>
                ))}
            </div>
            <div className={styles['keyboard-row']}></div>
        </div>
    )
}