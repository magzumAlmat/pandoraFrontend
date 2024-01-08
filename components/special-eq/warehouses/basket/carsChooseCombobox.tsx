"use client";

import * as React from "react";
import {
  ArrowUpCircle,
  CheckCircle2,
  Circle,
  HelpCircle,
  LucideIcon,
  XCircle,
} from "lucide-react";

import { cn } from "@/lib/utils";
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
import { useDispatch, useSelector } from "react-redux";
import { getAllCars } from "@/app/store/specialEqSlice/companySlice";

export function ComboboxPopover({ selectedCar, setSelectedCar }) {
  const [open, setOpen] = React.useState(false);

  const cars = useSelector((state: any) => state.specialEqCompany.cars);

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getAllCars() as any);
  }, [dispatch]);

  const handleSelect = (carId) => {
    const selectedCar = cars.find((car) => car.id === carId);
    if (selectedCar) {
      setSelectedCar(selectedCar.id);
      setOpen(false);
    } else {
      console.error("Car not found:", carId);
    }
  };

  return (
    <div className="flex items-center space-x-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-[250px] justify-start">
            {selectedCar !== null ? (
              <>
                {
                  cars.find((car) => car.id === selectedCar)
                    ?.car_registration_number
                }
              </>
            ) : (
              <>Выбрать авто</>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0" side="bottom" align="start">
          <Command>
            <CommandInput placeholder="Поиск по номеру авто или компании" />
            <CommandList>
              <CommandEmpty>Нет результатов.</CommandEmpty>
              <CommandGroup>
                {cars.map((car, index) => (
                  <CommandItem
                    key={car.id}
                    value={car.id}
                    onSelect={() => handleSelect(car.id)}
                  >
                    <span>
                      {car.car_registration_number} | {car.company.company_name}
                    </span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
