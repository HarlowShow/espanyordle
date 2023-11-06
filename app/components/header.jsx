'use client'

import styles from './styles.module.css'
import Button from '../components/ui/button'
import { useRouter } from 'next/navigation'
import Logo from './logo'

export default function Header() {
    const router = useRouter()
    const goBack = (() => {
      router.push('/')
    })

    const openModal = (() => {
        console.log('modal will open')
    })
    return (
        <nav >
            <ul role="menubar" className={styles.nav}>
                <li role="menuitembackbutton"><Button callback={goBack}>Back</Button></li>
                <li className={styles['logo-wrapper']} role="menuitemtitle"><Logo /></li>
                <li role="menuitemhelpbutton"><Button callback={openModal}>Help</Button></li>
            </ul>
        </nav>
    )
}