"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        unstyled: false,
        classNames: {
          toast:
            "p-4 border-0 items-center gap-2 flex text-white text-sm rounded-md",
          error: "bg-red-500",
          success: "bg-green-600",
          warning: "bg-yellow-500",
          info: "bg-blue-400",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
