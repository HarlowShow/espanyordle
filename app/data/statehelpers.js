// guesses: string[] | null
// state: 'win' | 'lose' | 'in progress'
export const getLatestGameState = (guesses, answer, latestAnswer) => {
  if (answer) {
    const length = guesses.length;

    let state = "in progress";
    if (guesses && guesses.length > 0) {
      const latestGuess = guesses.pop();
      if (latestGuess.guess === answer && latestGuess.guess === latestAnswer) {
        state = "win";
      } else if (length === 6 && latestGuess.answer === answer) {
        state = "lose";
      }
    }
    return state;
  }
};

export const getModeIndexFromSearchParams = async (searchParams) => {
  const mode = searchParams.mode;
  const modeIndex = mode === "easy" ? "easy_index" : "index";
  return modeIndex;
};

export const getModeFromSearchParams = (searchParams) => {
  const mode = searchParams.get("mode");
  return mode;
};
