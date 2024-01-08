import { useState } from "react";
import { useDispatch } from "react-redux";
import EditCompanyModal from "../editCompany/editCompany";

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

const CompaniesActionsCell = ({ row }) => {
  const [modal, setModal] = useState(false);

  const dispatch = useDispatch();
  const company = row.original;

  return (
    <>
      {modal && <EditCompanyModal company={company} setModal={setModal} />}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Действия</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => {
              setModal(true);
            }}
          >
            Редактировать
          </DropdownMenuItem>
          <DropdownMenuSeparator />
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default CompaniesActionsCell;
