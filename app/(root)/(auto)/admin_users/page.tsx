"use client";
import UserInfoAdmin from "@/components/admin/userInfoAdmin";
import { UsersTable } from "@/components/admin/usersTable";
import { Button } from "@/components/ui/button";
import React, { useEffect } from "react";
import { columns } from "../../../../components/admin/columns";
import { useDispatch, useSelector } from "react-redux";
import { useGetAllUsersQuery } from "@/app/store/slice/user/userService";
import { DialogNewUser } from "@/components/admin/dialogNewUser";
import { setAllUsers } from "@/app/store/slice/user/userSlice";

function AdminPage() {
  const dispatch = useDispatch();

  const { data, error, isLoading } = useGetAllUsersQuery({});
  const { userInfo } = useSelector((state: any) => state.auth);

  useEffect(() => {
    if (data) {
      dispatch(setAllUsers(data.users));
    }
  }, [data, dispatch]);

  const users = useSelector((state: any) => state.user.allUsers);

  return (
    <div className="p-10">
      {userInfo?.role === "admin" && (
        <>
          <h1 className="text-2xl font-bold">Управление пользователями</h1>
          <DialogNewUser />
          {isLoading && <p>Загрузка...</p>}
          {users && <UsersTable columns={columns} data={users} />}
        </>
      )}
      {userInfo?.role !== "admin" && <p>У вас нет доступа к этой странице</p>}
    </div>
  );
}

export default AdminPage;
