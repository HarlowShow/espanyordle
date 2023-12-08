'use client'

import styles from './styles.module.css';
import Button from '../ui/button';
import { useRouter } from 'next/navigation';
import { useContext } from 'react'
import Logo from '../logo';
import { UIContext } from "../../context/UIProvider";

export default function Nav () {
    const { showHelpModal, showResultsModal, setShowHelpModal, setShowResultsModal, logModalState } = useContext(UIContext)

    const router = useRouter()
    const goBack = (() => {
      router.push('/')
    })

    logModalState()
    

    return (
        <ul role="menubar" className={styles.nav}>
        <li role="menuitembackbutton"><Button callback={goBack}>Back</Button></li>
        <li className={styles['logo-wrapper']} role="menuitemtitle"><Logo /></li>
        <li role="menuitemhelpbutton"><Button callback={() => setShowResultsModal(!showResultsModal)}>Results</Button></li>
        <li role="menuitemhelpbutton"><Button callback={() => setShowHelpModal(!showHelpModal)}>Help</Button></li>
        </ul>
    )
}