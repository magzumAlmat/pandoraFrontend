"use client";
import React, { useEffect } from "react";
import Form from "../../components/login/form";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

function LoginPage() {
  const { loading, userInfo, error } = useSelector((state: any) => state.auth);

  const router = useRouter();

  useEffect(() => {
    if (userInfo) {
      router.push("/proposals");
    }
  }, [userInfo, router]);

  return (
    <div className="flex justify-center items-center w-full h-screen bg-[url('/main_banner_new.webp')]">
      <div className="w-[370px] bg-white p-8">
        <h1 className="text-2xl font-bold text-center mb-10">Вход</h1>
        <Form />
      </div>
    </div>
  );
}

export default LoginPage;
