import Form from "@/components/proposals/editProposal/form";
import { X } from "lucide-react";

export default function EditProposalModal({ proposal, setModal }) {
  return (
    <div className="w-full h-full fixed inset-0 z-10 flex justify-center">
      <div
        className="w-full h-full absolute bg-black/50 z-10"
        onClick={() => setModal(false)}
      ></div>
      <div className="w-1/3 h-5/6 overflow-auto absolute p-10 mt-20 z-50 bg-white rounded">
        <h3 className="text-xl font-bold text-center mb-5">
          № заявки {proposal.proposal_number}
        </h3>
        <X
          onClick={() => setModal(false)}
          className="fixed top-5 right-5 cursor-pointer"
          color="#fff"
        />
        <Form proposal={proposal} />
      </div>
    </div>
  );
}
