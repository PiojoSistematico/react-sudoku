import { useState } from "react";
import Board from "./Board";
import { createSudoku, isValid } from "../helpers/createSudoku";

const Game = () => {
  //main sudoku state to hold the original sudoku values and the user input
  const [sudoku, setSudoku] = useState<number[][]>([]);
  //keep track of the original values to disable interaction in these cells
  const [initialSudoku, setInitialSudoku] = useState<number[][]>([]);
  //matrix to gold the correct values, there is a winner if the entire matrix is true
  const [isCorrect, setIsCorrect] = useState<boolean[][]>(
    Array(9)
      .fill(undefined)
      .map(() => Array(9).fill(false))
  );

  let isThereAWinner = isCorrect.every((row) =>
    row.every((elem) => elem == true)
  );

  //Function to start a new game and initialize the three main state variables
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

  //Function update the sudoku and isCorrect states on the change of a cell
  function handleChange(
    event: React.ChangeEvent<HTMLInputElement>,
    row: number,
    col: number
  ) {
    const newValue = parseInt(event.target.value, 10);
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
