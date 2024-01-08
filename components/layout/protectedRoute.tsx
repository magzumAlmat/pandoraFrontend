"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Spinner from "../ui/spinner";
import { useDispatch } from "react-redux";
import decodeToken from "@/lib/decodeToken";
import { setCredentials } from "@/app/store/slice/auth/authSlice";
import axios from "axios";

const ProtectedRoute = ({ children }) => {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    const decodedUser = decodeToken(token);
    if (!decodedUser) {
      router.push("/login");
      return;
    }
    dispatch(setCredentials(decodedUser));
    setToken(token);
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    setLoading(false);
  }, [dispatch]);

  if (loading) {
    return <Spinner />;
  }

  if (!token) {
    // Пользователь не авторизован, перенаправляем на страницу входа
    router.push("/login");
    return null;
  }

  // Пользователь авторизован, рендерим дочерние компоненты
  return <>{children}</>;
};

export default ProtectedRoute;
