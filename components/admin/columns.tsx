"use client";
import * as React from "react";
import AdminActionsCell from "./adminActionsCell";

export const columns = [
  {
    accessorKey: "full_name",
    header: "Пользователь",
  },
  {
    accessorKey: "email",
    header: "Почта",
  },
  {
    accessorKey: "role",
    header: "Роль",
    cell: ({ row }) => {
      if (row.original.role === "admin") {
        return "Администратор";
      }
      if (row.original.role === "manager") {
        return "Менеджер";
      }
      if (row.original.role === "accountant") {
        return "Бухгалтер";
      }
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return <AdminActionsCell row={row} />;
    },
  },
];
