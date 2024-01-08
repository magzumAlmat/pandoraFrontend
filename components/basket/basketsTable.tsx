"use client";

import { columns } from "./columns";
import { DataTable } from "./data-table";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingListModal from "./loadingList/loadingListModal";
import { getAllBasketProposalsAsync } from "@/app/store/slice/basket/basketThunks";
import { DatePickerWithRange } from "./excel/datePicker";
import { Button } from "../ui/button";
import { onExport } from "./excel/exportToExcel";
import { DateRange } from "react-day-picker";

export default function BasketsTable() {
  const [loadingModal, setLoadingModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<DateRange>({
    from: new Date(),
    to: new Date(),
  });

  const dispatch = useDispatch();

  const data = useSelector((state: any) => state.basket.basketProposals);

  useEffect(() => {
    dispatch(getAllBasketProposalsAsync() as any);
  }, [dispatch]);

  return (
    <>
      {loadingModal && <LoadingListModal setModal={setLoadingModal} />}
      <div className="p-10">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold ">Доска корзины заявок</h1>
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
        <DataTable columns={columns} data={data} loadingModal={loadingModal} />
      </div>
    </>
  );
}
