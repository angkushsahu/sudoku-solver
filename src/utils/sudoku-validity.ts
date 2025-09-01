type IsCellValidArgs = {
   row: number;
   board: Array<Array<number>>;
   col: number;
   num: number;
   n: number;
};

export function isCellValid({ board, col, n, num, row }: IsCellValidArgs) {
   if (num === 0) return true;

   // checking for row and column validity below
   for (let k = 0; k < n; k++) {
      if (k !== col && board[row][k] === num) return false;
      if (k !== row && board[k][col] === num) return false;
   }

   // checking for subgrid validity below
   const sqrtOfN = Math.sqrt(n);
   const boxRow = Math.floor(row / sqrtOfN) * sqrtOfN;
   const boxCol = Math.floor(col / sqrtOfN) * sqrtOfN;

   for (let i = 0; i < sqrtOfN; i++) {
      for (let j = 0; j < sqrtOfN; j++) {
         const r = boxRow + i;
         const c = boxCol + j;
         if ((r !== row || c !== col) && board[r][c] === num) return false;
      }
   }

   return true;
}

type IsBoardValidArgs = {
   board: Array<Array<number>>;
   n: number;
};

export function isBoardValid({ board, n }: IsBoardValidArgs) {
   for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
         if (!isCellValid({ row: i, col: j, num: board[i][j], board, n })) return false;
      }
   }

   return true;
}
