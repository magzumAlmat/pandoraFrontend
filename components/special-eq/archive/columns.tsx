"use client";
import * as React from "react";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import ProposalActionsCell from "@/components/special-eq/proposals/columns/proposalActionCell";

export const columns = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "loading_list_number",
    header: ({ column }) => {
      return (
        <Button
          className="flex items-center gap-2 p-1"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          № загрузочного листа
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "proposal_number",
    header: ({ column }) => {
      return (
        <Button
          className="flex items-center gap-2 p-1"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          №
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  // {
  //   accessorKey: "order_number",
  //   header: "№",
  // },
  {
    accessorKey: "company.company_name",
    header: "Компания",
  },
  {
    accessorKey: "company.company_bin",
    header: "БИН компании",
  },
  {
    accessorKey: "company.email",
    header: "Контакты компании",
    cell: ({ row }) => {
      return (
        <div className="w-[200px]">
          <p>{row.original.company.email}</p>
          <p>
            {row.original.company.phone} {row.original.company.contact_name}
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "broker.company_name",
    header: "Посредник",
  },
  {
    accessorKey: "broker.company_bin",
    header: "БИН посредника",
  },
  {
    accessorKey: "broker.email",
    header: "Контакты посредника",
    cell: ({ row }) => {
      return (
        <div className="w-[200px]">
          <p>{row.original.broker?.email}</p>
          <p>
            {row.original.broker?.phone} {row.original.broker?.contact_name}
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "location_from",
    header: "Откуда",
  },
  {
    accessorKey: "location_to",
    header: "Куда",
  },

  {
    accessorKey: "cargo_name",
    header: "Наименование груза",
    cell: ({ row }) => {
      return (
        <div className="w-[250px]">
          <p>{row.original.cargo_name}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "cargo_type",
    header: "Тип груза",
    cell: ({ row }) => {
      return (
        <div className="w-[100px]">
          <p>{row.original.cargo_type}</p>
        </div>
      );
    },
  },

  {
    accessorKey: "cargo_value",
    header: "Стоимость груза",
    cell: ({ row }) => {
      const value = row.original.cargo_value;
      if (value === null) {
        return null;
      }
      const parsedValue = parseFloat(value);
      return (
        <div className="w-[100px]">
          <p>{parsedValue}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "cargo_value_currency",
    header: "Валюта стоимости груза",
    cell: ({ row }) => {
      return <p>{row.original.cargo_value_currency}</p>;
    },
  },
  {
    accessorKey: "declared_quantity",
    header: "Кол-во мест, ед (заявл.)",
    cell: ({ row }) => {
      const value = row.original.declared_quantity;
      const parsedValue = parseFloat(value);
      if (value === null) {
        return null;
      }
      return parsedValue;
    },
  },
  {
    accessorKey: "actual_quantity",
    header: "Кол-во мест, ед (фактич.)",
    cell: ({ row }) => {
      const value = row.original.actual_quantity;
      const parsedValue = parseFloat(value);
      if (value === null) {
        return null;
      }
      return parsedValue;
    },
  },
  {
    accessorKey: "declared_weight",
    header: "Вес, кг (заявл.)",
    cell: ({ row }) => {
      const value = row.original.declared_weight;
      const parsedValue = parseFloat(value);
      if (value === null) {
        return null;
      }
      return parsedValue;
    },
  },
  {
    accessorKey: "actual_weight",
    header: "Вес, кг (фактич.)",
    cell: ({ row }) => {
      const value = row.original.actual_weight;
      const parsedValue = parseFloat(value);
      if (value === null) {
        return null;
      }
      return parsedValue;
    },
  },
  {
    accessorKey: "declared_volume",
    header: "Объем, м3 (заявл.)",
    cell: ({ row }) => {
      const value = row.original.declared_weight;
      const parsedValue = parseFloat(value);
      if (value === null) {
        return null;
      }
      return parsedValue;
    },
  },
  {
    accessorKey: "actual_volume",
    header: "Объем, м3 (фактич.)",
    cell: ({ row }) => {
      const value = row.original.actual_weight;
      const parsedValue = parseFloat(value);
      if (value === null) {
        return null;
      }
      return parsedValue;
    },
  },
  {
    accessorKey: "pickup_date",
    header: "Дата забора груза",
    cell: ({ row }) => {
      const value = row.original.pickup_date;
      const parsedValue = new Date(value);
      if (value === null) {
        return null;
      }
      return (
        <div className="w-[100px]">
          {parsedValue.toLocaleDateString("ru-RU")}
        </div>
      );
    },
  },
  {
    accessorKey: "proposal_status",
    header: "Статус заявки",
    cell: ({ row }) => {
      return (
        <div className="w-[100px]">
          <p>{row.original.proposal_status}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "declared_rate_usd",
    header: "Ставка (USD) (заявл.)",
    cell: ({ row }) => {
      const value = row.original.declared_rate_usd;
      const parsedValue = parseFloat(value);
      if (value === null) {
        return null;
      }
      return <div className="w-[100px]">${parsedValue}</div>;
    },
  },
  {
    accessorKey: "actual_rate_usd",
    header: "Ставка (USD) (фактич.)",
    cell: ({ row }) => {
      const value = row.original.actual_rate_usd;
      const parsedValue = parseFloat(value);
      if (value === null) {
        return null;
      }
      return <div className="w-[100px]">${parsedValue}</div>;
    },
  },
  {
    accessorKey: "rate_kzt",
    header: "Ставка (KZT)",
    cell: ({ row }) => {
      const value = row.original.rate_kzt;
      const parsedValue = parseFloat(value);
      if (value === null) {
        return null;
      }
      return <div className="w-[100px]">₸{parsedValue}</div>;
    },
  },

  {
    accessorKey: "local_expenses",
    header: "Локальные расходы",
    cell: ({ row }) => {
      if (row.original.local_expenses.length === 0) {
        return null;
      }

      const chy_total = row.original.local_expenses
        .filter((expense) => expense.currency === "CHY")
        .reduce((acc, curr) => acc + parseFloat(curr.price), 0);

      const usd_total = row.original.local_expenses
        .filter((expense) => expense.currency === "USD")
        .reduce((acc, curr) => acc + parseFloat(curr.price), 0);

      const kzt_total = row.original.local_expenses
        .filter((expense) => expense.currency === "KZT")
        .reduce((acc, curr) => acc + parseFloat(curr.price), 0);

      return (
        <>
          <p>CHY: {chy_total}</p>
          <p>USD: {usd_total}</p>
          <p>KZT: {kzt_total}</p>
        </>
      );
    },
  },
  {
    accessorKey: "invoices_count",
    header: "Кол-во инвойсов",
    cell: ({ row }) => {
      const value = row.original.invoices_count;
      const parsedValue = parseFloat(value);
      if (value === null) {
        return null;
      }
      return parsedValue;
    },
  },
  {
    accessorKey: "account_number",
    header: "Номер счета",
  },
  {
    accessorKey: "account_number_date",
    header: "Дата счета",
    cell: ({ row }) => {
      const value = row.original.account_number_date;
      const parsedValue = new Date(value);
      if (value === null) {
        return null;
      }
      return (
        <div className="w-[100px]">
          {parsedValue.toLocaleDateString("ru-RU")}
        </div>
      );
    },
  },

  {
    accessorKey: "avr_number",
    header: "Номер АВР",
  },
  {
    accessorKey: "avr_date",
    header: "Дата АВР",
    cell: ({ row }) => {
      const value = row.original.avr_date;
      const parsedValue = new Date(value);
      if (value === null) {
        return null;
      }
      return (
        <div className="w-[100px]">
          {parsedValue.toLocaleDateString("ru-RU")}
        </div>
      );
    },
  },
  {
    accessorKey: "invoice",
    header: "Счет-фактура",
  },
  {
    accessorKey: "invoice_date",
    header: "Дата счет-фактуры",
    cell: ({ row }) => {
      const value = row.original.invoice_date;
      const parsedValue = new Date(value);
      if (value === null) {
        return null;
      }
      return (
        <div className="w-[100px]">
          {parsedValue.toLocaleDateString("ru-RU")}
        </div>
      );
    },
  },
  {
    accessorKey: "prepayment",
    header: "Предоплата, USD",
  },
  {
    accessorKey: "payment_percent",
    header: "Процент оплаты (%)",
    cell: ({ row }) => {
      const value = row.original.payment_percent;
      const parsedValue = parseFloat(value);
      if (value === null) {
        return null;
      }
      return parsedValue;
    },
  },
  {
    accessorKey: "arrival_date",
    header: "Дата прибытия",
    cell: ({ row }) => {
      const value = row.original.arrival_date;
      const parsedValue = new Date(value);
      if (value === null) {
        return null;
      }
      return parsedValue.toLocaleDateString("ru-RU");
    },
  },
  {
    accessorKey: "loading_list_number",
    header: "Номер загрузочного листа",
  },
  {
    accessorKey: "accountant_note",
    header: "Примечание бухгалтера",
    cell: ({ row }) => {
      return (
        <div className={`w-[200px]`}>
          {row.original.accountant_note_color === "red" ? (
            <span className="text-red-500">{row.original.accountant_note}</span>
          ) : row.original.accountant_note_color === "green" ? (
            <span className="text-green-500">
              {row.original.accountant_note}
            </span>
          ) : row.original.accountant_note_color === "yellow" ? (
            <span className="text-yellow-500">
              {row.original.accountant_note}
            </span>
          ) : (
            <span>{row.original.accountant_note}</span>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "description",
    header: "Примечание менеджера",
    cell: ({ row }) => {
      return <div className="w-[200px]">{row.original.description}</div>;
    },
  },
  {
    accessorKey: "sales_manager.full_name",
    header: "Менеджер",
  },
  {
    accessorKey: "warehouse_statuses",
    header: "Статус груза",
    cell: ({ row }) => {
      if (row.original.warehouse_statuses.length === 0) {
        return null;
      }
      return (
        <div className="w-[200px]">
          <div className="w-full">
            <p className="whitespace-nowrap text-xs">
              {row.original.warehouse_statuses
                .map((status) => status.warehouse.warehouse_name)
                .join("→")}
            </p>
          </div>
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return <ProposalActionsCell row={row} />;
    },
  },
];
