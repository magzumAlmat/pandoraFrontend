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
  createLocalExpenseAsync,
  deleteLocalExpenseAsync,
} from "@/app/store/specialEqSlice/basket/basketThunks";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  description: z.string().min(1, {
    message: "Поле обязательно к заполнению",
  }),
  price: z.string().min(1, {
    message: "Поле обязательно к заполнению",
  }),
  currency: z.string().min(1, {
    message: "Поле обязательно к заполнению",
  }),
});

export default function LocalExpenseForm({
  basketId,
  expense,
  onChange,
  removeLocalExpense,
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: expense.description || "",
      price: expense.price || "",
      currency: expense.currency || "",
    },
  });

  const dispatch = useDispatch();

  function onSubmit(values: z.infer<typeof formSchema>) {
    onChange(values);
    const data = {
      ...values,
    };
    dispatch(createLocalExpenseAsync({ basketId, data }) as any);
  }

  function onRemove() {
    dispatch(deleteLocalExpenseAsync({ id: basketId }) as any);
    removeLocalExpense();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-5">
        <div className="flex items-end gap-2">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="w-full flex flex-col">
                <FormLabel>Цена</FormLabel>
                <Input placeholder="Введите цену" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="currency"
            render={({ field }) => (
              <FormItem className="w-[35%] flex flex-col">
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Валюта" />
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
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="w-full flex flex-col">
              <FormLabel>Описание</FormLabel>
              <Input placeholder="Введите описание" {...field} />
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-3">
          {expense.description === "" && (
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
