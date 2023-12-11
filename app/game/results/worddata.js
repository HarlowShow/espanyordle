import { isNumber } from "../../data/utils";

export const getWordData = (data) => {
  // the main definition
  const mainDef = data[0].shortdef[0] ?? null;
  // alternative meanings
  const otherDefs = data[0].shortdef.slice(1).join(", ") ?? null;
  // example sentences - array of tuples
  let examples = [];

  const exampleEnglish =
    data[0].def[0].sseq[0][0][1].dt.slice(-1)[0][1][0].tr ?? null;
  const exampleSpanish =
    data[0].def[0].sseq[0][0][1].dt.slice(-1)[0][1][0].t ?? null;

  const senses = data[0].def[0].sseq;

  for (let i = 0; i < senses.length; i++) {
    const exampleE =
      data[0].def[0].sseq[i][0][1].dt.slice(-1)[0][1][0].tr ?? null;
    const exampleS =
      data[0].def[0].sseq[i][0][1].dt.slice(-1)[0][1][0].t ?? null;
    if (exampleE && exampleS) {
      examples.push({
        english: exampleE,
        spanish: exampleS,
        key: crypto.randomUUID(),
      });
    }
  }

  console.log(examples);

  // get the URL for the audio
  const audioRef = data[0].hwi.prs[0].sound.audio ?? null;

  let subdirectory = "";
  if (audioRef !== null) {
    const firstThree = audioRef.slice(0, 3);
    const firstTwo = audioRef.slice(0, 2);
    const first = audioRef.slice(0, 1);

    const stringCheck = /[a-záéíóúüñA-ZÁÉÍÓÚÜÑ]+/i;

    if (firstThree === "bix") {
      subdirectory = "bix";
    } else if (firstTwo === "gg") {
      subdirectory = "gg";
    } else if (isNumber(first) === true || !!first.match(/^[.,:!?]/)) {
      // check if it starts with a number or punctuation
      // TODO properly test this, esp. the regex
      subdirectory = "number";
    } else if (first.match(stringCheck)) {
      subdirectory = first;
      console.log(first);
    } else {
      console.log("no valid subdirectory was found. First char was: " + first);
    }
  } else {
    console.log("no audio file found");
  }

  const audio = `https://media.merriam-webster.com/audio/prons/es/me/mp3/${subdirectory}/${audioRef}.mp3`;
  return {
    mainDef,
    otherDefs,
    exampleEnglish,
    exampleSpanish,
    audio,
    examples,
  };
};
