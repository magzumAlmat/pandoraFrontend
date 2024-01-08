"use client";
import * as React from "react";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import BasketActionsCell from "./columns/basketActionCell";
import BasketInternalNumberCell from "./columns/basketInternalNumberCell";

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
    accessorKey: "internal_order_number",
    header: ({ column }) => {
      return (
        <Button
          className="flex items-center gap-2 p-1"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          № внутренний
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <BasketInternalNumberCell row={row} />;
    },
  },
  {
    accessorKey: "arrival_date",
    header: ({ column }) => {
      return (
        <Button
          className="flex items-center gap-2 p-1"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Дата прибытия
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const value = new Date(row.original.arrival_date).toLocaleDateString();
      return value;
    },
  },
  {
    accessorKey: "cars",
    header: "Автомашины",
    cell: ({ row }) => {
      const value = row.original.cars.map(
        (car) => car.company_car_number.car_registration_number
      );

      return <p>{value.join(", ")}</p>;
    },
  },
  {
    accessorKey: "frakht_usd",
    header: "Фрахт USD",
    cell: ({ row }) => {
      if (row.original.cars === null) {
        return null;
      }

      const value = row.original.cars.reduce((acc, car) => {
        if (car.frakht_currency === "USD") {
          return acc + parseFloat(car.frakht);
        } else {
          return acc;
        }
      }, 0);

      return value.toFixed(2);
    },
  },
  {
    accessorKey: "frakht_chy",
    header: "Фрахт CHY",
    cell: ({ row }) => {
      if (row.original.cars === null) {
        return null;
      }

      const value = row.original.cars.reduce((acc, car) => {
        if (car.frakht_currency === "CHY") {
          return acc + parseFloat(car.frakht);
        } else {
          return acc;
        }
      }, 0);

      return value.toFixed(2);
    },
  },
  {
    accessorKey: "frakht_kzt",
    header: "Фрахт KZT",
    cell: ({ row }) => {
      if (row.original.cars === null) {
        return null;
      }

      const value = row.original.cars.reduce((acc, car) => {
        if (car.frakht_currency === "KZT") {
          return acc + parseFloat(car.frakht);
        } else {
          return acc;
        }
      }, 0);

      return value.toFixed(2);
    },
  },
  {
    accessorKey: "kpp",
    header: "КПП",
  },
  {
    accessorKey: "total_quantity",
    header: "Общее кол-во мест",
    cell: ({ row }) => {
      const value = row.original.total_quantity;
      const parsedValue = parseFloat(value);
      if (value === null) {
        return null;
      }
      return parsedValue;
    },
  },
  {
    accessorKey: "total_volume",
    header: "Общий объем",
    cell: ({ row }) => {
      const value = row.original.total_volume;
      const parsedValue = parseFloat(value);
      if (value === null) {
        return null;
      }
      return parsedValue;
    },
  },
  {
    accessorKey: "total_weight",
    header: "Общий вес",
    cell: ({ row }) => {
      const value = row.original.total_weight;
      const parsedValue = parseFloat(value);
      if (value === null) {
        return null;
      }
      return parsedValue;
    },
  },

  {
    accessorKey: "usd_exchange_rate",
    header: "Курс USD",
    cell: ({ row }) => {
      const value = row.original.usd_exchange_rate;
      const parsedValue = parseFloat(value);
      if (value === null) {
        return null;
      }
      return parsedValue;
    },
  },
  {
    accessorKey: "total_rate_usd",
    header: "Общая стоимость USD",
    cell: ({ row }) => {
      const value = row.original.total_rate_usd;
      const parsedValue = parseFloat(value);
      if (value === null) {
        return null;
      }
      return `$${parsedValue}`;
    },
  },

  {
    accessorKey: "total_rate_kzt",
    header: "Общая стоимость KZT",
    cell: ({ row }) => {
      const value = row.original.total_rate_kzt;
      const parsedValue = parseFloat(value);
      if (value === null) {
        return null;
      }
      return `₸${parsedValue}`;
    },
  },

  {
    accessorKey: "total_local_expenses",
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
    accessorKey: "stages",
    header: "Статус",
    cell: ({ row }) => {
      if (!row.original.stock_statuses) {
        return null;
      }
      return (
        <div className="w-[500px]">
          {row.original.stock_statuses.map((status) => (
            <div key={status.id} className="w-full">
              <p className="whitespace-nowrap text-sm">
                {status.stage} {new Date(status.date).toLocaleDateString()}{" "}
                {status.description}
              </p>
            </div>
          ))}
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return <BasketActionsCell row={row} />;
    },
  },
];
