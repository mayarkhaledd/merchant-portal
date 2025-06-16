import { ContextMenu, TTableColumnsDef, Label, TTableColumns } from "eds-react";
import SortingIcon from "@ejada/common/assets/SecondaryDarkSortingIcon.svg";
import { useTranslation } from "react-i18next";
import {
  EventsManagementContext,
  getStatusColor,
  TEventsManagementState,
  useEventsManagement,
} from "@ejada/screens";
import { Context, useContext } from "react";
import { HeaderContext } from "@tanstack/react-table";

export const useEventsManagementTableColumns = (): TTableColumnsDef[] => {
  const { t } = useTranslation();
  const {
    setEditEventDrawer,
    setViewEventDrawer,
    setViewEventId,
    setSelectedEvent,
    setIsPopupOpen,
    setPopupType,
  } = useContext<TEventsManagementState>(
    EventsManagementContext as Context<TEventsManagementState>,
  );

  const { EventsManagementData } = useEventsManagement();

  if (!EventsManagementData || EventsManagementData.length === 0) {
    return [];
  }

  const columns = Object.keys(EventsManagementData[0]).flatMap((key) => {
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
                {t(`eventsManagement.${key}`)}
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
          row: { original: TTableColumns };
          cell: { getValue: () => string | { date?: string; time?: string } };
        }) => {
          const value = row.cell.getValue();
          const displayValue =
            typeof value === "string" ? value : value?.toString() || "";
          const className =
            "py-3.5 font-readexProRegular leading-4 text-sm justify-start whitespace-nowrap overflow-hidden text-overflow-ellipsis w-[23.7%] text-black px-2 flex";

          if (key === "status") {
            const styles = getStatusColor(row.cell.getValue() as string);
            return (
              <td className={className}>
                <Label
                  label={row.cell.getValue() as string}
                  text={t(`users.${row.cell.getValue()}`) as string}
                  variant={styles}
                />
              </td>
            );
          }

          return <td className={className}>{displayValue}</td>;
        },
      },
    ];
  });

  columns.push({
    header: () => (
      <td className="w-[3%]">
        <div
          className={
            "cursor-pointer select-none flex items-center justify-center w-full"
          }
        >
          <div className="flex items-center">
            <div className="text-sm me-4 text-secondary-dark">
              {t("eventsManagement.manage")}
            </div>
          </div>
        </div>
      </td>
    ),
    accessorKey: "contextMenu",
    cell: (row) => (
      <td className="hover:cursor-pointer relative text-center w-[3%] text-black me-4">
        <ContextMenu
          menuItems={{
            edit: {
              title: t("eventsManagement.edit") as string,
              onClick: () => {
                setEditEventDrawer(true);
                setViewEventId(String(row.row.original.eventCode));
              },
            },
            view: {
              title: t("eventsManagement.view") as string,
              onClick: () => {
                setViewEventDrawer(true);
                setViewEventId(String(row.row.original.eventCode));
              },
            },
            delete: {
              title: t("eventsManagement.delete") as string,
              onClick: () => {
                setIsPopupOpen && setIsPopupOpen(true);
                setSelectedEvent(row.row.original);
                setPopupType("delete");
              },
            },
          }}
        />
      </td>
    ),
  });

  return columns;
};
