import { ContextMenu, TTableColumnsDef, TTableColumns } from "eds-react";
import SortingIcon from "@ejada/common/assets/SecondaryDarkSortingIcon.svg";
import { useTranslation } from "react-i18next";
import {
  EventGroupManagementContext,
  TEventGroupManagementState,
  useEventGroupManagement,
} from "@ejada/screens/EventGroupManagement";
import { HeaderContext } from "@tanstack/react-table";

import { Context, useContext } from "react";
import { formatHeader } from "@ejada/screens/shared";

export const useEventGroupManagementTableColumns = (): TTableColumnsDef[] => {
  const { t } = useTranslation();
  const { EventGroupManagementData } = useEventGroupManagement();
  const {
    setEditEventGroupDrawer,
    setIsViewEventGroupDrawer,
    setEventGroupId,
    setIsDeletePopUpOpen,
    isEnglish,
  } = useContext<TEventGroupManagementState>(
    EventGroupManagementContext as Context<TEventGroupManagementState>,
  );
  if (
    !EventGroupManagementData ||
    !Array.isArray(EventGroupManagementData) ||
    EventGroupManagementData.length === 0
  ) {
    return [];
  }

  const columns = Object.keys(EventGroupManagementData[0]).flatMap((key) => {
    return [
      {
        header: (head: HeaderContext<TTableColumns, TTableColumns>) => (
          <td className={`w-[23%] ${key === "eventCode" ? "ml-4" : "px-2"} `}>
            <div
              className={
                "cursor-pointer select-none flex items-center justify-start w-full font-readexProRegular text-secondary-dark"
              }
              onClick={head.column.getToggleSortingHandler()}
            >
              <div className="text-sm flex items-center">
                {t(formatHeader(key, isEnglish, "eventGroupManagement"))}
                <div>
                  <div
                    className={`ml-1.5 ${
                      head.column.getIsSorted() === "desc" ? "scale-y-[-1]" : ""
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
          const className = `py-3.5  font-readexProRegular  leading-4 text-sm justify-start whitespace-nowrap break-all overflow-hidden text-overflow-ellipsis  w-[23%] text-black  flex text 	text-wrap	 ${key == "eventCode" ? "ml-4" : "px-2"}`;

          return <td className={className}>{displayValue}</td>;
        },
      },
    ];
  });

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
              {t("eventGroupManagement.manage")}
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
              title: t("eventGroupManagement.view_event"),
              onClick: () => {
                setEventGroupId(String(row.row.original.eventGroupId));
                setIsViewEventGroupDrawer(true);
              },
            },
            update: {
              title: t("eventGroupManagement.edit_event"),
              onClick: () => {
                setEditEventGroupDrawer(true);
                setEventGroupId(String(row.row.original.eventGroupId));
              },
            },
            delete: {
              title: t("eventGroupManagement.delete"),
              onClick: () => {
                setEventGroupId(String(row.row.original.eventGroupId));
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
