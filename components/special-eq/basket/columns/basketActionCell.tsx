import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EditBasketModal from "../editBasket/editBasketModal";
import EditPaymentModal from "../editBasket/payment/editPayment";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteBasketAsync } from "@/app/store/specialEqSlice/basket/basketThunks";

const BasketActionsCell = ({ row }) => {
  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);
  const dispatch = useDispatch();
  const basket = row.original;

  const { userInfo } = useSelector((state: any) => state.auth);

  const deleteBask = (id) => {
    const confirm = window.confirm("Вы уверены, что хотите удалить заявку?");
    if (!confirm) return;
    dispatch(deleteBasketAsync({ id }) as any);
  };

  return (
    <>
      {modal && <EditBasketModal basket={basket} setModal={setModal} />}
      {modal2 && <EditPaymentModal basket={basket} setModal={setModal2} />}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Действия</DropdownMenuLabel>
          {userInfo?.role === "admin" && (
            <>
              <DropdownMenuItem
                onClick={() => {
                  setModal(true);
                }}
              >
                Редактировать
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  setModal2(true);
                }}
              >
                Редактировать (бух.)
              </DropdownMenuItem>
            </>
          )}

          {userInfo?.role === "manager" && (
            <DropdownMenuItem
              onClick={() => {
                setModal(true);
              }}
            >
              Редактировать
            </DropdownMenuItem>
          )}

          {userInfo?.role === "accountant" && (
            <DropdownMenuItem
              onClick={() => {
                setModal2(true);
              }}
            >
              Редактировать (бух.)
            </DropdownMenuItem>
          )}

          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-red-600"
            onClick={() => deleteBask(basket.id)}
          >
            Удалить
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default BasketActionsCell;
