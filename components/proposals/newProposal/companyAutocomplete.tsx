"use client";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";

import { FormControl } from "@/components/ui/form";

import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCompanies } from "@/app/store/slice/companySlice";

export default function CompanyAutocomplete({ field, form }) {
  const [open, setOpen] = useState(false);

  const companies = useSelector((state: any) => state.company.companies);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCompanies() as any);
  }, [dispatch]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant="outline"
            role="combobox"
            className={cn(
              "w-full justify-between",
              !field.value && "text-muted-foreground"
            )}
          >
            {field.value
              ? companies.find((company) => company.id === field.value)
                  ?.company_name
              : "Выберите компанию"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Поиск компании" />
          <CommandEmpty>Нет компаний.</CommandEmpty>
          <CommandGroup>
            {companies.map((company) => (
              <CommandItem
                value={company.id}
                key={company.id}
                onSelect={() => {
                  form.setValue("company_id", company.id);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    company.id === field.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {company.company_name} | БИН: {company.company_bin}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
