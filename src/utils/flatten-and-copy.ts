export function flattenAndCopy(board: Array<Array<number>>) {
   const joinedArray = board
      .flat()
      .map((number, index, array) => {
         if (index === array.length - 2) return `Send(${number})\nSend("{right}")\nSleep(11000)`;
         else if (index === array.length - 1) return `Send(${number})`;
         return `Send(${number})\nSend("{right}")`;
      })
      .join("\n");

   window.navigator.clipboard.writeText(`#Requires AutoHotkey v2.0\n\nSleep(2000)\n\n${joinedArray}`);
}
