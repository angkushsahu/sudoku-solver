type IsSafeArgs = {
   board: Array<Array<number>>;
   row: number;
   col: number;
   num: number;
   n: number;
};

function isSafe({ board, col, n, num, row }: IsSafeArgs) {
   for (let k = 0; k < n; k++) {
      if (board[row][k] === num) return false;
      if (board[k][col] === num) return false;
   }

   const sqrtOfN = Math.sqrt(n);
   const boxRow = Math.floor(row / sqrtOfN) * sqrtOfN;
   const boxCol = Math.floor(col / sqrtOfN) * sqrtOfN;

   for (let i = 0; i < sqrtOfN; i++) {
      for (let j = 0; j < sqrtOfN; j++) {
         if (board[boxRow + i][boxCol + j] === num) return false;
      }
   }

   return true;
}

type SolveSudokuArgs = {
   board: Array<Array<number>>;
   n: number;
};

export function solveSudoku({ board, n }: SolveSudokuArgs) {
   for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
         if (board[i][j] === 0) {
            for (let num = 1; num <= n; num++) {
               if (isSafe({ board, col: j, n, num, row: i })) {
                  board[i][j] = num;
                  if (solveSudoku({ board, n })) return true;
                  board[i][j] = 0;
               }
            }
            return false;
         }
      }
   }

   return true;
}
