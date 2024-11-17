"use client";
import { cn } from "@/lib/utils";
import { useSidebarStore } from "@/shared/store";
import { cva } from "class-variance-authority";
import { FileText } from "lucide-react";
import { ReactNode } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

const SidebarVariants = cva(
  "app-sidebar absolute py-2 px-2 bg-white left-0 shadow-md  duration-300 ease-in-out",
  {
    variants: {
      opened: {
        true: "w-screen sm:w-72",
        false: "w-16 left-[-64px] sm:left-0  sm:w-16",
      },
    },
    defaultVariants: {
      opened: false,
    },
  }
);

type OptionProps = {
  opened: boolean;
  children: ReactNode;
} & React.AllHTMLAttributes<HTMLDivElement>;

const Option = ({ opened, children }: OptionProps) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          className={cn(
            "w-full relative user-focus flex items-center min-h-[40px] bg-primary-100 p-2  rounded-sm",
            {
              "justify-center": !opened,
            }
          )}
        >
          <FileText size={18} className="" />
          {opened && <span className="ml-2 text-sm">{children}</span>}
        </button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{children}</p>
      </TooltipContent>
    </Tooltip>
  );
};

type SidebarProps = {
  menuList: {
    title: string;
  }[];
} & React.AllHTMLAttributes<HTMLDivElement>;

export const Sidebar = ({ className, menuList, ...props }: SidebarProps) => {
  const { isSidebarOpen } = useSidebarStore();

  return (
    <div
      className={SidebarVariants({
        opened: isSidebarOpen,
        className,
      })}
      id="sidebar"
      {...props}
    >
      <TooltipProvider>
        {menuList.map((item) => (
          <Option key={item.title} opened={isSidebarOpen}>
            {item.title}
          </Option>
        ))}
      </TooltipProvider>
    </div>
  );
};

Sidebar.Option = Option;
