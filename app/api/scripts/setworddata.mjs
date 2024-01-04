import { getWordData } from '../getworddata.mjs';
// import { supabase } from '../lib/supabase';


async function setData() {
  const res = await fetch(
      `https://www.dictionaryapi.com/api/v3/references/spanish/json/SEÑAL?key=f93960bc-6ff2-47b0-8c4d-08ab510db8ca`
    );
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    } else {
      // TODO: add some validation here
      const data = await res.json();
  
      const newWordData = getWordData(data)
      return newWordData
}}

/* {
  mainDef: 'signal',
  otherDefs: 'sign, signal (with the hand, etc.)',
  exampleEnglish: 'radio/television signals',
  exampleSpanish: 'señales de radio/televisión',
  audio: 'https://media.merriam-webster.com/audio/prons/es/me/mp3/s/senal01sp.mp3',
  examples: [
    {
      english: 'radio/television signals',
      spanish: 'señales de radio/televisión'
    },
    { english: 'traffic sign', spanish: 'señal de tráfico/tránsito' },
    { english: 'smoke signals', spanish: 'señales de humo' },
    { english: 'signs of life', spanish: 'señales de vida' }
  ]
} */

const data = await setData()
// const { word } = await supabase.from('words').select('examples').eq('id', 1);
console.log(data)
