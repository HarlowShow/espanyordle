'use client'

import styles from './styles.module.css';
import Button from '../ui/button';
import IconButton from '../ui/iconbutton';
import { useRouter } from 'next/navigation';
import { useContext } from 'react'
import { LuHelpCircle } from "react-icons/lu";
import { VscGraph } from "react-icons/vsc";
import Logo from '../logo';
import { UIContext } from "../../context/UIProvider";

export default function Nav () {
    const { showHelpModal, showResultsModal, setShowHelpModal, setShowResultsModal } = useContext(UIContext)

    const router = useRouter()
    const goBack = (() => {
      router.push('/')
    })
    

    return (
        <ul role="menubar" className={styles.nav}>
        <li role="menuitembackbutton"><Button callback={goBack}>Back</Button></li>
        <li className={styles['logo-wrapper']} role="menuitemtitle"><Logo /></li>
        <li className={styles['button-group']}>
        <IconButton callback={() => setShowResultsModal(!showResultsModal)}><VscGraph /></IconButton>
        <IconButton callback={() => setShowHelpModal(!showHelpModal)}><LuHelpCircle /></IconButton>
        </li>
        </ul>
    )
}