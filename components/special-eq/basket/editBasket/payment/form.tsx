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

import { useEffect, useState } from "react";

import { AlertComponent } from "@/components/alerts/alert";
import { setSuccess } from "@/app/store/specialEqSlice/basket/basketSlice";
import { updateBasketAsync } from "@/app/store/specialEqSlice/basket/basketThunks";

const formSchema = z.object({
  usd_exchange_rate: z.string().min(1, {
    message: "Курс USD (заявл.) обязателен",
  }),
});

export default function ProfileForm({ basket }) {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      usd_exchange_rate: basket.usd_exchange_rate || "",
    },
  });

  const success = useSelector((state: any) => state.specialEqBasket.success);

  const dispatch = useDispatch();

  function onSubmit(values: z.infer<typeof formSchema>) {
    const data = {
      ...values,
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
      <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-5">
        <FormField
          control={form.control}
          name="usd_exchange_rate"
          render={({ field }) => (
            <FormItem className="w-full flex flex-col">
              <FormLabel>Курс USD</FormLabel>
              <Input type="text" placeholder="Введите курс USD" {...field} />
              <FormMessage />
            </FormItem>
          )}
        />

        {success && (
          <AlertComponent
            variant="success"
            description="Корзина успешно изменена"
          />
        )}

        <Button type="submit">Сохранить</Button>
      </form>
    </Form>
  );
}
