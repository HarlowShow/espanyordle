'use client'

import styles from './styles.module.css'
import GameProvider from '../../context/GameProvider';

import Nav from './nav'

export default function Header() {

    return (
        <nav >
            <GameProvider>
            <Nav />
            </GameProvider>
        </nav>
    )
}