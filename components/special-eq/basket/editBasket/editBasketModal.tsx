import Form from "@/components/special-eq/basket/editBasket/form";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import StockStatusesForm from "./stockStatusesForm";

export default function EditBasketModal({ basket, setModal }) {
  const [stockStatuses, setStockStatuses] = useState([]);

  useEffect(() => {
    if (basket && basket.stock_statuses) {
      setStockStatuses(basket.stock_statuses);
    }
  }, [basket]);

  const addStockStatus = () => {
    setStockStatuses([
      ...stockStatuses,
      { description: null, date: null, stage: null },
    ]);
  };

  const removeStockStatus = (index) => {
    const updatedStockStatuses = [...stockStatuses];
    updatedStockStatuses.splice(index, 1);
    setStockStatuses(updatedStockStatuses);
  };

  return (
    <div className="w-full h-full fixed inset-0 z-10 flex justify-center">
      <div
        className="w-full h-full absolute bg-black/50 z-10"
        onClick={() => setModal(false)}
      ></div>
      <div className="w-2/4 h-5/6 overflow-auto absolute p-10 mt-20 z-50 bg-white rounded">
        <h3 className="text-xl font-bold text-center mb-5">
          № корзины {basket.internal_order_number}
        </h3>
        <X
          onClick={() => setModal(false)}
          className="fixed top-5 right-5 cursor-pointer"
          color="#fff"
        />
        <Button variant="outline" className="mb-5" onClick={addStockStatus}>
          Добавить статус
        </Button>
        {stockStatuses.length === 0 && (
          <p className="text-center">Нет статусов</p>
        )}
        {stockStatuses.length > 0 && (
          <div className="space-y-5 border p-5 mb-10">
            {stockStatuses.map((status, index) => (
              <div key={index}>
                <p className="text-lg font-bold mb-3">Статус {index + 1}</p>
                <StockStatusesForm
                  basketId={basket.id}
                  status={status}
                  onChange={(updatedStatus) => {
                    const updatedStockStatuses = [...stockStatuses];
                    updatedStockStatuses[index] = updatedStatus;
                    setStockStatuses(updatedStockStatuses);
                  }}
                  removeStockStatus={() => removeStockStatus(index)}
                />
              </div>
            ))}
          </div>
        )}
        <Form basket={basket} />
      </div>
    </div>
  );
}
