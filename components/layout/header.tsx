"use client";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useDispatch, useSelector } from "react-redux";
import { useGetUserDetailsQuery } from "@/app/store/slice/auth/authService";
import { useEffect, useState } from "react";
import { logout, setCredentials } from "@/app/store/slice/auth/authSlice";
import { Button } from "../ui/button";
import { ChevronDown } from "lucide-react";
import DropDownAdmin from "./dropdownAdmin";
import { useRouter, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import path from "path";

export default function Header() {
  const [menuAdmin, setMenuAdmin] = useState(false);
  const [headerColor, setHeaderColor] = useState("bg-primary");

  const { userInfo } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();

  const pathname = usePathname();

  const logoutUser = () => {
    dispatch(logout());
    router.push("/login");
  };

  useEffect(() => {
    if (pathname.startsWith("/special_equipment")) {
      setHeaderColor("bg-black");
    } else {
      setHeaderColor("bg-primary");
    }
  }, [pathname]);

  return (
    <header
      className={cn("px-5 py-3 flex items-center justify-between", headerColor)}
    >
      <nav className="flex items-center gap-10">
        <h1 className="text-2xl font-bold text-white">Pandora Logistics CRM</h1>
        <ul className="flex gap-10 items-center text-white">
          <li>
            <Link
              href="/companies"
              className={
                (cn("hover:text-gray-200 transition ease-in-out"),
                pathname === "/companies" ? "font-bold " : "")
              }
            >
              Компании
            </Link>
          </li>
          <li>
            <Link
              href="/proposals"
              className={
                (cn("hover:text-gray-200 transition ease-in-out"),
                pathname === "/proposals" ? "font-bold " : "")
              }
            >
              Активные заявки
            </Link>
          </li>
          <li>
            <Link
              href="/warehouses"
              className={
                (cn("hover:text-gray-200 transition ease-in-out"),
                pathname === "/warehouses" ? "font-bold " : "")
              }
            >
              Склад
            </Link>
          </li>
          <li>
            <Link
              href="/proposal_baskets"
              className={
                (cn("hover:text-gray-200 transition ease-in-out"),
                pathname === "/proposal_baskets" ? "font-bold " : "")
              }
            >
              Корзина заявок
            </Link>
          </li>
          <li>
            <Link
              href="/archive"
              className={
                (cn("hover:text-gray-200 transition ease-in-out"),
                pathname === "/archive" ? "font-bold " : "")
              }
            >
              Архив
            </Link>
          </li>
          <li>
            <Link
              href="/special_equipment/proposals"
              className={
                (cn("hover:text-gray-200 transition ease-in-out"),
                pathname.startsWith("/special_equipment") ? "font-bold " : "")
              }
            >
              Самоход/Спецтехника
            </Link>
          </li>
        </ul>
      </nav>
      {userInfo && (
        <div className="flex items-center gap-3 relative">
          <Avatar>
            {userInfo?.role === "admin" && <AvatarFallback>A</AvatarFallback>}
            {userInfo?.role === "manager" && <AvatarFallback>M</AvatarFallback>}
            {userInfo?.role === "accountant" && (
              <AvatarFallback>Б</AvatarFallback>
            )}
          </Avatar>
          <div>
            {userInfo?.role === "admin" && (
              <p className="text-white opacity-50 text-sm">администратор</p>
            )}

            {userInfo?.role === "manager" && (
              <p className="text-white opacity-50 text-sm">менеджер</p>
            )}

            {userInfo?.role === "accountant" && (
              <p className="text-white opacity-50 text-sm">бухгалтер</p>
            )}

            <p className="text-white font-bold">{userInfo?.full_name}</p>
          </div>

          <DropDownAdmin logout={logoutUser} userInfo={userInfo}>
            <ChevronDown
              className="text-white cursor-pointer"
              onClick={() => setMenuAdmin(!menuAdmin)}
            />
          </DropDownAdmin>
        </div>
      )}
    </header>
  );
}
