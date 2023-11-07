export const removeAccents = ((answer) => {
  // create a version of the answer with accents removed
  const answerChars = answer.split('');
  const result = []

  for (let i = 0; i < answerChars.length; i++) {
    switch (answerChars[i]) {
      case 'Ú':
        result.push('U')
      break;
      case 'É':
        result.push('E')
      break;
      case 'Á':
        result.push('A')
      break;
      case 'Í':
        result.push('I')
      break;
      case 'Ó':
        result.push('O')
      break;
      case 'Ü':
        result.push('U')
      break;
      default:
        result.push(answerChars[i])
    }
  }
  return result
})


export const checkGuess = ((guess, answer) => {
    const SOLVED_CHAR = '✓';
    
    if (!guess) {
      return null;
    }
    
    const guessChars = guess.toUpperCase().split('');
   
    const answerChars = removeAccents(answer)

  const result = [];

  // Step 1: Look for correct letters.
  for (let i = 0; i < guessChars.length; i++) {
    if (guessChars[i] === answerChars[i]) {
      result[i] = {
        letter: guessChars[i],
        status: 'correct',
      };
      answerChars[i] = SOLVED_CHAR;
      guessChars[i] = SOLVED_CHAR;
    }
  }

  // Step 2: look for misplaced letters. If it's not misplaced,
  // it must be incorrect.
  for (let i = 0; i < guessChars.length; i++) {
    if (guessChars[i] === SOLVED_CHAR) {
      continue;
    }

    let status = 'incorrect';
    const misplacedIndex = answerChars.findIndex(
      (char) => char === guessChars[i]
    );
    if (misplacedIndex >= 0) {
      status = 'misplaced';
      answerChars[misplacedIndex] = SOLVED_CHAR;
    }

    result[i] = {
      letter: guessChars[i],
      status,
    };
  }

  return result;
})