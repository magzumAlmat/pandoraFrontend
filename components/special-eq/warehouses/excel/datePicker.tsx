"use client";

import * as React from "react";
import { addDays, addYears, addMonths, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";
import ruLocale from "date-fns/locale/ru";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function DatePickerWithRange({ className = "", onChange, date }) {
  const handleSelect = (value: string) => {
    const today = new Date();
    if (value === "year") {
      onChange({
        from: addYears(today, -1),
        to: today,
      });
    } else if (value === "halfYear") {
      onChange({
        from: addMonths(today, -6),
        to: today,
      });
    }
  };

  const handleCalendarChange = (newDate: DateRange) => {
    onChange(newDate);
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y", { locale: ruLocale })} -{" "}
                  {format(date.to, "LLL dd, y", { locale: ruLocale })}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Select onValueChange={(value) => handleSelect(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Выбрать период" />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectItem value="halfYear">
                Пол года (6 месяцев до текущей даты)
              </SelectItem>
              <SelectItem value="year">
                Год (12 месяцев до текущей даты)
              </SelectItem>
            </SelectContent>
          </Select>
          <Calendar
            locale={ruLocale}
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleCalendarChange}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
