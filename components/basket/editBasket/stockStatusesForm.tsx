"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarIcon } from "lucide-react";
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
  createStockStatusAsync,
  deleteStockStatusAsync,
} from "@/app/store/slice/basket/basketThunks";

const formSchema = z.object({
  description: z.string(),
  stage: z.string().min(1, {
    message: "Поле обязательно к заполнению",
  }),
  date: z.date({
    required_error: "Выберите дату",
  }),
});

export default function StockStatusesForm({
  basketId,
  status,
  onChange,
  removeStockStatus,
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      stage: status.stage || "",
      description: status.description || "",
      date: status.date ? new Date(status.date) : null,
    },
  });

  const dispatch = useDispatch();

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    const data = {
      ...values,
    };
    dispatch(createStockStatusAsync({ basketId, data }) as any);
    onChange(values);
  }

  function onRemove() {
    dispatch(deleteStockStatusAsync({ id: status.id }) as any);
    removeStockStatus();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-5">
        <FormField
          control={form.control}
          name="stage"
          render={({ field }) => (
            <FormItem className="w-full flex flex-col">
              <FormLabel>Статус</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Выберите статус" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem
                    value="Встала на склад под загрузку
"
                  >
                    Встала на склад под загрузку
                  </SelectItem>
                  <SelectItem
                    value="Загрузилась
"
                  >
                    Загрузилась
                  </SelectItem>
                  <SelectItem
                    value="Выехала

"
                  >
                    Выехала
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Дата</FormLabel>
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
          name="description"
          render={({ field }) => (
            <FormItem className="w-full flex flex-col">
              <FormLabel>Примечание</FormLabel>
              <Input type="text" placeholder="Введите примечание" {...field} />
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-3">
          {status.stage === null && (
            <>
              {" "}
              <Button type="submit">Сохранить</Button>
            </>
          )}
          <Button variant="destructive" onClick={onRemove}>
            Удалить
          </Button>
        </div>
      </form>
    </Form>
  );
}
