'use client'

import styles from './styles.module.css'
import React, { useEffect, useContext } from 'react'
import { GameContext } from '../context/GameProvider';
import Key from './key'

export default function Input(){

    const { keys, handleKeyboardInput } = useContext(GameContext)
    const rowOne = keys.slice(0, 10)
    const rowTwo = keys.slice(10, 20)
    const rowThree = keys.slice(20, 29)
    const test = true
    // const keyClass = styles.key

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
                { rowOne.map(({key, status}) => (
                    <Key key={key} char={key} status={`${styles[status]}`}>{key}</Key>
                ))}
            </div>
            <div className={styles['keyboard-row']}>
                { rowTwo.map(({key, status}) => (
                    <Key key={key} char={key} status={`${styles[status]}`}>{key}</Key>
                ))}
            </div>
            <div className={styles['keyboard-row']}>
                { rowThree.map(({key, status}) => (
                        <Key key={key} char={key} status={`${styles[status]}`}>{key}</Key>
                ))}
            </div>
            <div className={styles['keyboard-row']}></div>
        </div>
    )
}