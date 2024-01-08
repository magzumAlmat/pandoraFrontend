"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { CalendarIcon, Plus, Trash2 } from "lucide-react";
import { format } from "date-fns";
import ruLocale from "date-fns/locale/ru";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useDispatch, useSelector } from "react-redux";
import { setSuccess, setError } from "@/app/store/slice/basket/basketSlice";
import { useEffect, useState } from "react";
import { AlertComponent } from "@/components/alerts/alert";
import { createBasketAsync } from "@/app/store/slice/basket/basketThunks";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ComboboxPopover } from "./carsChooseCombobox";
import { setProposalsByWarehouse } from "@/app/store/slice/proposalSlice";

const formSchema = z.object({
  arrival_date: z.date({
    required_error: "Выберите дату прибытия (заявл.)",
  }),
  usd_exchange_rate: z.string().min(2, {
    message: "Нужно ввести курс USD",
  }),
  internal_order_number: z.string().min(1, {
    message: "Нужно ввести номер загрузочного листа",
  }),
  kpp: z.string(),
  cars: z.array(
    z.object({
      company_car: z.number(),
      frakht: z.string(),
      frakht_currency: z.string(),
    })
  ),
});

export default function ProfileForm({ selectedProposals, selectedWarehouse }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      arrival_date: null,
      usd_exchange_rate: "",
      internal_order_number: "",
      kpp: "",
      cars: [],
    },
  });

  const success = useSelector((state: any) => state.basket.success);
  const error = useSelector((state: any) => state.basket.error);

  const dispatch = useDispatch();

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    const data = {
      ...values,
      proposal_ids: selectedProposals.map((proposal) => proposal.id),
      warehouse_id: selectedWarehouse,
    };
    dispatch(createBasketAsync({ data }) as any);
  }

  useEffect(() => {
    return () => {
      dispatch(setSuccess(false));
      dispatch(setError(""));
    };
  }, [dispatch]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-5 ">
        <FormField
          control={form.control}
          name="internal_order_number"
          render={({ field }) => (
            <FormItem className="w-full flex flex-col">
              <FormLabel>
                Номер загрузочного листа <span className="text-red-500">*</span>
              </FormLabel>
              <Input
                placeholder="Введите номер загрузочного листа"
                {...field}
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormItem className="w-full flex flex-col">
          <FormLabel>Номера автомашин</FormLabel>
          <Button
            variant={"outline"}
            onClick={(e) => {
              e.preventDefault();
              const cars = form.getValues("cars");
              form.setValue(
                "cars",
                cars.concat({
                  company_car: null,
                  frakht: "",
                  frakht_currency: "",
                })
              );
            }}
          >
            <Plus className="mr-2 h-4 w-4" /> Добавить
          </Button>
          <FormMessage />
        </FormItem>

        {form.watch("cars")?.map((car, index) => (
          <div key={index} className="w-[750px] flex items-center gap-3">
            <FormField
              control={form.control}
              name={`cars.${index}.company_car`}
              render={({ field }) => (
                <FormItem className="w-full flex flex-col">
                  <FormLabel>Номер автомобиля {index + 1}</FormLabel>
                  <ComboboxPopover
                    selectedCar={car.company_car}
                    setSelectedCar={field.onChange}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={`cars.${index}.frakht`}
              render={({ field }) => (
                <FormItem className="w-full flex flex-col">
                  <FormLabel>Фрахт автомобиля {index + 1}</FormLabel>
                  <Input placeholder="Введите фрахт" {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={`cars.${index}.frakht_currency`}
              render={({ field }) => (
                <FormItem className="w-full flex flex-col">
                  <FormLabel>Валюта фрахта автомобиля {index + 1}</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Выберите валюту" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CHY">CHY</SelectItem>
                      <SelectItem value="USD">USD</SelectItem>
                      <SelectItem value="KZT">KZT</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              variant={"destructive"}
              onClick={(e) => {
                e.preventDefault();
                const cars = form.getValues("cars");
                form.setValue(
                  "cars",
                  cars.filter((_, i) => i !== index)
                );
              }}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}

        <FormField
          control={form.control}
          name="usd_exchange_rate"
          render={({ field }) => (
            <FormItem className="w-full flex flex-col">
              <FormLabel>
                Курс USD <span className="text-red-500">*</span>
              </FormLabel>
              <Input placeholder="Введите курс" {...field} />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="arrival_date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>
                Дата прибытия <span className="text-red-500">*</span>
              </FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(new Date(field.value), "PPP", {
                          locale: ruLocale,
                        })
                      ) : (
                        <span>Выбрать дату</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    locale={ruLocale}
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="kpp"
          render={({ field }) => (
            <FormItem className="w-full flex flex-col">
              <FormLabel>КПП</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Выберите кпп" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Зимунай-Майкапчагай">
                    Зимунай-Майкапчагай
                  </SelectItem>
                  <SelectItem value="Тачен-Бахты">Тачен-Бахты</SelectItem>
                  <SelectItem value="Алашанькоу-Достык">
                    Алашанькоу-Достык
                  </SelectItem>
                  <SelectItem value="Хоргос-Нуржолы">Хоргос-Нуржолы</SelectItem>
                  <SelectItem value="Дулаты-Кольжат">Дулаты-Кольжат</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {success && (
          <AlertComponent
            description="Заявки успешно перемещены"
            variant="success"
          />
        )}
        {error && <AlertComponent description={error} variant="destructive" />}
        <Button type="submit">Создать</Button>
      </form>
    </Form>
  );
}
