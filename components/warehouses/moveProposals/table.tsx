import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function TableDemo({ selectedProposals }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Номер заявки</TableHead>
          <TableHead>Компания</TableHead>
          <TableHead>Название груза</TableHead>
          <TableHead>Откуда</TableHead>
          <TableHead>Куда</TableHead>
          <TableHead>Статус склада</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {selectedProposals.map((proposal) => (
          <TableRow key={proposal.id}>
            <TableCell>№ {proposal.proposal_number}</TableCell>
            <TableCell>{proposal.company.company_name}</TableCell>
            <TableCell>{proposal.cargo_name}</TableCell>
            <TableCell>{proposal.location_from}</TableCell>
            <TableCell>{proposal.location_to}</TableCell>
            <TableCell className="w-full flex flex-col gap-2">
              {proposal.warehouse_statuses.map((status) => (
                <div key={status.id} className="flex flex-row gap-4">
                  <p className="w-1/2">{status.warehouse.warehouse_name}</p>
                </div>
              ))}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
