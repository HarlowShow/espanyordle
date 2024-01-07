// takes a string and returns the version with no accents

export const removeAccentsString = (answer) => {
    // create a version of the answer with accents removed
    const answerChars = answer.split("");
    let result = '';
  
    for (let i = 0; i < answerChars.length; i++) {
      switch (answerChars[i]) {
        case "Ú":
          result += "U"
          break;
        case "É":
            result += "E"
          break;
        case "Á":
            result += "A"
          break;
        case "Í":
            result += "I"
          break;
        case "Ó":
            result += "O"
          break;
        case "Ü":
            result += "U"
          break;
        default:
            result += answerChars[i];
      }
    }
    return result
  };
  