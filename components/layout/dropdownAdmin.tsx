import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

function DropDownAdmin({ children, logout, userInfo }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Мой аккаунт</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {userInfo?.role === "admin" && (
          <DropdownMenuItem className="cursor-pointer">
            <Link href="/admin_users">Управление пользователями</Link>
          </DropdownMenuItem>
        )}

        <DropdownMenuItem
          className="cursor-pointer text-red-500"
          onClick={logout}
        >
          Выход
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default DropDownAdmin;
