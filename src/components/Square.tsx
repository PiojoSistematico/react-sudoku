type SquareProps = {
  row: number;
  col: number;
  value: number;
  isFixed: boolean;
  isCorrect: boolean;
  handleChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    row: number,
    col: number
  ) => void;
};

const Square: React.FunctionComponent<SquareProps> = ({
  row,
  col,
  value,
  isFixed,
  isCorrect,
  handleChange,
}) => {
  return (
    <>
      <input
        className={
          isFixed
            ? "fixed square"
            : isCorrect
            ? "correct square"
            : "incorrect square"
        }
        type="number"
        maxLength={1}
        onChange={(event) => handleChange(event, row, col)}
        value={value > 0 && value <= 9 ? value : ""}
        readOnly={isFixed}
      />
    </>
  );
};

export default Square;
