'use client'

import styles from './styles.module.css'
import Button from '../components/ui/button'
import { useRouter } from 'next/navigation'

export default function Header() {
    const router = useRouter()
    const goBack = (() => {
      router.push('/')
    })
    return (
        <nav >
            <ul role="menubar" className={styles.nav}>
                <li role="menuitembackbutton"><Button callback={goBack}>Back</Button></li>
                <li role="menuitemtitle"><h3>Espanyordle</h3></li>
                <li role="menuitemhelpbutton"><button>Help</button></li>
            </ul>
        </nav>
    )
}