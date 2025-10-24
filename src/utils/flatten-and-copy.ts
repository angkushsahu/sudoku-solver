export function flattenAndCopy(board: Array<Array<number>>) {
   const rows = board.length;
   const cols = board[0].length;
   const commands: Array<string> = [];

   for (let i = 0; i < rows; i++) {
      if (i % 2 === 0) {
         for (let j = 0; j < cols; j++) {
            commands.push(`Send(${board[i][j]})`);
            commands.push(`Sleep(300)`);
            if (j < cols - 1) commands.push(`Send("{right}")`);
         }
      } else {
         for (let j = cols - 1; j >= 0; j--) {
            commands.push(`Send(${board[i][j]})`);
            commands.push(`Sleep(300)`);
            if (j > 0) commands.push(`Send("{left}")`);
         }
      }

      if (i < rows - 1) commands.push(`Send("{down}")`);
   }

   const finalScript = `#Requires AutoHotkey v2.0\n\nSleep(2000)\n\n${commands.join("\n")}`;
   window.navigator.clipboard.writeText(finalScript);
}
