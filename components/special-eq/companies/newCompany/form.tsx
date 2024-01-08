"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useDispatch, useSelector } from "react-redux";
import {
  addCompany,
  setSuccess,
} from "@/app/store/specialEqSlice/companySlice";
import { useEffect, useState } from "react";
import { AlertComponent } from "@/components/alerts/alert";

import { CalendarIcon, Car, Trash2 } from "lucide-react";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  company_name: z.string().min(2, {
    message: "Название компании не может быть меньше 2-х символов.",
  }),
  company_bin: z.string().length(12, {
    message: "БИН компании должен состоять из 12 цифр.",
  }),
  contact_name: z.string(),
  phone: z.string().min(11, {
    message: "Номер телефона должен состоять из 11 цифр.",
  }),
  email: z.string().email({
    message: "Неверный адрес электронной почты.",
  }),
  cars_number: z.array(z.string()),
  contract: z.string(),
  contract_date: z.date().nullable(),
  contract_color: z.string().nullable(),
});

export default function ProfileForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      company_name: "",
      company_bin: "",
      contact_name: "",
      phone: "",
      email: "",
      cars_number: [],
      contract: "",
      contract_date: null,
      contract_color: "",
    },
  });

  const success = useSelector((state: any) => state.specialEqCompany.success);
  const dispatch = useDispatch();

  useEffect(() => {
    const cleanup = () => {
      dispatch(setSuccess(false));
    };

    return cleanup;
  }, [dispatch]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    dispatch(addCompany(values) as any);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-5 ">
        <FormField
          control={form.control}
          name="company_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Название компании <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Введите название компании" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="company_bin"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                БИН компании <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Введите БИН компании" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="contact_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Контактное лицо <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Введите контактное лицо" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Номер телефона <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Введите номер телефона" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Электронная почта <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Введите электронную почту" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-end gap-3">
          <FormField
            control={form.control}
            name="contract"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Договор</FormLabel>
                <FormControl>
                  <Input placeholder="Введите договор" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="contract_date"
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
                          format(field.value, "PPP", { locale: ruLocale })
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
        </div>

        <FormField
          control={form.control}
          name="contract_color"
          render={({ field }) => (
            <FormItem className="w-full flex flex-col">
              <FormLabel>Цвет договора</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Выберите цвет для договора" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="green">Зеленый</SelectItem>
                  <SelectItem value="red">Красный</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormItem className="w-full flex flex-col">
          <FormLabel>Автомашины</FormLabel>
          <Button
            variant="outline"
            onClick={(e) => {
              e.preventDefault();
              const cars = form.getValues("cars_number");
              form.setValue("cars_number", cars.concat([""]));
              form.setFocus("cars_number.0");
            }}
          >
            <Car className="mr-2 h-5 w-5" />
            Добавить
          </Button>
        </FormItem>

        {form.watch("cars_number").map((_, index) => (
          <FormField
            key={index}
            control={form.control}
            name={`cars_number.${index}`}
            render={({ field }) => (
              <FormItem className="w-full flex flex-col">
                <FormLabel>Автомобиль {index + 1}</FormLabel>
                <div className="flex items-end gap-3">
                  <Input placeholder="Введите номер автомобиля" {...field} />
                  <Button
                    variant="destructive"
                    onClick={(e) => {
                      e.preventDefault();
                      const cars = form.getValues("cars_number");
                      cars.splice(index, 1);
                      form.setValue("cars_number", cars);
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        {success && (
          <AlertComponent
            description="Компания успешно создана"
            variant="success"
          />
        )}
        <Button type="submit">Добавить</Button>
      </form>
    </Form>
  );
}
