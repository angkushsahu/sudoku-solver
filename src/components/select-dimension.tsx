import { useRef, type Dispatch, type FormEvent, type SetStateAction } from "react";

import { isNumeric } from "../utils";
import { Button } from "./buttons";

type Props = {
   setDimension: Dispatch<SetStateAction<string>>;
};

export function SelectDimension({ setDimension }: Props) {
   const inputRef = useRef<HTMLInputElement>(null);

   function submitDimension(event: FormEvent<HTMLFormElement>) {
      event.preventDefault();
      const dimension = inputRef.current?.value;
      if (!dimension) return;

      if (!isNumeric(dimension)) {
         window.alert("Please make sure that you enter a valid number");
         return;
      }

      if (Number(dimension) <= 1) {
         window.alert("Please make sure that the dimension is valid");
         return;
      }

      // const n = parseInt(dimension, 10);
      // const sqrtOfN = Math.sqrt(n);

      // const isDimensionValid = sqrtOfN % 1 === 0;
      // if (!isDimensionValid) {
      //    window.alert("Please enter a valid sudoku dimension");
      //    return;
      // }

      const url = new URL(window.location.href);
      url.searchParams.set("dimension", dimension);
      window.history.replaceState({}, "", url.toString());

      setDimension(dimension);
   }

   return (
      <form
         onSubmit={submitDimension}
         className="bg-card text-card-foreground flex w-full max-w-sm flex-col gap-6 rounded-xl border p-6 shadow-sm"
      >
         <div>
            <label htmlFor="dimension" className="mb-2 flex items-center gap-2 text-sm leading-none font-medium select-none">
               Enter sudoku dimension
            </label>
            <input
               ref={inputRef}
               type="text"
               inputMode="numeric"
               id="dimension"
               name="dimension"
               placeholder="e.g., 9"
               className="placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground bg-input/30 border-input focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/40 aria-invalid:border-destructive flex h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] md:text-sm"
            />
         </div>
         <Button type="submit">Submit</Button>
      </form>
   );
}
