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
} from "@/app/store/specialEqSlice/proposalSlice";
import { useEffect } from "react";

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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AlertComponent } from "@/components/alerts/alert";

const formSchema = z.object({
  cargo_name: z.string().min(1, {
    message: "Наименование груза обязательно",
  }),
  location_from: z.string().min(1, {
    message: "Откуда обязательна",
  }),
  location_to: z.string().min(1, {
    message: "Куда обязательна",
  }),
  declared_quantity: z.string().min(1, {
    message: "Количество (заявл.) обязательно",
  }),
  declared_weight: z.string().min(1, {
    message: "Вес (заявл.) обязателен",
  }),
  declared_volume: z.string().min(1, {
    message: "Объем (заявл.) обязателен",
  }),
  declared_rate_usd: z.string().min(1, {
    message: "Ставка USD (заявл.) обязателен",
  }),
  cargo_type: z.any(),
  description: z.any(),
  actual_quantity: z.any(),
  actual_weight: z.any(),
  actual_volume: z.any(),
  company_name: z.any(),
  broker_name: z.any(),
  proposal_status: z.any(),
  cargo_value: z.any(),
  cargo_value_currency: z.any(),
  pickup_date: z.date().nullable(),
  prepayment: z.any(),
  prepayment_rate: z.any(),
  actual_rate_usd: z.any(),
  invoices_count: z.any(),
});

export default function ProfileForm({ proposal }) {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cargo_name: proposal.cargo_name,
      cargo_type: proposal.cargo_type || null,
      company_name: proposal.company.company_name,
      broker_name: proposal.broker ? proposal.broker.company_name : null,
      location_from: proposal.location_from,
      location_to: proposal.location_to,
      declared_quantity: proposal.declared_quantity,
      declared_weight: proposal.declared_weight,
      declared_volume: proposal.declared_volume,
      declared_rate_usd: proposal.declared_rate_usd || null,
      description: proposal.description || null,
      actual_quantity: proposal.actual_quantity || null,
      actual_weight: proposal.actual_weight || null,
      actual_volume: proposal.actual_volume || null,
      proposal_status: proposal.proposal_status || null,
      cargo_value: proposal.cargo_value || null,
      cargo_value_currency: proposal.cargo_value_currency || null,
      pickup_date: proposal.pickup_date ? new Date(proposal.pickup_date) : null,
      prepayment: proposal.prepayment || null,
      prepayment_rate: proposal.prepayment_rate || null,
      actual_rate_usd: proposal.actual_rate_usd || null,
      invoices_count: proposal.invoices_count || null,
    },
  });

  const success = useSelector((state: any) => state.specialEqProposal.success);
  const error = useSelector((state: any) => state.specialEqProposal.error);

  const dispatch = useDispatch();

  function onSubmit(values: z.infer<typeof formSchema>) {
    dispatch(setSuccess(false));
    dispatch(setError(null));
    console.log(values);
    const data = {
      ...values,
    };
    // Заменяем пустые значения на null
    for (const key in data) {
      if (
        data.hasOwnProperty(key) &&
        typeof data[key] === "string" &&
        data[key].trim() === ""
      ) {
        data[key] = null;
      }
    }
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
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex gap-5 w-[500px]">
          <FormField
            control={form.control}
            name="company_name"
            render={({ field }) => (
              <FormItem className="w-full flex flex-col items-start">
                <FormLabel>Компания</FormLabel>
                <Input
                  disabled
                  type="text"
                  placeholder={`${proposal.company.company_name}`}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="broker_name"
            render={({ field }) => (
              <FormItem className="w-full flex flex-col items-start">
                <FormLabel>Посредник</FormLabel>
                <Input
                  disabled
                  type="text"
                  placeholder={`${
                    proposal.broker ? proposal.broker.company_name : ""
                  }`}
                />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex gap-5 w-[500px]">
          <FormField
            control={form.control}
            name="location_from"
            render={({ field }) => (
              <FormItem className="w-full flex flex-col items-start">
                <FormLabel>Откуда</FormLabel>
                <Input placeholder="Откуда" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location_to"
            render={({ field }) => (
              <FormItem className="w-full flex flex-col">
                <FormLabel>Куда</FormLabel>
                <Input placeholder="Куда" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <h3 className="text-[16px] font-bold mt-3 mb-5">Данные груза</h3>
        <FormField
          control={form.control}
          name="cargo_name"
          render={({ field }) => (
            <FormItem className="w-[500px] flex flex-col">
              <FormLabel>Наименование груза</FormLabel>
              <Input placeholder="Введите наименование груза" {...field} />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="cargo_type"
          render={({ field }) => (
            <FormItem className="w-[350px] flex flex-col">
              <FormLabel>Тип груза</FormLabel>
              <Input placeholder="Введите тип груза" {...field} />
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-end gap-2 w-[350px]">
          <FormField
            control={form.control}
            name="cargo_value"
            render={({ field }) => (
              <FormItem className="w-full flex flex-col">
                <FormLabel>Стоимость груза</FormLabel>
                <Input placeholder="Введите стоимость груза" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cargo_value_currency"
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

        <div className="flex items-end gap-2 w-[350px]">
          <FormField
            control={form.control}
            name="declared_quantity"
            render={({ field }) => (
              <FormItem className="w-[350px] flex flex-col">
                <FormLabel>Кол-во мест (заявл.)</FormLabel>
                <Input placeholder="Введите количество" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="actual_quantity"
            render={({ field }) => (
              <FormItem className="w-[350px] flex flex-col">
                <FormLabel>Кол-во мест (фактич.)</FormLabel>
                <Input placeholder="Введите количество" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex items-end gap-2 w-[350px]">
          {" "}
          <FormField
            control={form.control}
            name="declared_weight"
            render={({ field }) => (
              <FormItem className="w-[350px] flex flex-col">
                <FormLabel>Вес, кг (заявл.)</FormLabel>
                <Input placeholder="Введите вес" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="actual_weight"
            render={({ field }) => (
              <FormItem className="w-[350px] flex flex-col">
                <FormLabel>Вес, кг (фактич.)</FormLabel>
                <Input placeholder="Введите вес" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex items-end gap-2 w-[350px]">
          {" "}
          <FormField
            control={form.control}
            name="declared_volume"
            render={({ field }) => (
              <FormItem className="w-full flex flex-col">
                <FormLabel>Объём, м3 (заявл.)</FormLabel>
                <Input placeholder="Введите вес" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="actual_volume"
            render={({ field }) => (
              <FormItem className="w-full flex flex-col">
                <FormLabel>Объём, м3 (фактич.)</FormLabel>
                <Input placeholder="Введите вес" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {
          <FormField
            control={form.control}
            name="pickup_date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Дата забора груза</FormLabel>
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
        }

        <h3 className="text-[16px] font-bold mt-3 mb-5">Финансовые детали</h3>

        <div className="flex items-end gap-2 w-[350px]">
          <FormField
            control={form.control}
            name="declared_rate_usd"
            render={({ field }) => (
              <FormItem className="w-full flex flex-col">
                <FormLabel>Ставка USD (заявл.) </FormLabel>
                <Input placeholder="Введите ставку" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="actual_rate_usd"
            render={({ field }) => (
              <FormItem className="w-full flex flex-col">
                <FormLabel>Ставка USD (фактич.) </FormLabel>
                <Input placeholder="Введите ставку" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="prepayment"
          render={({ field }) => (
            <FormItem className="w-[350px] flex flex-col">
              <FormLabel>Предоплата, USD</FormLabel>
              <Input placeholder="Введите ставку" {...field} />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="prepayment_rate"
          render={({ field }) => (
            <FormItem className="w-[350px] flex flex-col">
              <FormLabel>Курс предоплаты</FormLabel>
              <Input placeholder="Введите курс предоплаты" {...field} />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="invoices_count"
          render={({ field }) => (
            <FormItem className="w-[350px] flex flex-col">
              <FormLabel>Количество инвойсов</FormLabel>
              <Input placeholder="Введите количество" {...field} />
              <FormMessage />
            </FormItem>
          )}
        />

        <h3 className="text-[16px] font-bold mt-3 mb-5">Прочее</h3>

        <FormField
          control={form.control}
          name="description"
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
          name="proposal_status"
          render={({ field }) => (
            <FormItem className="w-full flex flex-col">
              <FormLabel>Статус</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Выберите статус" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="В работе">В работе</SelectItem>
                  <SelectItem value="Согласован">Согласован</SelectItem>
                  <SelectItem value="Внимание">Внимание</SelectItem>
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
        {error && <AlertComponent variant="destructive" description={error} />}
        <Button type="submit" className="mt-5">
          Сохранить
        </Button>
      </form>
    </Form>
  );
}
