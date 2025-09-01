import { useEffect, useState } from "react";

import { Board, SelectDimension } from "./components";
import { isNumeric } from "./utils";

export function App() {
   const [dimension, setDimension] = useState("");

   useEffect(() => {
      const url = new URL(window.location.href);
      const param = url.searchParams.get("dimension");
      if (!param) {
         setDimension("");
         return;
      }

      if (isNumeric(param)) setDimension(param);
      else setDimension("");
   }, []);

   return (
      <main className="flex min-h-screen items-center justify-center p-5">
         {dimension && dimension.length >= 1 ? (
            <Board dimension={dimension} setDimension={setDimension} />
         ) : (
            <SelectDimension setDimension={setDimension} />
         )}
      </main>
   );
}
