function createRow(rows, cols, fillValue) {
  return Array.from({ length: rows }, () => Array(cols).fill(fillValue));
}

export const initialState = {
  guesses: createRow(6, 5, ""),
  statuses: createRow(6, 5, "default"),
  currentRow: 0,
  nextLetter: 0,
  message: "",
};

export function reducer(state, action) {
  switch (action.type) {
    case "INSERT_LETTER":
      if (state.nextLetter < 5) {
        const newGuesses = [...state.guesses];
        newGuesses[state.currentRow][state.nextLetter] = action.letter;
        return {
          ...state,
          guesses: newGuesses,
          nextLetter: state.nextLetter + 1,
          message: "",
        };
      }
      return state;

    case "DELETE_LETTER":
      if (state.nextLetter > 0) {
        const newGuesses = [...state.guesses];
        newGuesses[state.currentRow][state.nextLetter - 1] = "";
        return {
          ...state,
          guesses: newGuesses,
          nextLetter: state.nextLetter - 1,
          message: "",
        };
      }
      return state;

    case "SUBMIT_GUESS": {
      const { currentRow, guesses } = state;
      const newStatuses = [...state.statuses];
      const currentGuess = guesses[currentRow];
      const solutionArray = action.solution.split("");

      let isCorrect = true;

      currentGuess.forEach((letter, index) => {
        if (letter === solutionArray[index]) {
          newStatuses[currentRow][index] = "correct";
        } else if (solutionArray.includes(letter)) {
          newStatuses[currentRow][index] = "present";
          isCorrect = false;
        } else {
          newStatuses[currentRow][index] = "absent";
          isCorrect = false;
        }
      });

      if (isCorrect) {
        return {
          ...state,
          statuses: newStatuses,
          message: "泥真棒",
        };
      }

      if (currentRow === 5) {
        return {
          ...JSON.parse(JSON.stringify(initialState)),
          message: "抱歉 你可以再試試看",
        };
      }

      return {
        ...state,
        statuses: newStatuses,
        currentRow: currentRow + 1,
        nextLetter: 0,
        message: "",
      };
    }

    default:
      return state;
  }
}
