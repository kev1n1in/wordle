import { useState, useEffect, useCallback } from "react";
import Row from "./Row";

const Board = () => {
  const [guesses, setGuesses] = useState(
    Array.from({ length: 6 }, () => Array(5).fill(""))
  );
  const [statuses, setStatuses] = useState(Array(6).fill("default"));
  const [currentRow, setCurrentRow] = useState(0); 
  const [nextLetter, setNextLetter] = useState(0); 

  const insertLetter = useCallback((letter) => {
    const updatedGuess = [...guesses[currentRow]];
    updatedGuess[nextLetter] = letter.toUpperCase();
    setGuesses((prevGuesses) => {
      const newGuesses = [...prevGuesses];
      newGuesses[currentRow] = updatedGuess;
      return newGuesses;
    });
    setNextLetter((prevNextLetter) => prevNextLetter + 1);
  }, [guesses, currentRow, nextLetter]);

  const deleteLetter = useCallback(() => {
    const updatedGuess = [...guesses[currentRow]];
    updatedGuess[nextLetter - 1] = ""; 
    setGuesses((prevGuesses) => {
      const newGuesses = [...prevGuesses];
      newGuesses[currentRow] = updatedGuess;
      return newGuesses;
    });
    setNextLetter((prevNextLetter) => prevNextLetter - 1); 
  }, [guesses, currentRow, nextLetter]);

  useEffect(() => {
    const handleKeyUp = (event) => {
      const { key } = event;

      if (key.length === 1 && key.match(/[a-z]/i) && nextLetter < 5) {
        insertLetter(key);
      } else if (key === "Enter" && nextLetter === 5 && currentRow < 5) {
        setStatuses((prevStatuses) => {
          const newStatuses = [...prevStatuses];
          newStatuses[currentRow] = "absent"; 
          return newStatuses;
        });
        setCurrentRow((prevCurrentRow) => prevCurrentRow + 1);
        setNextLetter(0);
      } else if (key === "Backspace" && nextLetter > 0) {
        deleteLetter();
      }
    };

    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [insertLetter, deleteLetter, nextLetter, currentRow]);

  return (
    <div className="board">
      {guesses.map((guess, index) => (
        <Row key={index} letters={guess} status={statuses[index]} />
      ))}
    </div>
  );
};

export default Board;
