import Square from "./Square";

type BoardProps = {
  sudoku: number[][];
};

const Board: React.FunctionComponent<BoardProps> = ({ sudoku }) => {
  return (
    <section className="board-section">
      {sudoku.map((row, i) => {
        return row.map((elem, j) => (
          <Square key={`${i}${j}`} number={elem}></Square>
        ));
      })}
    </section>
  );
};

export default Board;
