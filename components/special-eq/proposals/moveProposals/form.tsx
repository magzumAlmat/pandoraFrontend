"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
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
import { setSuccess } from "@/app/store/specialEqSlice/proposalSlice";
import { useEffect } from "react";
import { getAllWarehouses } from "@/app/store/specialEqSlice/warehouseSlice";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { moveProposalsToWarehouse } from "@/app/store/specialEqSlice/proposalSlice";
import { AlertComponent } from "@/components/alerts/alert";

const formSchema = z.object({
  warehouse_id: z.string().min(1, {
    message: "Нужно выбрать склад",
  }),
});

export default function ProfileForm({ selectedProposals }) {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      warehouse_id: "",
    },
  });

  const success = useSelector((state: any) => state.specialEqProposal.success);
  const warehouses = useSelector(
    (state: any) => state.specialEqWarehouse.warehouses
  );
  const dispatch = useDispatch();

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    const data = {
      ...values,
      proposal_ids: selectedProposals.map((proposal) => proposal.id),
    };

    dispatch(moveProposalsToWarehouse(data) as any);
  }

  useEffect(() => {
    dispatch(getAllWarehouses() as any);

    return () => {
      dispatch(setSuccess(false));
    };
  }, [dispatch]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-5 ">
        <FormField
          control={form.control}
          name="warehouse_id"
          render={({ field }) => (
            <FormItem className="w-full flex flex-col">
              <FormLabel>Склад</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Выберите склад" />
                </SelectTrigger>
                <SelectContent>
                  {warehouses &&
                    warehouses.map((warehouse) => (
                      <SelectItem key={warehouse.id} value={`${warehouse.id}`}>
                        {warehouse.warehouse_name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {success && (
          <AlertComponent
            variant="success"
            description="Заявки успешно перемещены на склад"
          />
        )}
        <Button type="submit">Отправить</Button>
      </form>
    </Form>
  );
}
