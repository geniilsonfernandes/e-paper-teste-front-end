import { cn } from "@/shared/utils";
import * as React from "react";

type InputProps = {
  icon?: React.ReactNode;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, icon, type, ...props }, ref) => {
    return (
      <div
        className={cn(
          "flex items-center gap-2 h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base   file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-neutral-400 placeholder:text-xs disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-200",
          "[&_svg]:text-neutral-400 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
        )}
      >
        <input
          type={type}
          className={cn(
            "outline-none",
            className,
            "placeholder:text-sm w-full"
          )}
          {...props}
          ref={ref}
        />
        {icon && <span>{icon}</span>}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
