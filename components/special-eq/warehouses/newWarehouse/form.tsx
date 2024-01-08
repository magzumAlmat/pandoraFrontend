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
import { useEffect, useCallback } from "react";
import {
  addWarehouse,
  setSuccess,
} from "@/app/store/specialEqSlice/warehouseSlice";
import { AlertComponent } from "@/components/alerts/alert";

const formSchema = z.object({
  warehouse_name: z.string().min(2, {
    message: "Имя склада должно содержать не менее двух символов",
  }),
});

export default function ProfileForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      warehouse_name: "",
    },
  });

  const success = useSelector((state: any) => state.warehouse.success);

  const dispatch = useDispatch();

  const onSubmit = useCallback(
    (values: z.infer<typeof formSchema>) => {
      dispatch(addWarehouse(values) as any);
    },
    [dispatch]
  );

  useEffect(() => {
    return () => {
      dispatch(setSuccess(false));
    };
  }, [dispatch]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-5 ">
        <FormField
          control={form.control}
          name="warehouse_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Название склада</FormLabel>
              <FormControl>
                <Input placeholder="Введите название склада" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {success && (
          <AlertComponent
            variant="success"
            description="Новый склад успешно создан"
          />
        )}
        <Button type="submit">Добавить</Button>
      </form>
    </Form>
  );
}
