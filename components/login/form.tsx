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
import { loginUser } from "@/app/store/slice/auth/authThunks";

import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.string(),
  password: z.string().min(1, {
    message: "Поле обязательно к заполнению",
  }),
});

export default function LoginForm() {
  const { loading, error } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    interface LoginUserArgs {
      email: string;
      password: string;
    }

    const loginArgs: LoginUserArgs = {
      email: values.email,
      password: values.password,
    };

    dispatch(loginUser(loginArgs) as any);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 ">
        {error && <AlertComponent description={error} variant="destructive" />}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-full flex flex-col">
              <FormLabel>Почта</FormLabel>
              <Input placeholder="Введите email" {...field} />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="w-full flex flex-col">
              <FormLabel>Пароль</FormLabel>
              <Input type="password" placeholder="Введите пароль" {...field} />
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          {loading ? "Загрузка..." : "Войти"}
        </Button>
      </form>
    </Form>
  );
}
