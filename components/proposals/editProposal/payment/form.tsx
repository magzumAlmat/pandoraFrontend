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
  setError,
  setSuccess,
  updateProposal,
} from "@/app/store/slice/proposalSlice";
import { useEffect, useState } from "react";
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

import { AlertComponent } from "@/components/alerts/alert";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  accountant_note: z.string().nullable(),
  invoice: z.string().nullable(),
  invoice_date: z.date().nullable(),
  account_number: z.string().nullable(),
  account_number_date: z.date().nullable(),
  avr_number: z.string().nullable(),
  avr_date: z.date().nullable(),
  accountant_note_color: z.string().nullable(),
});

export default function ProfileForm({ proposal }) {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      invoice: proposal.invoice || "",
      invoice_date: proposal.invoice_date
        ? new Date(proposal.invoice_date)
        : null,
      account_number: proposal.account_number || "",
      account_number_date: proposal.account_number_date
        ? new Date(proposal.account_number_date)
        : null,
      avr_number: proposal.avr_number || "",
      avr_date: proposal.avr_date ? new Date(proposal.avr_date) : null,
      accountant_note: proposal.accountant_note || "",
      accountant_note_color: proposal.accountant_note_color || "",
    },
  });

  const success = useSelector((state: any) => state.proposal.success);
  const error = useSelector((state: any) => state.proposal.error);

  const dispatch = useDispatch();

  function onSubmit(values: z.infer<typeof formSchema>) {
    dispatch(setSuccess(false));
    dispatch(setError(null));
    const data = {
      ...values,
    };
    dispatch(updateProposal(proposal.id, data) as any);
  }

  useEffect(() => {
    return () => {
      dispatch(setSuccess(false));
      dispatch(setError(null));
    };
  }, [dispatch]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="">
        <div className="flex items-end gap-2 w-[500px]">
          <FormField
            control={form.control}
            name="account_number"
            render={({ field }) => (
              <FormItem className="w-full flex flex-col">
                <FormLabel>Номер счета</FormLabel>
                <Input placeholder="Введите номер счета" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="account_number_date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Дата счета</FormLabel>
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

        <div className="flex items-end gap-2 w-[500px]">
          <FormField
            control={form.control}
            name="avr_number"
            render={({ field }) => (
              <FormItem className="w-full flex flex-col">
                <FormLabel>Номер АВР</FormLabel>
                <Input placeholder="Введите номер АВР" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="avr_date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Дата АВР</FormLabel>
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

        <div className="flex items-end gap-2 w-[500px]">
          <FormField
            control={form.control}
            name="invoice"
            render={({ field }) => (
              <FormItem className="w-full flex flex-col">
                <FormLabel>Счет фактура</FormLabel>
                <Input placeholder="Введите номер счета" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="invoice_date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Дата счета фактуры</FormLabel>
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

        <div className="flex items-end gap-2 w-[500px]">
          <FormField
            control={form.control}
            name="accountant_note"
            render={({ field }) => (
              <FormItem className="w-full flex flex-col">
                <FormLabel>Примечание</FormLabel>
                <Input placeholder="Введите примечание" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="accountant_note_color"
            render={({ field }) => (
              <FormItem className="w-[80%] flex flex-col">
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Цвет примечания" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="black">Черный</SelectItem>
                    <SelectItem value="red">Красный</SelectItem>
                    <SelectItem value="green">Зеленый</SelectItem>
                    <SelectItem value="yellow">Желтый</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {success && (
          <AlertComponent
            variant="success"
            description="Заявка успешно изменена"
          />
        )}

        {error && <AlertComponent variant="destructive" description={error} />}

        <Button type="submit" className="mt-5">
          Сохранить
        </Button>
      </form>
    </Form>
  );
}
