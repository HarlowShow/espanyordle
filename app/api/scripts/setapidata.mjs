import { WORDS } from "../../data/wordhelpers.mjs";
import { getAPIWordData } from "./getapiworddata.mjs";
import { supabase } from "../../lib/supabase/supabase.mjs";
const idx = 4;

async function setData(word) {
  const res = await fetch(
    `https://www.dictionaryapi.com/api/v3/references/spanish/json/${word}?key=f93960bc-6ff2-47b0-8c4d-08ab510db8ca`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  } else {
    // TODO: add some validation here
    const data = await res.json();

    const newWordData = getAPIWordData(data);
    return newWordData;
  }
}

// console.log(data)

for (let idx = 150; idx < WORDS.length - 3; idx++) {
  const data = await setData(WORDS[idx]);
  const { error } = await supabase.from("words-prod").insert({
    id: idx + 1,
    word: WORDS[idx],
    maindef: data.mainDef,
    audio_url: data.audio,
    examples: data.examples,
    other_defs: data.otherDefs,
  });

  if (error) {
    console.log(error);
  }
}

// Updates the data

// const { word } = await supabase.from('words').select('examples').eq('id', 1);

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
