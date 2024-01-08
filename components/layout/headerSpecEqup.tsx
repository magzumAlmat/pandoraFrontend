import Link from "next/link";
import React from "react";

function headerSpecEqup() {
  return (
    <nav className="flex gap-10 p-4 bg-gray-200">
      <Link href="/special_equipment/companies">Компании</Link>
      <Link href="/special_equipment/proposals">Активные заявки</Link>
      <Link href="/special_equipment/warehouses">Склад</Link>
      <Link href="/special_equipment/proposal_baskets">Корзина заявок</Link>
      <Link href="/special_equipment/archive">Архив</Link>
    </nav>
  );
}

export default headerSpecEqup;
