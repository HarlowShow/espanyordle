'use client'

import Button from './components/ui/button';
import styles from './Home.module.css';
import { useRouter } from 'next/navigation';
import Logo from './components/ui/logo';
import Help from './game/help/help';
// import { createClient } from '@/utils/supabase/server';
//   import { cookies } from 'next/headers';


export default function Home() {

  const router = useRouter()
  const goToGame = (() => {
    router.push('/game')
  })
  return (
    <div className={styles.home}>
            <Help />
         <div className={styles['home-content']}>
         <Logo />
         <h1>(Españordle)</h1>
      <h2>A Daily Word Game For Spanish Learners</h2>
      <div className={styles['button-wrapper']}>
      <Button callback={goToGame} label={"play"}>PLAY</Button>
      </div>

         </div>
    </div>
  );
}
