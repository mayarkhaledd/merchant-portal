import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable, { RowInput } from "jspdf-autotable";
import { t } from "i18next";
import {
  formatHeader,
  getLocalizedErrorMessage,
  useErrorToast,
} from "@ejada/screens";
import { ExportButtonProps } from "./exportButton.types";

export const useExportButton = ({
  data,
  fileName,
  refetchData,
  isRefetchedDataError,
  isRefetchDataSuccess,
  errorMessage,
  exportSearchQuery,
  isEnglish,
  prefix,
}: ExportButtonProps) => {
  const [exportingExcel, setExportingExcel] = useState(false);
  const [exportingPdf, setExportingPdf] = useState(false);
  const [exportType, setExportType] = useState<"excel" | "pdf" | null>(null);

  const exportToExcel = async () => {
    if (isRefetchedDataError) {
      setExportingExcel(false);
      return;
    }
    if (isRefetchDataSuccess) {
      const ws = XLSX.utils.json_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
      XLSX.writeFile(wb, `${fileName}.xlsx`);
      setExportingExcel(false);
    }
  };

  const exportToPdf = async () => {
    if (isRefetchedDataError) {
      setExportingPdf(false);
      return;
    }

    if (isRefetchDataSuccess) {
      const doc = new jsPDF({
        orientation: "landscape",
        unit: "pt",
        format: "a3",
      });

      try {
        const amiriFontRegularBase64 = await fetch(
          "/fonts/Amiri-Regular-normal.js",
        )
          .then((response) => response.text())
          .then((text) => {
            const matchResult = text.match(/base64,(.*)"/);
            if (matchResult && matchResult[1]) {
              const base64String = String(matchResult[1]);
              return base64String;
            }
          });

        const amiriFontBoldBase64 = await fetch("/fonts/Amiri-Bold-bold.js")
          .then((response) => response.text())
          .then((text) => {
            const matchResult = text.match(/base64,(.*)"/);
            if (matchResult && matchResult[1]) {
              const base64String = String(matchResult[1]);
              return base64String;
            }
          });

        doc.addFileToVFS("Amiri-Regular.ttf", amiriFontRegularBase64 as string);
        doc.addFileToVFS("Amiri-Bold.ttf", amiriFontBoldBase64 as string);
        doc.addFont("Amiri-Regular.ttf", "Amiri", "normal");
        doc.addFont("Amiri-Bold.ttf", "Amiri", "bold");
        doc.setFont("Amiri");
        doc.setFontSize(12);
      } catch (error) {
        console.error("Error loading Amiri font:", error);
      }

      // Get headers from the first data row and format them
      const headers = Object.keys(data[0]);
      const mappedHeaders = headers.map((header) =>
        formatHeader(header, isEnglish, prefix),
      );

      // Reverse columns and data for RTL languages like Arabic
      const fixedRows: RowInput[] = data.map((row: any) =>
        headers.map((key: string) => {
          const cell = row[key];

          if (
            cell &&
            typeof cell === "object" &&
            "date" in cell &&
            "time" in cell
          ) {
            return `${cell.date} ${cell.time}`;
          }

          if (Array.isArray(cell)) {
            return cell.join(", ");
          }

          if (typeof cell === "string" || typeof cell === "number") {
            return cell;
          }

          return "";
        }),
      );

      // Reverse headers and rows for Arabic (RTL)
      if (!isEnglish) {
        mappedHeaders.reverse();
        fixedRows.forEach((row) => {
          if (Array.isArray(row)) {
            row.reverse();
          }
        });
      }

      // Set alignment based on the language (right for RTL, left for LTR)
      const alignment = isEnglish ? "left" : "right";

      autoTable(doc, {
        head: [mappedHeaders],
        body: fixedRows,
        styles: {
          font: "Amiri",
          fontSize: 10,
          halign: alignment, // Horizontal alignment (left for English, right for RTL)
        },
        margin: { top: 40 },
        didDrawPage: () => {
          const title = t(fileName) as string;

          doc.setFont("Amiri", "bold");
          doc.setFontSize(16);
          const textWidth = doc.getTextWidth(title);
          const pageWidth = doc.internal.pageSize.getWidth();
          doc.text(
            isEnglish
              ? title
                  .replace(/([a-z])([A-Z])/g, "$1 $2")
                  .replace(/^./, (str) => str.toUpperCase())
              : title,
            (pageWidth - textWidth) / 2,
            30,
          );
          doc.setFont("Amiri", "normal");
        },
      });

      doc.save(`${fileName}.pdf`);
      setExportingPdf(false);
    }
  };

  useErrorToast(
    isRefetchedDataError,
    t("eventsManagement.api_failure") as string,
    getLocalizedErrorMessage(
      errorMessage,
      t("eventsManagement.Unknown_Error") as string,
    ),
  );

  useEffect(() => {
    if (isRefetchDataSuccess && data && data.length && exportType) {
      if (exportType === "excel") {
        exportToExcel();
      } else if (exportType === "pdf") {
        exportToPdf();
      }
      setExportType(null);
    } else {
      setExportingExcel(false);
      setExportingPdf(false);
    }
  }, [isRefetchDataSuccess, data, exportType]);

  const getDropdownItems = (type: "excel" | "pdf") => {
    if (exportSearchQuery && Object.keys(exportSearchQuery).length > 0) {
      return [
        {
          node: "Export Filtered",
          onClick: () => {
            type === "excel" ? setExportingExcel(true) : setExportingPdf(true);
            setExportType(type);
            refetchData?.();
          },
          value: "filtered",
        },
      ];
    } else {
      return [
        {
          node: "Export All",
          onClick: () => {
            type === "excel" ? setExportingExcel(true) : setExportingPdf(true);
            setExportType(type);
            refetchData?.();
          },
          value: "all",
        },
      ];
    }
  };

  return {
    exportingExcel,
    exportingPdf,
    getDropdownItems,
  };
};
