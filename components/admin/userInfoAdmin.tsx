import React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

function UserInfoAdmin({ userInfo }: any) {
  return (
    <div>
      <Avatar>
        <AvatarFallback>A</AvatarFallback>
      </Avatar>
      <p className="text-sm">Администратор</p>
      <p className="text-sm">Имя Фамилия</p>
      <p className="text-sm">admin@pandora</p>
    </div>
  );
}

export default UserInfoAdmin;
