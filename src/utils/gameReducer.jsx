export const initialState = {
  guesses: Array.from({ length: 6 }, () => Array(5).fill("")),
  statuses: Array.from({ length: 6 }, () => Array(5).fill("default")),
  currentRow: 0,
  nextLetter: 0,
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
          };
        }
        return state;
  
      case "SUBMIT_GUESS": {
        const newStatuses = [...state.statuses];
        const currentGuess = state.guesses[state.currentRow];
  
        currentGuess.forEach((letter, index) => {
          if (letter === action.solution[index]) {
            newStatuses[state.currentRow][index] = "correct";
          } else if (action.solution.includes(letter)) {
            newStatuses[state.currentRow][index] = "present";
          } else {
            newStatuses[state.currentRow][index] = "absent";
          }
        });
  
        return {
          ...state,
          statuses: newStatuses,
          currentRow: state.currentRow + 1,
          nextLetter: 0,
        };
      }
  
      default:
        return state;
    }
  }