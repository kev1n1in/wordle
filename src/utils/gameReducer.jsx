import { produce } from "immer";

function createRow(rows, cols, fillValue) {
  return Array.from({ length: rows }, () => Array(cols).fill(fillValue));
}

export const initialState = {
  guesses: createRow(6, 5, ""),
  statuses: createRow(6, 5, "default"),
  currentRow: 0,
  nextLetter: 0,
  message: "",
  solution: "",
};

export const reducer = produce((state, action) => {
  switch (action.type) {
    case "SET_SOLUTION":
      state.solution = action.solution;
      break;

    case "INSERT_LETTER":
      if (state.nextLetter < 5) {
        state.guesses[state.currentRow][state.nextLetter] = action.letter;
        state.nextLetter += 1;
        state.message = "";
      }
      break;

    case "DELETE_LETTER":
      if (state.nextLetter > 0) {
        state.guesses[state.currentRow][state.nextLetter - 1] = "";
        state.nextLetter -= 1;
        state.message = "";
      }
      break;

    case "SUBMIT_GUESS": {
      if (state.currentRow === 5) {
        return { ...initialState, message: "抱歉 你可以再試試看" };
      }

      return produce(state, (draft) => {
        const { currentRow, guesses, solution } = draft;
        const currentGuess = guesses[currentRow];
        const solutionArray = solution.split("");

        let isCorrect = true;

        currentGuess.forEach((letter, index) => {
          if (letter === solutionArray[index]) {
            draft.statuses[currentRow][index] = "correct";
          } else if (solutionArray.includes(letter)) {
            draft.statuses[currentRow][index] = "present";
            isCorrect = false;
          } else {
            draft.statuses[currentRow][index] = "absent";
            isCorrect = false;
          }
        });

        if (isCorrect) {
          draft.message = "泥真棒";
        } else {
          draft.currentRow += 1;
          draft.nextLetter = 0;
          draft.message = "";
        }
      });
    }

    default:
      return state;
  }
});
