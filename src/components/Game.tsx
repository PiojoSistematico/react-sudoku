import { useState, useEffect } from "react";
import Board from "./Board";
import createSudoku from "../helpers/createSudoku";

const Game = () => {
  const [difficulty, setDifficulty] = useState("easy");
  const [sudoku, setSudoku] = useState(createSudoku(difficulty));
  /* const [attempts, setAttempts] = useState(0);



  /* useEffect(() => {
    fetch(`https://random-word-api.herokuapp.com/word?length=${wordLength}`)
      .then((res) => res.json())
      .then((data) => setWord(data.toString().split("")));
  }, []); */

  console.log(sudoku);

  function handleNewGame(): void {
    console.log("new game");
  }

  return (
    <main>
      <section className="difficulty-section">
        <select name="difficulty">
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <button onClick={handleNewGame}>New Game</button>
      </section>
      <Board sudoku={sudoku}></Board>
    </main>
  );
};

export default Game;
