import { produce } from "immer";
import { Status } from "../types/StatusType";

export interface State {
  guesses: string[][];
  statuses: Status[][];
  currentRow: number;
  nextLetter: number;
  message: string;
  solution: string;
}

export type Action =
  | { type: "SET_SOLUTION"; solution: string }
  | { type: "INSERT_LETTER"; letter: string }
  | { type: "DELETE_LETTER" }
  | { type: "SUBMIT_GUESS" };

function createRow<T>(rows: number, cols: number, fillValue: T): T[][] {
  return Array.from({ length: rows }, () => Array(cols).fill(fillValue));
}

export const initialState: State = {
  guesses: createRow(6, 5, ""),
  statuses: createRow(6, 5, Status.Default),
  currentRow: 0,
  nextLetter: 0,
  message: "",
  solution: "",
};

export const reducer = produce((state: State, action: Action) => {
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
      if (state.nextLetter !== 5) {
        return state;
      }
      if (state.currentRow === 5) {
        return {
          ...initialState,
          message: "抱歉 你可以再試試看",
        };
      }

      const currentGuess = state.guesses[state.currentRow];
      const solutionArray = state.solution.split("");

      let isCorrect = true;

      currentGuess.forEach((letter, index) => {
        if (letter === solutionArray[index]) {
          state.statuses[state.currentRow][index] = Status.Correct;
        } else if (solutionArray.includes(letter)) {
          state.statuses[state.currentRow][index] = Status.Present;
          isCorrect = false;
        } else {
          state.statuses[state.currentRow][index] = Status.Absent;
          isCorrect = false;
        }
      });

      if (isCorrect) {
        state.message = "泥真棒";
      } else {
        state.currentRow += 1;
        state.nextLetter = 0;
        state.message = "";
      }
      break;
    }

    default:
      return state;
  }
});
