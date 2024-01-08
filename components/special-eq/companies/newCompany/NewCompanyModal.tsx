import Form from "./form";
import { X } from "lucide-react";

export default function NewCompanyModal({ setModal }) {
  return (
    <div className="w-full h-screen fixed inset-0 z-10 flex justify-center">
      <div
        className="w-full absolute h-full bg-black/50 z-10"
        onClick={() => setModal(false)}
      ></div>
      <div className="w-2/5 h-5/6 overflow-auto absolute p-10 mt-10  z-50 bg-white rounded">
        <h1 className="text-xl font-bold text-center mb-5">
          Добавить компанию
        </h1>
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
