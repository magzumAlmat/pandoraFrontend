"use client";

import { columns } from "./columns";
import { DataTable } from "./data-table";
import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProposals,
  setProposalsByWarehouse,
} from "@/app/store/slice/proposalSlice";
import NewWarehouseModal from "@/components/warehouses/newWarehouse/newWarehouseModal";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { getAllWarehouses } from "@/app/store/slice/warehouseSlice";
import NewBasketModal from "./basket/newBasketModal";
import MoveProposalsModal from "./moveProposals/moveProposalsModal";
import { Forward, ShoppingBasket, Warehouse } from "lucide-react";
import { DatePickerWithRange } from "./excel/datePicker";
import { DateRange } from "react-day-picker";
import { onExport } from "./excel/exportToExcel";

export default function WarehousesTable() {
  const [isWarehouseModalOpen, setIsWarehouseModalOpen] = useState(false);
  const [isMoveModalOpen, setIsMoveModalOpen] = useState(false);
  const [isBasketModalOpen, setIsBasketModalOpen] = useState(false);
  const [selectedWarehouse, setSelectedWarehouse] = useState(null);
  const [selectedDate, setSelectedDate] = useState<DateRange>({
    from: new Date(),
    to: new Date(),
  });

  const dispatch = useDispatch();

  const data = useSelector((state: any) => state.proposal.proposalsByWarehouse);
  const warehouses = useSelector((state: any) => state.warehouse.warehouses);
  const userInfo = useSelector((state: any) => state.auth.userInfo);

  useEffect(() => {
    dispatch(getAllProposals() as any);
    dispatch(getAllWarehouses() as any);
  }, []);

  const handleChooseWarehouse = (id) => {
    setSelectedWarehouse(id);
    dispatch(setProposalsByWarehouse(id));
  };

  useEffect(() => {
    if (warehouses && warehouses.length > 0) {
      dispatch(setProposalsByWarehouse(warehouses[0].id));
      setSelectedWarehouse(warehouses[0].id);
    } else {
      dispatch(getAllProposals() as any);
      dispatch(getAllWarehouses() as any);
    }
  }, [warehouses]);

  return (
    <>
      {isWarehouseModalOpen && (
        <NewWarehouseModal setModal={setIsWarehouseModalOpen} />
      )}
      {isMoveModalOpen && <MoveProposalsModal setModal={setIsMoveModalOpen} />}
      {isBasketModalOpen && (
        <NewBasketModal
          setModal={setIsBasketModalOpen}
          selectedWarehouse={selectedWarehouse}
        />
      )}
      <div className="p-10">
        <div className="flex items-center mb-4 justify-between">
          <h1 className="text-3xl font-bold">Доска складов</h1>
          <div className="flex items-center gap-2">
            <DatePickerWithRange
              onChange={setSelectedDate}
              date={selectedDate}
            />
            <Button
              variant="secondary"
              onClick={() => onExport(data, selectedDate)}
            >
              Выгрузить в Excel
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-6 mb-5">
          {userInfo?.role === "admin" && (
            <Button
              variant="outline"
              onClick={() => setIsWarehouseModalOpen(true)}
            >
              <Warehouse className="mr-2 h-4 w-4" /> Добавить склад
            </Button>
          )}

          <Button onClick={() => setIsMoveModalOpen(true)}>
            <Forward className="mr-2 h-4 w-4" /> Отправить на склад
          </Button>

          <Button onClick={() => setIsBasketModalOpen(true)}>
            <ShoppingBasket className="mr-2 h-4 w-4" />
            Добавить в корзину заявок
          </Button>
        </div>

        <div className="flex items-center gap-6 mb-5">
          <ToggleGroup
            type="single"
            onValueChange={handleChooseWarehouse}
            value={selectedWarehouse}
          >
            {warehouses.map((warehouse) => (
              <ToggleGroupItem key={warehouse.id} value={warehouse.id}>
                {warehouse.warehouse_name}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
        {data.length > 0 && (
          <DataTable
            columns={columns}
            data={data}
            isMoveModalOpen={isMoveModalOpen}
            isBasketModalOpen={isBasketModalOpen}
          />
        )}
      </div>
    </>
  );
}
