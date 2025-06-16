import { ContextMenu, TTableColumnsDef, TTableColumns, Label } from "eds-react";
import SortingIcon from "@ejada/common/assets/SecondaryDarkSortingIcon.svg";
import { useTranslation } from "react-i18next";
import { HeaderContext } from "@tanstack/react-table";

import { Context, useContext } from "react";
import { formatHeader, getStatusColor } from "@ejada/screens/shared";
import { useWhatsapp } from "../../useWhatsapp";
import { WhatsappContext } from "../../WhatsappProvider";
import { TWhatsappState } from "../../Whatsapp.types";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "@ejada/navigation";

export const useWhatsappManagementTableColumns = (): TTableColumnsDef[] => {
  const { t } = useTranslation();
  const { whatsappTemplatesManegementData } = useWhatsapp();
  const navigate = useNavigate();
  const { setIsDeletePopUpOpen, isEnglish, setWhatsappTemplateId } =
    useContext<TWhatsappState>(WhatsappContext as Context<TWhatsappState>);
  if (
    !whatsappTemplatesManegementData ||
    !Array.isArray(whatsappTemplatesManegementData) ||
    whatsappTemplatesManegementData.length === 0
  ) {
    return [];
  }

  const columns = Object.keys(whatsappTemplatesManegementData[0]).flatMap(
    (key) => {
      if (key === "templateId") return [];
      return [
        {
          header: (head: HeaderContext<TTableColumns, TTableColumns>) => (
            <td
              className={`w-[23%] ${key === "templateId" ? "ml-4" : "px-2"} `}
            >
              <div
                className={
                  "cursor-pointer select-none flex items-center justify-start w-full font-readexProRegular text-secondary-dark"
                }
                onClick={head.column.getToggleSortingHandler()}
              >
                <div className="text-sm flex items-center">
                  {t(formatHeader(key, isEnglish, "whatsapp"))}
                  <div>
                    <div
                      className={`ml-1.5 ${
                        head.column.getIsSorted() === "desc"
                          ? "scale-y-[-1]"
                          : ""
                      }`}
                    >
                      <img src={SortingIcon} alt="Sorting Icon" />
                    </div>
                  </div>
                </div>
              </div>
            </td>
          ),
          accessorKey: key,
          cell: (row: {
            cell: { getValue: () => string | { date?: string; time?: string } };
            row: { original: TTableColumns };
          }) => {
            const value = row.cell.getValue();
            const displayValue =
              typeof value === "string" ? value : value?.toString() || "";
            const className = `py-3.5  font-readexProRegular  leading-4 text-sm justify-start whitespace-nowrap break-all overflow-hidden text-overflow-ellipsis  w-[23%] text-black  flex text 	text-wrap	 ${key == "templateId" ? "ml-4" : "px-2"}`;
            if (key === "status") {
              const styles = getStatusColor(row.cell.getValue() as string);
              return (
                <td className={className}>
                  <Label
                    text={t(`users.${row.cell.getValue()}`) as string}
                    label={row.cell.getValue() as string}
                    variant={styles}
                  />
                </td>
              );
            }
            return <td className={className}>{displayValue}</td>;
          },
        },
      ];
    },
  );

  columns.push({
    header: () => (
      <td className=" w-[3%] ">
        <div
          className={
            "cursor-pointer select-none flex items-center justify-center w-full "
          }
        >
          <div className="flex items-center">
            <div className=" text-sm me-4 text-secondary-dark">
              {t("whatsapp.manage")}
            </div>
          </div>
        </div>
      </td>
    ),
    accessorKey: "contextMenu",
    cell: (row) => (
      <td className="hover:cursor-pointer relative text-center w-[3%] me-4 ">
        <ContextMenu
          menuItems={{
            view: {
              title: t("whatsapp.view_template"),
              onClick: () => {
                setWhatsappTemplateId(row.row.original.templateId as string);
                setTimeout(() => {
                  navigate(
                    `${AppRoutes.viewWhatsappTemplate}/${row.row.original.templateId as string}`,
                  );
                }, 0);
              },
            },
            update: {
              title: t("whatsapp.edit_template"),
              onClick: () => {
                setWhatsappTemplateId(row.row.original.templateId as string);
                setTimeout(() => {
                  navigate(
                    `${AppRoutes.editWhatsappTemplate}/${row.row.original.templateId as string}`,
                  );
                }, 0);
              },
            },
            delete: {
              title: t("whatsapp.delete"),
              onClick: () => {
                setWhatsappTemplateId(row.row.original.templateId as string);
                setIsDeletePopUpOpen(true);
              },
            },
          }}
        />
      </td>
    ),
  });

  return columns;
};
