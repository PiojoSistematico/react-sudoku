type SquareProps = {
  number: number;
};

const Square: React.FunctionComponent<SquareProps> = ({ number }) => {
  return (
    <>
      <input
        className="square"
        type="number"
        maxLength={1}
        value={`${number}`}
      />
    </>
  );
};

export default Square;
