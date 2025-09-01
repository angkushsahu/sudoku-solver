import type { ComponentProps } from "react";

export function Button({ children, type = "button", ...props }: ComponentProps<"button">) {
   return (
      <button
         type={type}
         {...props}
         className="focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-9 w-full shrink-0 cursor-pointer items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium whitespace-nowrap shadow-xs transition-all outline-none focus-visible:ring-[3px] active:opacity-80"
      >
         {children}
      </button>
   );
}

export function SecondaryButton({ children, type = "button", ...props }: ComponentProps<"button">) {
   return (
      <button
         type={type}
         {...props}
         className="focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/40 aria-invalid:border-destructive hover:text-accent-foreground bg-input/30 border-input hover:bg-input/50 inline-flex h-9 w-full shrink-0 cursor-pointer items-center justify-center gap-2 rounded-md border px-4 py-2 text-sm font-medium whitespace-nowrap shadow-xs transition-all outline-none focus-visible:ring-[3px] active:opacity-80"
      >
         {children}
      </button>
   );
}
