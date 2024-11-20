"use client";

import { Check, ChevronsUpDown, HelpCircle } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";

interface Option {
  value: string;
  label: string;
}

interface ComboboxProps {
  options: Option[];
  placeholder?: string;
  label?: string;
  tooltip?: string;
  onSelect?: (value: string) => void;

  value?: string;
}

export const Combobox = ({
  options,
  placeholder = "Select an option...",
  onSelect,
  tooltip,
  label,
  value,
}: ComboboxProps) => {
  const [open, setOpen] = React.useState(false);

  const handleSelect = (currentValue: string) => {
    const newValue = currentValue === value ? "" : currentValue;
    onSelect?.(newValue);
    setOpen(false);
  };

  const addEllipsis = (text?: string) => {
    if (!text) return "";
    const LIMIT = 18;
    if (text.length > LIMIT) {
      return text.slice(0, LIMIT) + "...";
    }
    return text;
  };

  return (
    <div className="w-full relative">
      <div className="mb-1 flex items-center gap-2">
        <span className="text-sm font-bold">{label}</span>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <HelpCircle className="opacity-50" size={16} />
            </TooltipTrigger>
            <TooltipContent>
              <p>{tooltip}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="relative w-full justify-between truncate overflow-hidden text-ellipsis data-[state=open]:bg-accent data-[state=open]:text-accent-foreground"
          >
            {value
              ? addEllipsis(
                  options.find((option) => option.value === value)?.label
                )
              : placeholder}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0">
          <Command>
            <CommandInput placeholder={`Procurar...`} className="h-9" />
            <CommandList>
              <CommandEmpty>Nenhuma opção encontrada</CommandEmpty>
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={() => handleSelect(option.value)}
                  >
                    {option.label}
                    <Check
                      className={cn(
                        "ml-auto",
                        value === option.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};
