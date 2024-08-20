import { useReducer, useEffect, useRef, useState } from "react";
import Row from "./Row";
import { initialState, reducer } from "../utils/gameReducer";
import { fetchSolution } from "../services/firebaseService";

const Board = () => {
  const [solution, setSolution] = useState("");
  const [state, dispatch] = useReducer(reducer, initialState);
  const nextLetterRef = useRef(state.nextLetter);

  useEffect(() => {
    nextLetterRef.current = state.nextLetter;
  }, [state.nextLetter]);

  useEffect(() => {
    async function getSolution() {
      const solutionFromDb = await fetchSolution();
      if (solutionFromDb) {
        setSolution(solutionFromDb);
      }
    }

    getSolution();
  }, []);

  useEffect(() => {
    const handleKeyUp = (event) => {
      const { key } = event;

      switch (true) {
        case key.length === 1 &&
          key.match(/[a-z]/i) &&
          nextLetterRef.current < 5:
          dispatch({ type: "INSERT_LETTER", letter: key.toUpperCase() });
          break;

        case key === "Enter" && nextLetterRef.current === 5:
          dispatch({ type: "SUBMIT_GUESS", solution });
          break;

        case key === "Backspace" && nextLetterRef.current > 0:
          dispatch({ type: "DELETE_LETTER" });
          break;

        default:
          break;
      }
    };
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [solution]);

  return (
    <div className="flex justify-center">
      <div className="flex flex-col gap-2">
        {state.guesses.map((guess, index) => (
          <Row key={index} letters={guess} statuses={state.statuses[index]} />
        ))}
      </div>
      {state.message && (
        <div className="absolute px-2 top-40 text-center text-slate-100 rounded-lg bg-black">
          {state.message}
        </div>
      )}
    </div>
  );
};

export default Board;
