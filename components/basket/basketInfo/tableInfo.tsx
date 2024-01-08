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

export function TableDemo({ proposals }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Номер заявки</TableHead>
          <TableHead>Компания</TableHead>
          <TableHead>Название груза</TableHead>
          <TableHead>Откуда</TableHead>
          <TableHead>Куда</TableHead>
          <TableHead>Кол-во мест</TableHead>
          <TableHead>Вес</TableHead>
          <TableHead>Объём</TableHead>
          <TableHead>Ставка USD</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {proposals.map((proposal) => (
          <TableRow key={proposal.id}>
            <TableCell>№ {proposal.proposal_number}</TableCell>
            <TableCell>{proposal.company.company_name}</TableCell>
            <TableCell>{proposal.cargo_name}</TableCell>
            <TableCell>{proposal.location_from}</TableCell>
            <TableCell>{proposal.location_to}</TableCell>
            <TableCell>{parseFloat(proposal.actual_quantity)}</TableCell>
            <TableCell>{parseFloat(proposal.actual_weight)}</TableCell>
            <TableCell>{parseFloat(proposal.actual_volume)}</TableCell>
            <TableCell>{parseFloat(proposal.actual_rate_usd)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={5}>Итого</TableCell>
          <TableCell className="text-left">
            {proposals.reduce((acc, proposal) => {
              return acc + parseFloat(proposal.actual_quantity);
            }, 0)}
          </TableCell>
          <TableCell className="text-left">
            {proposals.reduce((acc, proposal) => {
              return acc + parseFloat(proposal.actual_weight);
            }, 0)}
          </TableCell>
          <TableCell className="text-left">
            {proposals.reduce((acc, proposal) => {
              return acc + parseFloat(proposal.actual_volume);
            }, 0)}
          </TableCell>
          <TableCell className="text-left">
            {proposals.reduce((acc, proposal) => {
              return acc + parseFloat(proposal.actual_rate_usd);
            }, 0)}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
