import React from "react";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  useActivateUserMutation,
  useDeactivateUserMutation,
  useEditRoleMutation,
  useGetAllUsersQuery,
  useResetPasswordMutation,
} from "@/app/store/slice/user/userService";

const AdminActionsCell = ({ row }) => {
  const user = row.original;

  const { refetch } = useGetAllUsersQuery({});
  const [resetPassword] = useResetPasswordMutation();
  const [editRole] = useEditRoleMutation();
  const [deactivateUser] = useDeactivateUserMutation();
  const [activateUser] = useActivateUserMutation();

  const handleReset = async () => {
    await resetPassword({
      id: user.id,
      email: user.email,
    });
  };

  const handleRoleEdit = async (roleName) => {
    await editRole({
      id: user.id,
      role: roleName,
    });
    refetch();
  };

  const handleDeactivate = async () => {
    await deactivateUser(user.id);

    refetch();
  };

  const handleActivate = async () => {
    await activateUser(user.id);
    refetch();
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Действия</DropdownMenuLabel>
          <DropdownMenuItem onClick={handleReset}>
            Сбросить пароль
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => handleRoleEdit("admin")}>
            Изменить роль на: Админ
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleRoleEdit("manager")}>
            Изменить роль на: Менеджер
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleRoleEdit("accountant")}>
            Изменить роль на: Бухгалтер
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          {user.isActive && (
            <DropdownMenuItem
              className="text-red-600"
              onClick={handleDeactivate}
            >
              Удалить
            </DropdownMenuItem>
          )}

          {!user.isActive && (
            <DropdownMenuItem className="text-red-600" onClick={handleActivate}>
              Восстановить
            </DropdownMenuItem>
          )}

          <DropdownMenuSeparator />
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default AdminActionsCell;
