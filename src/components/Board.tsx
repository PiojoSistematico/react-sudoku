import Square from "./Square";

type BoardProps = {
  initialSudoku: number[][];
  sudoku: number[][];
  handleChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    row: number,
    col: number
  ) => void;
  isCorrect: boolean[][];
};

const Board: React.FunctionComponent<BoardProps> = ({
  initialSudoku,
  sudoku,
  handleChange,
  isCorrect,
}) => {
  return (
    <section className="board-section">
      {sudoku.map((row, i) => {
        return row.map((elem, j) => (
          <Square
            key={`${i}${j}`}
            row={i}
            col={j}
            value={elem}
            isFixed={initialSudoku[i][j] > 0}
            isCorrect={isCorrect[i][j]}
            handleChange={handleChange}
          ></Square>
        ));
      })}
    </section>
  );
};

export default Board;
