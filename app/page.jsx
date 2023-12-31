'use client'

import Button from './components/ui/button';
import styles from './Home.module.css';
import { useRouter } from 'next/navigation';
import Logo from './components/ui/logo';
import Help from './game/help/help';


export default function Home() {
  const router = useRouter()
  const goToGame = (() => {
    router.push('/game')
  })
  return (
    <div className={styles.home}>
            <Help />
         <Logo />
         <h1>(Españordle)</h1>
      <h2>A daily word game for spanish learners</h2>
      <div className={styles['button-wrapper']}>
      <Button callback={goToGame} label={"play"}>PLAY</Button>
      </div>
    </div>
  );
}
