import { useState, useEffect } from "react";
import Board from "./Board";
import { createSudoku, isValid } from "../helpers/createSudoku";

const Game = () => {
  const [sudoku, setSudoku] = useState<number[][]>([]);
  const [initialSudoku, setInitialSudoku] = useState<number[][]>([]);
  const [isCorrect, setIsCorrect] = useState<boolean[][]>([]);

  let isThereAWinner = false;

  useEffect(() => {
    isThereAWinner = isCorrect.every((row) =>
      row.every((elem) => elem == true)
    );
    console.log("aers");
  }, [isCorrect]);

  /* console.log("sudoku", sudoku);
  console.log("INsudoku", initialSudoku); */
  /* console.log("isCorrect", isCorrect); */
  console.log("isCorrect", isCorrect);
  console.log("isThereAWinner", isThereAWinner);

  function handleNewGame(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    const difficulty: string = (
      event.currentTarget.querySelector(
        'select[name="difficulty"]'
      ) as HTMLSelectElement
    ).value;
    const newSudoku = createSudoku(difficulty);
    const newInitialSudoku = newSudoku.map((row) => [...row]);
    const newIsCorrect = newInitialSudoku.map((row) =>
      row.map((elem) => elem > 0)
    );

    setSudoku(newSudoku);
    setInitialSudoku(newInitialSudoku);
    setIsCorrect(newIsCorrect);
  }

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement>,
    row: number,
    col: number
  ) {
    const newValue = parseInt(event.target.value, 10);
    console.log(isValid(sudoku, row, col, newValue));
    setIsCorrect((prevIsCorrect) => {
      let arr = prevIsCorrect.map((row) => [...row]);
      arr[row][col] = isValid(sudoku, row, col, newValue);
      return arr;
    });
    setSudoku((prevSudoku) => {
      let arr = prevSudoku.map((row) => [...row]);
      arr[row][col] = newValue;
      return arr;
    });
  }

  return (
    <main>
      <form onSubmit={handleNewGame} className="difficulty-section">
        <select name="difficulty">
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <button type="submit">New Game</button>
      </form>
      {isThereAWinner ? (
        <h1>Congratulations!! Try Again!!</h1>
      ) : (
        <Board
          initialSudoku={initialSudoku}
          sudoku={sudoku}
          handleChange={handleChange}
          isCorrect={isCorrect}
        ></Board>
      )}
    </main>
  );
};

export default Game;
