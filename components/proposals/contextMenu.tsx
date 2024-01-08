import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProposal } from "@/app/store/slice/proposalSlice";
import EditProposalModal from "@/components/proposals/editProposal/editProposal";
import EditPaymentModal from "@/components/proposals/editProposal/payment/editPayment";

export function ContextMenuDemo({ children, proposal }) {
  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state: any) => state.auth);

  const deleteProp = (id) => {
    const confirm = window.confirm("Вы уверены, что хотите удалить заявку?");
    if (!confirm) return;
    dispatch(deleteProposal(id) as any);
  };
  return (
    <>
      {modal && <EditProposalModal proposal={proposal} setModal={setModal} />}
      {modal2 && <EditPaymentModal proposal={proposal} setModal={setModal2} />}
      <ContextMenu>
        <ContextMenuTrigger>{children}</ContextMenuTrigger>
        <ContextMenuContent className="w-64">
          {userInfo?.role === "admin" && (
            <>
              <ContextMenuItem inset onClick={() => setModal(true)}>
                Редактировать
              </ContextMenuItem>
              <ContextMenuItem inset onClick={() => setModal2(true)}>
                Редактировать (бух.)
              </ContextMenuItem>
            </>
          )}

          {userInfo?.role === "manager" && (
            <ContextMenuItem inset onClick={() => setModal(true)}>
              Редактировать
            </ContextMenuItem>
          )}

          {userInfo?.role === "accountant" && (
            <ContextMenuItem inset onClick={() => setModal2(true)}>
              Редактировать
            </ContextMenuItem>
          )}

          <ContextMenuItem
            inset
            className="text-red-500"
            onClick={() => deleteProp(proposal.id)}
          >
            Удалить
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </>
  );
}
