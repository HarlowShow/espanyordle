'use client'

import Button from './components/ui/button';
import styles from './page.module.css'
import { useRouter } from 'next/navigation'


export default function Home() {
  const router = useRouter()
  const goToGame = (() => {
    router.push('/game')
  })
  return (
    <div className={styles.home}>
      <h2>A daily word game for spanish learners</h2>
      <Button callback={goToGame} label={"play"}>Play</Button>
    </div>
  );
}
