import { supabase } from '../../lib/supabase/supabase.mjs';

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


const { data } = await supabase.from('words').select('word, examples, maindef, audio_url').eq('id', 1);
console.log(data)