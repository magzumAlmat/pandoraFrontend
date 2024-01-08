"use client";
import * as React from "react";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import CompaniesActionsCell from "./columns/companiesActionCell";

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
    accessorKey: "company_name",
    header: "Название компании",
  },
  {
    accessorKey: "company_bin",
    header: "БИН компании",
  },
  {
    accessorKey: "email",
    header: "Электронная почта",
  },
  {
    accessorKey: "phone",
    header: "Номер телефона",
  },
  {
    accessorKey: "contact_name",
    header: "Контактное лицо",
  },
  {
    accessorKey: "company_car_numbers",
    header: "Автомобили",
    cell: ({ row }) => {
      if (!row.original.company_car_numbers) {
        return <p></p>;
      }
      return (
        <>
          {row.original.company_car_numbers
            .map((el) => el.car_registration_number)
            .join(", ")}
        </>
      );
    },
  },
  {
    accessorKey: "contract",
    header: "Договор",
    cell: ({ row }) => {
      if (row.original.contract_color === "red") {
        return <p className="text-red-500">{row.getValue("contract")}</p>;
      } else {
        return <p className="text-green-500">{row.getValue("contract")}</p>;
      }
    },
  },
  {
    accessorKey: "contract_date",
    header: "Договор дата",
    cell: ({ row }) => {
      if (!row.getValue("contract_date")) {
        return <p></p>;
      }
      return (
        <p>{new Date(row.getValue("contract_date")).toLocaleDateString()}</p>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return <CompaniesActionsCell row={row} />;
    },
  },
];
