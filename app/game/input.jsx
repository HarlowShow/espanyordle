'use client'

import styles from './styles.module.css'
import React, { useEffect, useContext } from 'react'
import { GameContext } from '../context/GameProvider';

export default function Input(){

    const { keys, handleKeyboardInput } = useContext(GameContext)
    const rowOne = keys.slice(0, 10)
    const rowTwo = keys.slice(10, 20)
    const rowThree = keys.slice(20, 29)

    useEffect(() => {
        const handleInput = ((event) => {
            const key = event.key.toUpperCase()
            handleKeyboardInput(key)
        })

        window.addEventListener('keydown', handleInput)

        return () => {
            window.removeEventListener('keydown', handleInput)
        }
    }, [handleKeyboardInput])
    return (
        <div className={styles['keyboard-wrapper']}>
            <div className={styles['keyboard-row']}>
                { rowOne.map(({key}) => (
                    <button className={styles.key} key={key} onClick={() => handleKeyboardInput(key)}>
                        <span>{key}</span>
                    </button>
                ))}
            </div>
            <div className={styles['keyboard-row']}>
                { rowTwo.map(({key}) => (
                    <button className={styles.key} key={key} onClick={() => handleKeyboardInput(key)}>
                        <span>{key}</span>
                    </button>
                ))}
            </div>
            <div className={styles['keyboard-row']}>
                { rowThree.map(({key}) => (
                    <button className={styles.key} key={key} onClick={() => handleKeyboardInput(key)}>
                        <span>{key}</span>
                    </button>
                ))}
            </div>
            <div className={styles['keyboard-row']}></div>
        </div>
    )
}