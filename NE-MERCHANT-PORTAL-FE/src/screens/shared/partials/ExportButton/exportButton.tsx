import React from "react";
import { Button } from "eds-react";
import { t } from "i18next";
import { useExportButton } from "./useExportButton";
import { ExportButtonProps } from "./exportButton.types";

export const ExportButton: React.FC<ExportButtonProps> = ({
  data,
  fileName,
  refetchData,
  isRefetchedDataError,
  isRefetchDataSuccess,
  errorMessage,
  exportSearchQuery,
  isEnglish,
  prefix,
}) => {
  const { exportingExcel, exportingPdf, getDropdownItems } = useExportButton({
    data,
    fileName,
    refetchData,
    isRefetchedDataError,
    isRefetchDataSuccess,
    errorMessage,
    exportSearchQuery,
    isEnglish,
    prefix,
  });

  return (
    <div
      className="flex items-center justify-end gap-2"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <Button
        onClick={() => {}}
        size="small"
        label={
          exportingExcel
            ? t("SearchCriteria.exporting")
            : t("SearchCriteria.export_excel")
        }
        items={getDropdownItems("excel")}
        buttonVariant="dropdown"
        type="default"
        state={exportingExcel ? "disabled" : "default"}
      />
      <Button
        onClick={() => {}}
        size="small"
        label={
          exportingPdf
            ? t("SearchCriteria.exporting")
            : t("SearchCriteria.export_pdf")
        }
        items={getDropdownItems("pdf")}
        buttonVariant="dropdown"
        type="default"
        state={exportingPdf ? "disabled" : "default"}
      />
    </div>
  );
};
