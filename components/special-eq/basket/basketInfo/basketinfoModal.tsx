"use client";
import Form from "./form";
import { useSelector } from "react-redux";
import { X } from "lucide-react";
import { TableDemo } from "./tableInfo";

export default function BasketInfoModal({ setModal, basket }) {
  const selectedProposals = useSelector(
    (state: any) => state.specialEqProposal.selectedProposals
  );

  return (
    <div className="w-full h-screen fixed inset-0 z-10 flex justify-center">
      <div
        className="w-full absolute h-full bg-black/50 z-10"
        onClick={() => setModal(false)}
      ></div>
      <div className="w-3/5 h-5/6 overflow-auto absolute p-10 z-50 bg-white rounded mt-20">
        <h1 className="text-xl font-bold text-center mb-5">
          Подробная информация заявки {basket.internal_order_number}
        </h1>
        <Form proposals={basket.proposals} basket={basket} />
        <div className="mb-5 border p-5">
          <h3 className="text-md font-bold mb-3">Заявки в корзине</h3>
          <TableDemo proposals={basket.proposals} />
        </div>
        <X
          onClick={() => setModal(false)}
          className="fixed top-5 right-5 cursor-pointer"
          color="#fff"
        />
      </div>
    </div>
  );
}
