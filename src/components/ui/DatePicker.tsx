"use client";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/shared/utils";
import { DateRange } from "react-day-picker";
import { ScrollArea } from "./scroll-area";

type DatePickerProps = {
  placeholder?: string;
  onSelect?: (date: DateRange | undefined) => void;
  date: DateRange | undefined;
};

export function DatePicker({ placeholder, onSelect, date }: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-between text-left font-normal",
            "[&_svg]:text-neutral-400 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
            !date && "text-muted-foreground"
          )}
        >
          {date?.from ? (
            date.to ? (
              <>
                {format(date.from, "LLL dd, y")} -{" "}
                {format(date.to, "LLL dd, y")}
              </>
            ) : (
              format(date.from, "LLL dd, y")
            )
          ) : (
            <span>{placeholder}</span>
          )}
          <CalendarIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 mr-6" align="start">
        <ScrollArea className="h-[400px] sm:h-fit">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={onSelect}
            numberOfMonths={2}
          />
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
