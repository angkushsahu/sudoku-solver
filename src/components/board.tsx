import { useRef, useState, type Dispatch, type KeyboardEvent, type SetStateAction } from "react";

import { isBoardValid, isCellValid, solveSudoku } from "../utils";
import { Button, SecondaryButton } from "./buttons";

type Props = {
   dimension: string;
   setDimension: Dispatch<SetStateAction<string>>;
};

const emptyBoard = (n: number) => Array.from({ length: n }, () => Array(n).fill(0));

export function Board({ dimension, setDimension }: Props) {
   const n = parseInt(dimension, 10);

   const [board, setBoard] = useState<Array<Array<number>>>(emptyBoard(n));
   const [activeCell, setActiveCell] = useState<{ r: number; c: number } | null>(null);

   const cellRefs = useRef<Array<Array<HTMLInputElement>>>(emptyBoard(n));

   function goBack() {
      setDimension("");

      const url = new URL(window.location.href);
      url.searchParams.delete("dimension");
      window.history.replaceState({}, "", url.toString());
   }

   function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
      if (!activeCell) return;
      let { r: row, c: col } = activeCell;

      if (e.key === "ArrowUp" && row > 0) {
         e.preventDefault();
         cellRefs.current[row - 1][col]?.focus();
      }
      if (e.key === "ArrowDown" && row < n - 1) {
         e.preventDefault();
         cellRefs.current[row + 1][col]?.focus();
      }
      if (e.key === "ArrowLeft") {
         e.preventDefault();
         if (col > 0) cellRefs.current[row][col - 1]?.focus();
         else if (row > 0) cellRefs.current[row - 1][n - 1]?.focus();
      }
      if (e.key === "ArrowRight") {
         e.preventDefault();
         if (col < n - 1) cellRefs.current[row][col + 1]?.focus();
         else if (row < n - 1) cellRefs.current[row + 1][0]?.focus();
      }
   }

   function handleChange({ c, r, value }: { r: number; c: number; value: string }) {
      const newBoard = board.map((row) => [...row]);
      const num = parseInt(value, 10);

      if (isNaN(num) || num < 1 || num > n) newBoard[r][c] = 0;
      else newBoard[r][c] = num;

      setBoard(newBoard);
   }

   function handleSolve() {
      if (!isBoardValid({ board, n })) {
         window.alert("Invalid board! Duplicates found");
         return;
      }

      const boardCopy = board.map((row) => [...row]);
      const solved = solveSudoku({ board: boardCopy, n });

      if (!solved) window.alert("No solution exists for this sudoku");
      else setBoard(boardCopy);
   }

   return (
      <div>
         <section>
            <SecondaryButton onClick={goBack}>Go back</SecondaryButton>
         </section>

         {/* Sudoku board -- begin */}
         <div className="my-8 flex flex-col items-center space-y-4">
            <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))`, width: "fit-content" }}>
               {board.map((row, r) =>
                  row.map((cell, c) => {
                     const valid = isCellValid({ board, col: c, n, num: cell, row: r });
                     const sqrtOfN = Math.sqrt(n);
                     const isSubGrid =
                        sqrtOfN % 1 === 0 ? (Math.floor(r / Math.sqrt(n)) + Math.floor(c / Math.sqrt(n))) % 2 === 0 : false;

                     return (
                        <input
                           key={`Sudoku-cell-${r}-${c}`}
                           ref={(element) => {
                              if (!cellRefs.current[r] || !element) cellRefs.current[r] = [];
                              cellRefs.current[r][c] = element!;
                           }}
                           type="text"
                           inputMode="numeric"
                           value={cell === 0 ? "" : cell}
                           min={1}
                           max={n}
                           onChange={(e) => handleChange({ c, r, value: e.target.value })}
                           onFocus={() => setActiveCell({ c, r })}
                           onKeyDown={onKeyDown}
                           className={`size-8 rounded text-center sm:size-10 ${valid ? (isSubGrid ? "border bg-neutral-800/80" : "border") : "border-2 border-red-500 bg-red-600/50"}`}
                        />
                     );
                  })
               )}
            </div>
         </div>
         {/* Sudoku board -- end */}

         <section className="flex flex-col items-center justify-between gap-4">
            <Button onClick={handleSolve}>Solve</Button>
            <SecondaryButton onClick={() => setBoard(emptyBoard(n))}>Clear board</SecondaryButton>
         </section>
      </div>
   );
}
