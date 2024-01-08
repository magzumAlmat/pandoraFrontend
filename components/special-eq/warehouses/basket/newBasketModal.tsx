"use client";
import { X } from "lucide-react";
import Form from "./form";
import { useSelector } from "react-redux";
import { TableDemo } from "../moveProposals/table";

export default function NewBasketModal({ setModal, selectedWarehouse }) {
  const selectedProposals = useSelector(
    (state: any) => state.specialEqWarehouse.selectedProposals
  );

  return (
    <div className="w-full h-screen fixed inset-0 z-10 flex justify-center">
      <div
        className="w-full absolute h-full bg-black/50 z-10"
        onClick={() => setModal(false)}
      ></div>
      <div className="w-4/5 h-5/6 overflow-auto absolute p-10 z-50 bg-white rounded mt-20">
        <h1 className="text-xl font-bold text-center mb-5">
          Создать корзину заявок
        </h1>
        <div className="mb-5 border p-5">
          <h3 className="text-md font-bold mb-3">Выбранные заявки</h3>
          <TableDemo selectedProposals={selectedProposals} />
        </div>
        <X
          onClick={() => setModal(false)}
          className="fixed top-5 right-5 cursor-pointer"
          color="#fff"
        />
        <Form
          selectedProposals={selectedProposals}
          selectedWarehouse={selectedWarehouse}
        />
      </div>
    </div>
  );
}
