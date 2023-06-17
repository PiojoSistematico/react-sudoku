/* ChatGPT told me to use this :) */

// Helper function to shuffle an array
export function shuffleArray(array: any[]): void {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Helper function to check if a value is valid at a given position
export function isValid(
  board: number[][],
  row: number,
  col: number,
  value: number
): boolean {
  // Check if the value already exists in the same row or column
  for (let i = 0; i < 9; i++) {
    if (board[row][i] === value || board[i][col] === value) {
      return false;
    }
  }

  // Check if the value already exists in the same 3x3 grid
  const startRow = Math.floor(row / 3) * 3;
  const startCol = Math.floor(col / 3) * 3;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[startRow + i][startCol + j] === value) {
        return false;
      }
    }
  }

  return true;
}

// Helper function to solve the Sudoku puzzle using backtracking
export function solveSudoku(board: number[][]): boolean {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === 0) {
        // Try different values from 1 to 9
        for (let value = 1; value <= 9; value++) {
          if (isValid(board, row, col, value)) {
            board[row][col] = value;
            if (solveSudoku(board)) {
              return true;
            }
            board[row][col] = 0; // Backtrack
          }
        }
        return false; // No valid value found
      }
    }
  }
  return true; // Sudoku solved
}

export function createSudoku(difficulty: string): number[][] {
  // Create an empty Sudoku board
  const board: number[][] = Array.from({ length: 9 }, () => Array(9).fill(0));

  // Solve the Sudoku board
  solveSudoku(board);

  // Generate indices for removing cells based on the difficulty level
  const indices: number[] = Array.from({ length: 81 }, (_, index) => index);
  shuffleArray(indices);

  let cellsToRemove: number;
  switch (difficulty) {
    case "easy":
      cellsToRemove = 40;
      break;
    case "medium":
      cellsToRemove = 50;
      break;
    case "hard":
      cellsToRemove = 60;
      break;
    default:
      throw new Error("Invalid difficulty level");
  }

  // Remove cells from the board
  for (let i = 0; i < cellsToRemove; i++) {
    const row = Math.floor(indices[i] / 9);
    const col = indices[i] % 9;
    board[row][col] = 0;
  }

  return board;
}
