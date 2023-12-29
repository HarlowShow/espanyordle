'use client'

import Button from './components/ui/button';
import { useRouter } from 'next/navigation'


export default function Home() {
  const router = useRouter()
  const goToGame = (() => {
    router.push('/game')
  })
  return (
    <div>
      <h1>the home page is here</h1>
      <Button callback={goToGame} label={"play"}>Play</Button>
    </div>
  );
}
