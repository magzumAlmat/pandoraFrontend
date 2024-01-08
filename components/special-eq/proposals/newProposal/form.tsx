"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import ruLocale from "date-fns/locale/ru";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
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
import CompanyAutocomplete from "./companyAutocomplete";
import BrokerAutocomplete from "./brokerAutocomplete";
import { useDispatch, useSelector } from "react-redux";
import {
  addProposal,
  setError,
  setSuccess,
} from "@/app/store/specialEqSlice/proposalSlice";
import { AlertComponent } from "@/components/alerts/alert";
import { useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  cargo_name: z.string().min(1, {
    message: "Наименование груза обязательно",
  }),
  company_id: z.number().gt(0, {
    message: "Компания обязательна",
  }),
  broker_id: z.number(),
  location_from: z.string().min(1, {
    message: "Откуда обязательна",
  }),
  location_to: z.string().min(1, {
    message: "Куда обязательна",
  }),
  proposal_number: z.string().min(1, {
    message: "Номер обязателен",
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
  cargo_type: z.string(),
  description: z.string(),
  cargo_value: z.string(),
  cargo_value_currency: z.string(),
  prepayment: z.string(),
  prepayment_rate: z.string(),
  pickup_date: z.date().nullable(),
  invoices_count: z.string(),
});

export default function ProfileForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cargo_name: "",
      cargo_type: "",
      company_id: 0,
      broker_id: 0,
      location_from: "",
      location_to: "",
      proposal_number: "",
      declared_quantity: "",
      declared_weight: "",
      declared_volume: "",
      declared_rate_usd: "",
      description: "",
      cargo_value: "",
      cargo_value_currency: "",
      prepayment: "",
      prepayment_rate: "",
      pickup_date: null,
      invoices_count: "",
    },
  });

  const dispatch = useDispatch();
  const success = useSelector((state: any) => state.specialEqProposal.success);
  const error = useSelector((state: any) => state.specialEqProposal.error);

  function onSubmit(values: z.infer<typeof formSchema>) {
    dispatch(setSuccess(false));
    dispatch(setError(null));
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

    dispatch(addProposal(data) as any);
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
        <FormField
          control={form.control}
          name="proposal_number"
          render={({ field }) => (
            <FormItem className="w-[200px] flex flex-col mb-5">
              <FormLabel>
                Внутренний Номер Заявки <span className="text-red-500">*</span>
              </FormLabel>
              <Input placeholder="Введите номер заявки" {...field} />
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-5 w-[500px]">
          <FormField
            control={form.control}
            name="company_id"
            render={({ field }) => (
              <FormItem className="w-full flex flex-col mb-5">
                <FormLabel>
                  Компания <span className="text-red-500">*</span>
                </FormLabel>
                <CompanyAutocomplete field={field} form={form} />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="broker_id"
            render={({ field }) => (
              <FormItem className="w-full flex flex-col mb-5">
                <FormLabel>Посредник</FormLabel>
                <BrokerAutocomplete field={field} form={form} />
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
              <FormItem className="w-full flex flex-col  mb-5">
                <FormLabel>
                  Откуда <span className="text-red-500">*</span>
                </FormLabel>
                <Input placeholder="Откуда" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location_to"
            render={({ field }) => (
              <FormItem className="w-full flex flex-col mb-5">
                <FormLabel>
                  Куда <span className="text-red-500">*</span>
                </FormLabel>
                <Input placeholder="Куда" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <h3 className="text-md font-bold mt-3 mb-5">Данные груза</h3>

        <FormField
          control={form.control}
          name="cargo_name"
          render={({ field }) => (
            <FormItem className="w-[500px] flex flex-col mb-5">
              <FormLabel>
                Наименование груза <span className="text-red-500">*</span>
              </FormLabel>
              <Input placeholder="Введите наименование груза" {...field} />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="cargo_type"
          render={({ field }) => (
            <FormItem className="w-[350px]  flex flex-col mb-5">
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

        <FormField
          control={form.control}
          name="declared_quantity"
          render={({ field }) => (
            <FormItem className="w-[350px] flex flex-col">
              <FormLabel>
                Количество мест (заявл.) <span className="text-red-500">*</span>
              </FormLabel>
              <Input placeholder="Введите количество" {...field} />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="declared_weight"
          render={({ field }) => (
            <FormItem className="w-[350px] flex flex-col">
              <FormLabel>
                Вес, кг (заявл.) <span className="text-red-500">*</span>
              </FormLabel>
              <Input placeholder="Введите вес" {...field} />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="declared_volume"
          render={({ field }) => (
            <FormItem className="w-[350px] flex flex-col">
              <FormLabel>
                Объём, м3 (заявл.) <span className="text-red-500">*</span>
              </FormLabel>
              <Input placeholder="Введите вес" {...field} />
              <FormMessage />
            </FormItem>
          )}
        />

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

        <h3 className="text-md font-bold mt-3 mb-5">Финансовые детали</h3>

        <FormField
          control={form.control}
          name="declared_rate_usd"
          render={({ field }) => (
            <FormItem className="w-[350px] flex flex-col">
              <FormLabel>
                Ставка USD (заявл.) <span className="text-red-500">*</span>{" "}
              </FormLabel>
              <Input placeholder="Введите ставку" {...field} />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="prepayment"
          render={({ field }) => (
            <FormItem className="w-[350px] flex flex-col">
              <FormLabel>Предоплат, USD</FormLabel>
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

        <h3 className="text-md font-bold mt-3 mb-5">Прочее</h3>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="w-[500px] flex flex-col">
              <FormLabel>Примечание к заявке</FormLabel>
              <Input placeholder="Введите примечание" {...field} />
              <FormMessage />
            </FormItem>
          )}
        />

        {success && (
          <AlertComponent
            description="Заявка успешно создана"
            variant="success"
          />
        )}

        {error && <AlertComponent description={error} variant="destructive" />}

        <Button type="submit" className="mt-5">
          Создать
        </Button>
      </form>
    </Form>
  );
}
