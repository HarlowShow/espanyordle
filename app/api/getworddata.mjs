

// TESTING WORDS:
// BURRO - multiple entries in data array

export const getWordData = (data) => {

  const isNumber = ((string) => {
    const num = Number(string);
    const isNum = Number.isInteger(num)
    return isNum
  });

  // the main definition
  const mainDef = data[0]?.shortdef[0] ?? null;
  // word type
//   const wordType = data[0].fl ?? null;
//   console.log(wordType)
  // alternative meanings
  const otherDefs = data[0]?.shortdef?.slice(1).join(", ") ?? null;
  // example sentences - array of tuples
  let examples = [];

  const exampleEnglish =
    data[0]?.def[0]?.sseq[0][0][1]?.dt?.slice(-1)[0][1][0]?.tr ?? null;
  const exampleSpanish =
    data[0]?.def[0]?.sseq[0][0][1]?.dt?.slice(-1)[0][1][0]?.t ?? null;

    // console.log(data[0].def[0].sseq[0][0][1].dt)

  const senses = data[0]?.def[0]?.sseq;

  for (let i = 0; i < senses.length; i++) {
    const exampleE =
      data?.[0].def?.[0].sseq[i][0][1]?.dt?.slice(-1)[0][1][0]?.tr ?? null;
    const exampleS =
      data?.[0].def?.[0].sseq[i][0][1]?.dt?.slice(-1)[0][1][0]?.t ?? null;
    if (exampleE && exampleS) {
      examples.push({
        english: exampleE,
        spanish: exampleS,
      });
    }
  }

  // get the URL for the audio
  const audioRef = data?.[0].hwi?.prs?.[0].sound?.audio ?? null;

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
    } else {
      console.log("no valid subdirectory was found. First char was: " + first);
    }
  } else {
    console.log("no audio file found");
    subdirectory = null
  }

  // add something here so that audioref returns null if audioref not found
  const audio = subdirectory ? `https://media.merriam-webster.com/audio/prons/es/me/mp3/${subdirectory}/${audioRef}.mp3` : null
  return {
    mainDef,
    otherDefs,
    exampleEnglish,
    exampleSpanish,
    audio,
    examples,
  };
};
