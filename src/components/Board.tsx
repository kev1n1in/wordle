import React, { useReducer, useEffect, useRef } from "react";
import Row from "./Row";
import { initialState, reducer } from "../utils/gameReducer";
import { fetchSolution } from "../services/firebaseService";
import { db } from "../services/firebaseConfig";
import { Firestore } from "firebase/firestore";

async function getRandomSolution(db: Firestore): Promise<string> {
  try {
    const solutionFromDb = await fetchSolution(db);
    if (solutionFromDb) {
      return solutionFromDb;
    }
    return "Default Solution";
  } catch (error) {
    console.error("Failed to fetch solution:", error);
    return "Default Solution";
  }
}

const Board = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const nextLetterRef = useRef<number>(state.nextLetter);
  const fetchControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    async function fetchAndSetSolution() {
      const controller = new AbortController();
      fetchControllerRef.current = controller;
      try {
        const solutionFromDb = await getRandomSolution(db);
        if (!controller.signal.aborted) {
          dispatch({ type: "SET_SOLUTION", solution: solutionFromDb });
          console.log("Fetched solution:", solutionFromDb);
        }
      } catch (error) {
        if (!controller.signal.aborted) {
          console.error("Failed to fetch solution:", error);
        }
      }
    }
    if (!state.solution) {
      fetchAndSetSolution();
    }

    return () => {
      if (fetchControllerRef.current) {
        fetchControllerRef.current.abort();
      }
    };
  }, [state.solution]);
  useEffect(() => {
    nextLetterRef.current = state.nextLetter;
  }, [state.nextLetter]);

  useEffect(() => {
    const handleKeyUp = (event: KeyboardEvent) => {
      const { key } = event;

      switch (true) {
        case key.length === 1 &&
          key.match(/[a-z]/i) &&
          nextLetterRef.current < 5:
          dispatch({ type: "INSERT_LETTER", letter: key.toUpperCase() });
          break;

        case key === "Enter" && nextLetterRef.current === 5:
          dispatch({ type: "SUBMIT_GUESS" });
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
  }, []);

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
