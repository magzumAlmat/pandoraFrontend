import ExcelJS from "exceljs";
import { format } from "date-fns";

export const onExport = (data, dateRange) => {
  console.log(data);
  console.log(dateRange);
  const filteredData =
    dateRange && dateRange.from && dateRange.to
      ? data.filter((basket) => {
          const basketDate = new Date(basket.createdAt);
          return (
            basketDate >= new Date(dateRange.from) &&
            basketDate <= new Date(dateRange.to)
          );
        })
      : data;

  console.log(filteredData);

  const workbook = new ExcelJS.Workbook();

  filteredData?.forEach((basket, index) => {
    const worksheet = workbook.addWorksheet(
      `Загрузочный лист №${basket.internal_order_number} ${
        basket.kpp
      } авто ${new Date(basket.arrival_date).getFullYear()}`
    );

    worksheet.columns = [
      { header: "№", key: "index", width: 5 },
      { header: "№ заявки(КНР)", key: "proposal_number", width: 30 },
      { header: "Получатель", key: "company_name", width: 50 },
      { header: "Наименование груза", key: "cargo_name", width: 60 },
      { header: "Кол-во мест", key: "actual_quantity", width: 25 },
      { header: "Вес", key: "actual_weight", width: 25 },
      { header: "Объем", key: "actual_volume", width: 25 },
      { header: "Номер машины", key: "car_registration_number", width: 60 },
    ];

    basket.proposals.forEach((proposal, proposalIndex) => {
      worksheet.addRow({
        index: proposalIndex + 1,
        proposal_number: proposal.proposal_number,
        company_name: proposal.company.company_name,
        cargo_name: proposal.cargo_name,
        actual_quantity: proposal.actual_quantity,
        actual_weight: proposal.actual_weight,
        actual_volume: proposal.actual_volume,
        car_registration_number: proposal.car_registration_number,
      });
    });

    const title = `Pandora Logistics CRM | Самоход/Спецтехника - Корзина заявок - Загрузочный лист №${
      basket.internal_order_number
    } ${basket.kpp} авто ${new Date(basket.arrival_date).getFullYear()}`;

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
  });

  const formattedDateRange =
    dateRange && dateRange.from && dateRange.to
      ? `${format(new Date(dateRange.from), "dd.MM.yyyy")}-${format(
          new Date(dateRange.to),
          "dd.MM.yyyy"
        )}`
      : "All";

  // Write the Excel workbook to a buffer and create a downloadable link
  workbook.xlsx.writeBuffer().then((buffer) => {
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `Pandora Logistics CRM - Корзина заявок - ${formattedDateRange}.xlsx`;
    link.click();
  });
};
