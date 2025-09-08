import { useEffect, useState, type Dispatch, type SetStateAction } from "react";

import { validDimensions, type ValidDimensions } from "./constants";
import { Board6x6, Board9x9, SecondaryButton } from "./components";

export function App() {
   const [dimension, setDimension] = useState<ValidDimensions | null>(null);

   useEffect(() => {
      const url = new URL(window.location.href);
      const param = url.searchParams.get("dimension");
      if (!param) {
         setDimension(null);
         return;
      }

      if (validDimensions.includes(param as ValidDimensions)) setDimension(param as ValidDimensions);
      else setDimension(null);
   }, []);

   return (
      <main className="flex min-h-screen items-center justify-center p-5">
         <Pages dimension={dimension} setDimension={setDimension} />
      </main>
   );
}

type PagesProps = {
   dimension: ValidDimensions | null;
   setDimension: Dispatch<SetStateAction<ValidDimensions | null>>;
};

export function Pages({ dimension, setDimension }: PagesProps) {
   function setBoard(type: ValidDimensions) {
      const url = new URL(window.location.href);
      url.searchParams.set("dimension", type);
      window.history.replaceState({}, "", url.toString());

      setDimension(type);
   }

   if (!dimension) {
      return (
         <div className="flex flex-col gap-y-4">
            <h1 className="mb-2 text-2xl">Select dimension</h1>
            <SecondaryButton onClick={() => setBoard("6x6")}>6 x 6</SecondaryButton>
            <SecondaryButton onClick={() => setBoard("9x9")}>9 x 9</SecondaryButton>
         </div>
      );
   }

   if (dimension === "6x6") {
      return <Board6x6 setDimension={setDimension} />;
   } else if (dimension === "9x9") {
      return <Board9x9 setDimension={setDimension} />;
   }

   return null;
}
