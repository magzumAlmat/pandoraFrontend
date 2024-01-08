import { X } from "lucide-react";
import Form from "./form";

export default function NewWarehouseModal({ setModal }) {
  return (
    <div className="w-full h-screen fixed inset-0 z-10 flex justify-center">
      <div
        className="w-full absolute h-full bg-black/50 z-10"
        onClick={() => setModal(false)}
      ></div>
      <div className="w-1/3 absolute p-10 z-50 bg-white rounded mt-20">
        <h1 className="text-xl font-bold text-center mb-5">Добавить склад</h1>
        <X
          onClick={() => setModal(false)}
          className="fixed top-5 right-5 cursor-pointer"
          color="#fff"
        />
        <Form />
      </div>
    </div>
  );
}
