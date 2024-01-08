import Form from "@/components/special-eq/basket/editBasket/payment/form";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import LocalExpenseForm from "./localExpenseForm";

export default function EditPaymentModal({ basket, setModal }) {
  const [localExpenses, setLocalExpenses] = useState([]);

  useEffect(() => {
    if (basket && basket.local_expenses) {
      setLocalExpenses(basket.local_expenses);
    }
  }, [basket]);

  const addLocalExpense = () => {
    setLocalExpenses([...localExpenses, { description: "", price: "" }]);
  };

  const removeLocalExpense = (index) => {
    const updatedLocalExpenses = [...localExpenses];
    updatedLocalExpenses.splice(index, 1);
    setLocalExpenses(updatedLocalExpenses);
  };

  return (
    <div className="w-full h-full fixed inset-0 z-10 flex justify-center">
      <div
        className="w-full h-full absolute bg-black/50 z-10"
        onClick={() => setModal(false)}
      ></div>
      <div className="w-1/3 h-5/6 overflow-auto absolute p-10 mt-20 z-50 bg-white rounded">
        <h3 className="text-xl font-bold text-center mb-5">
          № заявки {basket.internal_order_number}
        </h3>
        <X
          onClick={() => setModal(false)}
          className="fixed top-5 right-5 cursor-pointer"
          color="#fff"
        />
        <Button variant="outline" className="mb-5" onClick={addLocalExpense}>
          Добавить локальный расход
        </Button>
        {localExpenses.length === 0 && (
          <p className="text-center">Нет локальных расходов</p>
        )}
        {localExpenses.length > 0 && (
          <div className="space-y-5 border p-5 mb-10">
            {localExpenses.map((expense, index) => (
              <div key={index}>
                <p className="text-lg font-bold mb-3">
                  Локальный расход {index + 1}
                </p>
                <LocalExpenseForm
                  basketId={basket.id}
                  expense={expense}
                  onChange={(updatedExpense) => {
                    const updatedLocalExpenses = [...localExpenses];
                    updatedLocalExpenses[index] = updatedExpense;
                    setLocalExpenses(updatedLocalExpenses);
                  }}
                  removeLocalExpense={() => removeLocalExpense(index)}
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
