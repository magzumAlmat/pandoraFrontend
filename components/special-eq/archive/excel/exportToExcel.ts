import ExcelJS from "exceljs";
import { format } from "date-fns";

export const onExport = (data, dateRange) => {
  const filteredData =
    dateRange && dateRange.from && dateRange.to
      ? data.filter((proposal) => {
          const proposalDate = new Date(proposal.createdAt);
          return (
            proposalDate >= new Date(dateRange.from) &&
            proposalDate <= new Date(dateRange.to)
          );
        })
      : data;

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Sheet1");

  worksheet.columns = [
    { header: "№", key: "index", width: 5 },
    { header: "№ заявки(КНР)", key: "proposal_number", width: 30 },
    { header: "Получатель", key: "company_name", width: 50 },
    { header: "БИН компании", key: "company_bin", width: 50 },
    { header: "Почта компании", key: "email", width: 50 },
    { header: "Номер телефона", key: "phone", width: 50 },
    { header: "Контактное лицо", key: "contact_name", width: 50 },
    { header: "Посредник", key: "broker_name", width: 50 },
    { header: "БИН посредник", key: "broker_bin", width: 50 },
    { header: "Почта посредника", key: "broker_email", width: 50 },
    { header: "Номер телефона", key: "broker_phone", width: 50 },
    { header: "Контактное лицо", key: "broker_contact_name", width: 50 },
    { header: "Откуда", key: "location_from", width: 50 },
    { header: "Куда", key: "location_to", width: 50 },
    { header: "Наименование груза", key: "cargo_name", width: 60 },
    { header: "Тип груза", key: "cargo_type", width: 50 },
    { header: "Стоимость груза", key: "cargo_value", width: 50 },
    {
      header: "Стоимость груза (валюта)",
      key: "cargo_value_currency",
      width: 50,
    },
    { header: "Кол-во мест (заявл.)", key: "declared_quantity", width: 25 },
    { header: "Кол-во мест (фактич.)", key: "actual_quantity", width: 25 },
    { header: "Вес (заявл.)", key: "declared_weight", width: 25 },
    { header: "Вес (фактич.)", key: "actual_weight", width: 25 },
    { header: "Объем (заявл.)", key: "declared_volume", width: 25 },
    { header: "Объем (фактич.)", key: "actual_volume", width: 25 },
    { header: "Статус заявки", key: "proposal_status", width: 50 },
    { header: "Дата забора груза", key: "pickup_date", width: 50 },
    { header: "Ставка (USD) (заявл.)", key: "declared_rate_usd", width: 50 },
    { header: "Ставка (USD) (фактич.)", key: "actual_rate_usd", width: 50 },
    { header: "Ставка (KZT)", key: "rate_kzt", width: 50 },
    { header: "Локальные расходы (CHY)", key: "local_expenses_chy", width: 50 },
    { header: "Локальные расходы (USD)", key: "local_expenses_usd", width: 50 },
    { header: "Локальные расходы (KZT)", key: "local_expenses_kzt", width: 50 },
    { header: "Предоплата, USD", key: "prepayment", width: 50 },
    { header: "Курс предоплаты", key: "prepayment_rate", width: 50 },
    { header: "Кол-во инвойсов", key: "invoices_count", width: 50 },
    { header: "Процент оплаты", key: "payment_percent", width: 50 },
    {
      header: "Дата прибытия",
      key: "arrival_date",
      width: 50,
    },
    { header: "Номер счета", key: "account_number", width: 50 },
    { header: "Номер счета (дата)", key: "account_number_date", width: 50 },
    { header: "Номер АВР", key: "avr_number", width: 50 },
    { header: "Номер АВР (дата)", key: "avr_date", width: 50 },
    { header: "Счет фактура", key: "invoice", width: 50 },
    { header: "Счет фактура (дата)", key: "invoice_date", width: 50 },
    { header: "Примечание (бух.)", key: "accountant_note", width: 50 },
    {
      header: "Номер загрузочного листа",
      key: "loading_list_number",
      width: 50,
    },
    { header: "Описание", key: "description", width: 50 },
    { header: "Менеджер", key: "sales_manager", width: 50 },
    { header: "Статус груза", key: "warehouse_statuses", width: 200 },
  ];

  filteredData.forEach((proposal, index) => {
    let localExpensesCHY = 0;
    let localExpensesUSD = 0;
    let localExpensesKZT = 0;

    if (proposal.local_expenses.length > 0) {
      localExpensesCHY = proposal.local_expenses.reduce((acc, exp) => {
        if (exp.currency === "CHY") {
          return acc + parseFloat(exp.price) || 0;
        }
        return acc;
      }, 0);

      localExpensesUSD = proposal.local_expenses.reduce((acc, exp) => {
        if (exp.currency === "USD") {
          return acc + parseFloat(exp.price) || 0;
        }
        return acc;
      }, 0);

      localExpensesKZT = proposal.local_expenses.reduce((acc, exp) => {
        if (exp.currency === "KZT") {
          return acc + parseFloat(exp.price) || 0;
        }
        return acc;
      }, 0);
    }

    worksheet.addRow({
      index: index + 1,
      proposal_number: proposal.proposal_number,
      company_name: proposal.company.company_name,
      company_bin: proposal.company.company_bin,
      email: proposal.company.email,
      phone: proposal.company.phone,
      contact_name: proposal.company.contact_name,
      broker_name: proposal.broker.company_name,
      broker_bin: proposal.broker.company_bin,
      broker_email: proposal.broker.email,
      broker_phone: proposal.broker.phone,
      broker_contact_name: proposal.broker.contact_name,
      location_from: proposal.location_from,
      location_to: proposal.location_to,
      cargo_name: proposal.cargo_name,
      cargo_type: proposal.cargo_type,
      cargo_value: proposal.cargo_value,
      cargo_value_currency: proposal.cargo_value_currency,
      declared_quantity: proposal.declared_quantity,
      actual_quantity: proposal.actual_quantity,
      declared_weight: proposal.declared_weight,
      actual_weight: proposal.actual_weight,
      declared_volume: proposal.declared_volume,
      actual_volume: proposal.actual_volume,
      proposal_status: proposal.proposal_status,
      pickup_date: proposal.pickup_date
        ? new Date(proposal.pickup_date).toLocaleDateString("ru-RU")
        : "",
      declared_rate_usd: proposal.declared_rate_usd,
      actual_rate_usd: proposal.actual_rate_usd,
      rate_kzt: proposal.rate_kzt,
      local_expenses_chy: localExpensesCHY,
      local_expenses_usd: localExpensesUSD,
      local_expenses_kzt: localExpensesKZT,
      prepayment: proposal.prepayment,
      prepayment_rate: proposal.prepayment_rate,
      invoices_count: proposal.invoices_count,
      payment_percent: proposal.payment_percent,
      arrival_date: proposal.arrival_date
        ? new Date(proposal.arrival_date).toLocaleDateString("ru-RU")
        : "",
      account_number: proposal.account_number,
      account_number_date:
        proposal.account_number_date &&
        new Date(proposal.account_number_date).toLocaleDateString("ru-RU"),
      avr_number: proposal.avr_number,
      avr_date:
        proposal.avr_date &&
        new Date(proposal.avr_date).toLocaleDateString("ru-RU"),
      invoice: proposal.invoice,
      invoice_date:
        proposal.invoice_date &&
        new Date(proposal.invoice_date).toLocaleDateString("ru-RU"),
      accountant_note: proposal.accountant_note,
      loading_list_number: proposal.loading_list_number,
      description: proposal.description,
      sales_manager: proposal.sales_manager.full_name,
      warehouse_statuses: `${proposal.warehouse_statuses.map(
        (status) => status.warehouse.warehouse_name
      )}`,
    });
  });

  const formattedDateRange =
    dateRange && dateRange.from && dateRange.to
      ? `${format(new Date(dateRange.from), "dd.MM.yyyy")}-${format(
          new Date(dateRange.to),
          "dd.MM.yyyy"
        )}`
      : "All";

  const title = `Pandora Logistics CRM - Самоход/Спецтехника Архивные Заявки - ${formattedDateRange}`;

  // Add the title as the first row
  worksheet.spliceRows(1, 0, [title]);

  // Merge cells for the title row
  worksheet.mergeCells("A1:H1");
  const titleRow = worksheet.getCell("A1");
  titleRow.value = `${title}`;
  titleRow.font = {
    name: "Times New Roman",
    size: 14,
    bold: true,
  };
  titleRow.alignment = { horizontal: "center", vertical: "middle" };
  titleRow.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FFFFFFFF" },
  };
  titleRow.border = {
    top: { style: "thin" },
    left: { style: "thin" },
    bottom: { style: "thin" },
    right: { style: "thin" },
  };

  // Style the cells
  worksheet.eachRow((row, rowNumber) => {
    row.eachCell((cell) => {
      cell.font = {
        name: "Times New Roman",
        family: 4,
        size: 12,
        bold: true,
      };
      cell.alignment = { vertical: "middle", horizontal: "center" };
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFFFFFFF" },
      };
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
    });
  });

  // Set row height
  worksheet.eachRow((row) => {
    row.height = 30;
  });

  // Write the Excel workbook to a buffer and create a downloadable link
  workbook.xlsx.writeBuffer().then((buffer) => {
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${title}.xlsx`;
    link.click();
  });
};
