"use client";

import { columns } from "./columns";
import { DataTable } from "./data-table";
import { useState, useEffect, memo } from "react";
import { Button } from "@/components/ui/button";
import NewProposalModal from "./newProposal/newProposalModal";
import { useDispatch, useSelector } from "react-redux";
import { getAllProposals } from "@/app/store/specialEqSlice/proposalSlice";
import NewCompanyModal from "@/components/special-eq/companies/newCompany/NewCompanyModal";
import MoveProposalsModal from "./moveProposals/moveProposalsModal";
import { Building2, Forward, Plus } from "lucide-react";
import { DatePickerWithRange } from "./excel/datePicker";
import { onExport } from "./excel/exportToExcel";
import { DateRange } from "react-day-picker";

const ProposalsTable = () => {
  const [isProposalModalOpen, setIsProposalModalOpen] = useState(false);
  const [isCompanyModalOpen, setIsCompanyModalOpen] = useState(false);
  const [isMoveModalOpen, setIsMoveModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<DateRange>({
    from: new Date(),
    to: new Date(),
  });

  const dispatch = useDispatch();

  const data = useSelector((state: any) => state.specialEqProposal.proposals);

  useEffect(() => {
    dispatch(getAllProposals() as any);
  }, [dispatch]);

  return (
    <>
      {isProposalModalOpen && (
        <NewProposalModal setModal={setIsProposalModalOpen} />
      )}
      {isCompanyModalOpen && (
        <NewCompanyModal setModal={setIsCompanyModalOpen} />
      )}
      {isMoveModalOpen && <MoveProposalsModal setModal={setIsMoveModalOpen} />}
      <div className="p-10">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold ">Доска заявок</h1>
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
          <Button variant="outline" onClick={() => setIsCompanyModalOpen(true)}>
            <Building2 className="mr-2 h-4 w-4" /> Добавить компанию
          </Button>
          <Button onClick={() => setIsProposalModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Создать новую заявку
          </Button>
          <Button onClick={() => setIsMoveModalOpen(true)}>
            <Forward className="mr-2 h-4 w-4" /> Отправить на склад
          </Button>
        </div>

        <DataTable
          columns={columns}
          data={data}
          isMoveModalOpen={isMoveModalOpen}
        />
      </div>
    </>
  );
};

export default ProposalsTable;
