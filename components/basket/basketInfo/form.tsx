"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

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
import { setSuccess } from "@/app/store/slice/basket/basketSlice";
import { useEffect } from "react";

import ExcelJS from "exceljs";
import { Button } from "@/components/ui/button";
import { updateBasketAsync } from "@/app/store/slice/basket/basketThunks";
import { AlertComponent } from "@/components/alerts/alert";

const formSchema = z.object({});

export default function ProfileForm({ proposals, basket }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  const success = useSelector((state: any) => state.basket.success);

  const dispatch = useDispatch();

  function onSubmit(values: z.infer<typeof formSchema>) {
    dispatch(
      updateBasketAsync({
        id: basket.id,
        data: {
          ...values,
          proposal_ids: proposals.map((proposal) => proposal.id),
        },
      }) as any
    );
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Sheet1");

    worksheet.columns = [
      { header: "№", key: "index", width: 5 },
      { header: "№ заявки(КНР)", key: "proposal_number", width: 30 },
      { header: "Получатель", key: "company_name", width: 50 },
      { header: "Наименование груза", key: "cargo_name", width: 60 },
      { header: "Кол-во мест", key: "actual_quantity", width: 25 },
      { header: "Вес", key: "actual_weight", width: 25 },
      { header: "Объем", key: "actual_volume", width: 25 },
      { header: "Номер машины", key: "car_registration_number", width: 60 },
    ];

    proposals.forEach((proposal, index) => {
      worksheet.addRow({
        index: index + 1,
        proposal_number: proposal.proposal_number,
        company_name: proposal.company.company_name,
        cargo_name: proposal.cargo_name,
        actual_quantity: proposal.actual_quantity,
        actual_weight: proposal.actual_weight,
        actual_volume: proposal.actual_volume,
        car_registration_number: proposal.car_registration_number,
      });
    });

    const title = `Загрузочный лист ${basket.internal_order_number} ${
      basket.kpp
    } авто ${new Date(basket.arrival_date).getFullYear()}г`;

    // Добавление заголовка
    worksheet.spliceRows(1, 0, [`${title}`]);

    worksheet.mergeCells("A1:H1");
    const titleRow = worksheet.getCell("A1");
    titleRow.value = `${title}`;
    titleRow.font = {
      name: "Times New Roman",
      size: 14,
      bold: true,
    };
    titleRow.alignment = { horizontal: "center", vertical: "middle" };
    titleRow.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFFFFFFF" },
    };
    titleRow.border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };

    worksheet.addRow({
      index: "",
      proposal_number: "",
      company_name: "",
      cargo_name: "",
      actual_quantity: basket.total_quantity,
      actual_weight: basket.total_weight,
      actual_volume: basket.total_volume,
      car_registration_number: "",
    });

    // Стилизация ячеек
    worksheet.eachRow((row, rowNumber) => {
      row.eachCell((cell) => {
        cell.font = {
          name: "Times New Roman",
          family: 4,
          size: 12,
          bold: true,
        };
        cell.alignment = { vertical: "middle", horizontal: "center" };
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "FFFFFFFF" },
        };
        cell.border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
      });
    });

    worksheet.eachRow((row) => {
      row.height = 30;
    });

    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `${title}.xlsx`;
      link.click();
    });
  }

  useEffect(() => {
    return () => {
      dispatch(setSuccess(false));
    };
  }, []);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex items-start gap-5 mb-5 justify-end"
      >
        <Button type="submit">Выгрузить в Excel</Button>
      </form>
      {success && <AlertComponent variant="success" title="Успешно" />}
    </Form>
  );
}
