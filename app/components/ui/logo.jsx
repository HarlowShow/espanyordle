'use client'
import styles from './styles.module.css';

export default function Logo () {
    return (
        <div className={styles['logo-wrapper']}>
        <div className={styles['logo-row']}>
            <span>E</span>
            <span>S</span>
            <span>P</span>
            <span>A</span>
            <span>Ñ</span>
        </div>
        <div className={styles['logo-row']}>
            <span>O</span>
            <span>R</span>
            <span>D</span>
            <span>L</span>
            <span>E</span>
        </div>
        </div>
    )
    
}