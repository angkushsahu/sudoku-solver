type Is6x6SafeArgs = {
   board: Array<Array<number>>;
   row: number;
   col: number;
   num: number;
};

function is6x6Safe({ board, col, num, row }: Is6x6SafeArgs) {
   const n = 6;

   for (let k = 0; k < n; k++) {
      if (board[row][k] === num) return false;
      if (board[k][col] === num) return false;
   }

   const rowStart = row - (row % 2);
   const colStart = col - (col % 3);

   for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 3; j++) {
         if (rowStart + i >= n || colStart + j >= n) continue;
         if (board[rowStart + i][colStart + j] === num) return false;
      }
   }

   return true;
}

export function solve6x6Sudoku(board: Array<Array<number>>) {
   const n = 6;

   for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
         if (board[i][j] === 0) {
            for (let num = 1; num <= n; num++) {
               if (is6x6Safe({ board, col: j, num, row: i })) {
                  board[i][j] = num;
                  if (solve6x6Sudoku(board)) return true;
                  board[i][j] = 0;
               }
            }
            return false;
         }
      }
   }

   return true;
}

type Is6x6CellValidArgs = {
   row: number;
   board: Array<Array<number>>;
   col: number;
   num: number;
};

export function is6x6CellValid({ board, col, num, row }: Is6x6CellValidArgs) {
   if (num === 0) return true;

   const n = 6;

   // checking for row and column validity below
   for (let k = 0; k < n; k++) {
      if (k !== col && board[row][k] === num) return false;
      if (k !== row && board[k][col] === num) return false;
   }

   // checking for subgrid validity below
   const rowStart = row - (row % 2);
   const colStart = col - (col % 3);

   for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 3; j++) {
         const r = rowStart + i;
         const c = colStart + j;
         if (r >= n || c >= n) continue;
         if ((r !== row || c !== col) && board[r][c] === num) return false;
      }
   }

   return true;
}

export function is6x6BoardValid(board: Array<Array<number>>) {
   const n = 6;

   for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
         if (!is6x6CellValid({ row: i, col: j, num: board[i][j], board })) return false;
      }
   }

   return true;
}
