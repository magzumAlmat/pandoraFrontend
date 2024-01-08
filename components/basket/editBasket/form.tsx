"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
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
import { useEffect } from "react";
import { AlertComponent } from "@/components/alerts/alert";
import { setSuccess } from "@/app/store/slice/basket/basketSlice";
import { updateBasketAsync } from "@/app/store/slice/basket/basketThunks";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ComboboxPopover } from "../../warehouses/basket/carsChooseCombobox";

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

export default function ProfileForm({ basket }) {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      arrival_date: new Date(basket.arrival_date),
      usd_exchange_rate: basket.usd_exchange_rate,
      internal_order_number: basket.internal_order_number,
      kpp: basket.kpp,
      cars: basket.cars,
    },
  });

  const success = useSelector((state: any) => state.basket.success);

  const dispatch = useDispatch();

  function onSubmit(values: z.infer<typeof formSchema>) {
    const data = {
      ...values,
      arrival_date: values.arrival_date,
      proposal_ids: basket.proposal_ids,
    };
    dispatch(updateBasketAsync({ id: basket.id, data }) as any);
  }

  useEffect(() => {
    return () => {
      dispatch(setSuccess(false));
    };
  }, [dispatch]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="internal_order_number"
          render={({ field }) => (
            <FormItem className="w-[250px] flex flex-col">
              <FormLabel>Внутренний порядковый номер</FormLabel>
              <Input
                type="text"
                placeholder="Введите порядковый номер"
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
              <FormLabel>Курс USD</FormLabel>
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
              <FormLabel>Дата прибытия</FormLabel>
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
            variant="success"
            description="Заявка успешно изменена"
          />
        )}

        <Button type="submit" className="mt-5">
          Сохранить
        </Button>
      </form>
    </Form>
  );
}
