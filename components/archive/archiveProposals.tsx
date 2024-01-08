"use client";

import { columns } from "./columns";
import { DataTable } from "./data-table";
import { useState, useEffect, memo } from "react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { getAllArchivedProposals } from "@/app/store/slice/proposalSlice";
import { DatePickerWithRange } from "./excel/datePicker";
import { onExport } from "./excel/exportToExcel";
import { DateRange } from "react-day-picker";

const ArchiveProposalsTable = () => {
  const [selectedDate, setSelectedDate] = useState<DateRange>({
    from: new Date(),
    to: new Date(),
  });

  const dispatch = useDispatch();

  const data = useSelector((state: any) => state.proposal.archived);

  useEffect(() => {
    dispatch(getAllArchivedProposals() as any);
  }, [dispatch]);

  return (
    <>
      <div className="p-10">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold ">Архив заявок</h1>
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

        <DataTable columns={columns} data={data} />
      </div>
    </>
  );
};

export default ArchiveProposalsTable;
