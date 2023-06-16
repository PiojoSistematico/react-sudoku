/* ChatGPT told me to use this :) */

export default function generateSudoku(difficulty: string) {
  // Function to shuffle an array randomly
  function shuffleArray(array: number[][]): number[][] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  // Function to validate if a value is valid in a Sudoku grid
  function isValidValue(
    grid: number[][],
    row: number,
    col: number,
    value: number
  ): boolean {
    // Check if value is already present in the row
    for (let c = 0; c < 9; c++) {
      if (grid[row][c] === value) {
        return false;
      }
    }

    // Check if value is already present in the column
    for (let r = 0; r < 9; r++) {
      if (grid[r][col] === value) {
        return false;
      }
    }

    // Check if value is already present in the 3x3 grid
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        if (grid[startRow + r][startCol + c] === value) {
          return false;
        }
      }
    }
    return true;
  }

  // Function to solve the Sudoku grid
  function solveSudoku(grid: number[][]): boolean {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (grid[row][col] === 0) {
          for (let value = 1; value <= 9; value++) {
            if (isValidValue(grid, row, col, value)) {
              grid[row][col] = value;
              if (solveSudoku(grid)) {
                return true;
              }
              grid[row][col] = 0;
            }
          }
          return false;
        }
      }
    }
    return true;
  }

  // Function to remove elements from the solved grid to create a Sudoku problem

  function removeElements(grid: number[][], difficulty: string) {
    let count;
    if (difficulty === "easy") {
      count = 40; // Easy difficulty - 40 elements to remove
    } else if (difficulty === "medium") {
      count = 50; // Medium difficulty - 50 elements to remove
    } else if (difficulty === "hard") {
      count = 60; // Hard difficulty - 60 elements to remove
    } else {
      throw new Error("Invalid difficulty level");
    }

    let removedCount = 0;
    while (removedCount < count) {
      const row = Math.floor(Math.random() * 9);
      const col = Math.floor(Math.random() * 9);
      if (grid[row][col] !== 0) {
        grid[row][col] = 0;
        removedCount++;
      }
    }
  }

  // Create an empty Sudoku grid
  const grid = Array.from({ length: 9 }, () =>
    Array.from({ length: 9 }, () => 0)
  );

  // Solve the Sudoku grid
  solveSudoku(grid);

  // Shuffle the grid to randomize the placement of numbers
  shuffleArray(grid);

  // Remove elements based on the specified difficulty level
  removeElements(grid, difficulty);

  return grid;
}
