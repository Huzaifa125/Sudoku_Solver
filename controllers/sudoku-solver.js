class SudokuSolver {

    validate(puzzle){
      if(!puzzle){
        return "Required field missing";
      }
      if(puzzle.length != 81){
        return "Expected puzzle to be 81 characters long";
      }
      if(/[^1-9.]/g.test(puzzle)){
        return "Invalid characters in puzzle";
      }
      return "Valid";
    }

    letterToNumber(row){
      if (typeof row !== 'string' || !row.toUpperCase) {
        throw new Error("Invalid row input. Row must be a string.");
      }
      switch(row.toUpperCase()){
        case "A":
          return 1;
        case "B":
          return 2;
        case "C":
          return 3;
        case "D":
          return 4;
        case "E":
          return 5;
        case "F":
          return 6;
        case "G":
          return 7;
        case "H":
          return 8;
        case "I":
          return 9;
        default:
          return "none";  
      }
    }

  checkRowPlacement(puzzleString, row, column, value) {
    let grid = this.transformSudokuString(puzzleString);
    row = this.letterToNumber(row);
    for(let i = 0 ; i < 9 ; i++){
      if(grid[row - 1][i] == value){
        return false;
      }
    }
    return true;
  }

  checkColPlacement(puzzleString, row, column, value) {
    let grid = this.transformSudokuString(puzzleString);
    row = this.letterToNumber(row);
    for(let i = 0 ; i < 9 ; i++){
      if(grid[i][column - 1] == value){
        return false;
      }
    }
    return true;
  }

  checkRegionPlacement(puzzleString, row, col, value) {
      let grid = this.transformSudokuString(puzzleString);
      row = this.letterToNumber(row);
      let startRow = row - (row % 3),
        startCol = col - (col % 3);
        for(let i = 0; i < 3; i++)
          for(let j = 0 ; j < 3 ; j++)
            if(grid[i + startRow][j + startCol] == value) return false;
        return true;
  }


  transformSudokuString(sudokuString) {
    // Validate input string length
    if (sudokuString.length !== 81) {
      throw new Error("Invalid Sudoku string length. It should be 81 characters long.");
    }
  
    // Transform Sudoku string into a 2D array
    const board = sudokuString.match(/.{1,9}/g).map(row =>
      row.split("").map(cell => (cell === "." ? 0 : parseInt(cell)))
    );
  
    return board;
  }


  solveSudoku(board) {
    // Find empty cell
    const findEmptyCell = () => {
      for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
          if (board[row][col] === 0) {
            return [row, col];
          }
        }
      }
      return null;
    };
  
    // Validate number placement
    const isValid = (num, row, col) => {
      // Check row
      for (let i = 0; i < 9; i++) {
        if (board[row][i] === num && i !== col) {
          return false;
        }
      }
  
      // Check column
      for (let i = 0; i < 9; i++) {
        if (board[i][col] === num && i !== row) {
          return false;
        }
      }
  
      // Check subgrid
      const startRow = Math.floor(row / 3) * 3;
      const startCol = Math.floor(col / 3) * 3;
      for (let i = startRow; i < startRow + 3; i++) {
        for (let j = startCol; j < startCol + 3; j++) {
          if (board[i][j] === num && (i !== row || j !== col)) {
            return false;
          }
        }
      }
  
      return true;
    };
  
    // Solve Sudoku using backtracking
    const solve = () => {
      const emptyCell = findEmptyCell();
      if (!emptyCell) {
        return true; // Sudoku solved
      }
  
      const [row, col] = emptyCell;
      for (let num = 1; num <= 9; num++) {
        if (isValid(num, row, col)) {
          board[row][col] = num;
  
          if (solve()) {
            return true;
          }
  
          board[row][col] = 0; // Backtrack
        }
      }
  
      return false; // No solution found
    };
  
    // Start solving Sudoku
    if (solve()) {
      return board; // Return solved Sudoku board
    } else {
      return false; // Puzzle is unsolvable
    }
  }
  
  completeSudoku(puzzleString){
    const board = this.transformSudokuString(puzzleString);
    const solvedBoard = this.solveSudoku(board);
    console.log(solvedBoard);
    if(!solvedBoard) return false;
    return solvedBoard.flat().join("");
  }

}

module.exports = SudokuSolver;

