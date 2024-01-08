import { useState } from "react";
import BasketInfoModal from "../basketInfo/basketinfoModal";

const BasketInternalNumberCell = ({ row }) => {
  const [modal, setModal] = useState(false);

  return (
    <>
      {modal && <BasketInfoModal setModal={setModal} basket={row.original} />}
      <span
        onClick={() => setModal(true)}
        className="cursor-pointer text-blue-600 font-bold underline"
      >
        {row.original.internal_order_number}
      </span>
    </>
  );
};

export default BasketInternalNumberCell;
