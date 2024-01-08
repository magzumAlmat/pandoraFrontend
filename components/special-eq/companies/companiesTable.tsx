"use client";

import { columns } from "./columns";
import { DataTable } from "./data-table";
import { useState, useEffect, memo } from "react";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";

import { Building2, Forward, Plus } from "lucide-react";

import { DateRange } from "react-day-picker";
import { getAllCompanies } from "@/app/store/specialEqSlice/companySlice";
import NewCompanyModal from "./newCompany/NewCompanyModal";

const CompaniesTable = () => {
  const [modal, setModal] = useState(false);
  const dispatch = useDispatch();

  const data = useSelector((state: any) => state.specialEqCompany.companies);

  useEffect(() => {
    dispatch(getAllCompanies() as any);
  }, [dispatch]);

  return (
    <>
      {modal && <NewCompanyModal setModal={setModal} />}
      <div className="p-10">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold ">Доска компании</h1>
        </div>

        <div className="flex items-center gap-6 mb-5">
          <Button variant="outline" onClick={() => setModal(true)}>
            <Building2 className="mr-2 h-4 w-4" /> Добавить компанию
          </Button>
        </div>

        <DataTable columns={columns} data={data} />
      </div>
    </>
  );
};

export default CompaniesTable;
