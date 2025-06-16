import { TTableColumnsDef, TTableColumns, Label } from "eds-react";
import SortingIcon from "@ejada/common/assets/SecondaryDarkSortingIcon.svg";
import { useTranslation } from "react-i18next";
import {
  formatHeader,
  getStatusColor,
  NotificationHistoryContext,
} from "@ejada/screens";
import { NotificationHistoryState } from "@ejada/screens/NotificationHistory";
import { Context, useContext, useEffect } from "react";
import { NotificationMessageByIdInterface } from "@ejada/types";
import { HeaderContext } from "@tanstack/react-table";
import { useQueryClient } from "@tanstack/react-query";
import { QueryCosntant } from "@ejada/common";

export const useNotificationHistoryColumns = (): TTableColumnsDef[] => {
  const { t } = useTranslation();

  const {
    setIsDetailsFormOpen,
    detailsIcon,
    setNotificationHistoryId,
    setChannelType,
    setReferenceId,
    setNotificationHistoryDetails,
    itemsPerPage,
    currentPage,
    notificationHistoryData,
    isEnglish,
  } = useContext<NotificationHistoryState>(
    NotificationHistoryContext as Context<NotificationHistoryState>,
  );

  const queryClient = useQueryClient();

  useEffect(() => {
    if (itemsPerPage || currentPage) {
      queryClient.invalidateQueries({
        queryKey: [QueryCosntant.MESSAGES, itemsPerPage, currentPage],
      });
    }
  }, [itemsPerPage, currentPage]);

  if (
    !notificationHistoryData ||
    !Array.isArray(notificationHistoryData) ||
    notificationHistoryData.length === 0
  ) {
    return [];
  }

  const columns = Object.keys(notificationHistoryData[0]).flatMap((key) => {
    if (key === "referenceId" || key === "channelType") {
      return [];
    }
    return [
      {
        header: (head: HeaderContext<TTableColumns, TTableColumns>) => (
          <td className={`w-[17%] px-2`}>
            <div
              className={
                "cursor-pointer select-none flex items-center justify-center w-full font-readexProRegular text-secondary-dark"
              }
              onClick={head.column.getToggleSortingHandler()}
            >
              <div className="text-sm flex items-center">
                {t(formatHeader(key, isEnglish, "notificationHistory"))}
                <div>
                  <div
                    className={`w-[3vw] px-2 ${
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
          const className =
            "p-4 font-readexProRegular leading-4 text-sm pl-12 whitespace-nowrap overflow-hidden text-overflow-ellipsis  w-[25%] flex";
          if (key === "contact") {
            const emailclassName =
              "p-4 font-readexProRegular leading-4 text-sm  whitespace-nowrap overflow-hidden text-overflow-ellipsis  w-[25%] flex";
            return <td className={emailclassName}>{displayValue}</td>;
          }
          if (key === "status") {
            const styles = getStatusColor(row.cell.getValue() as string);
            return (
              <td className={className + " !w-[15%]"}>
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
      <td className=" w-[17%] px-2">
        <div
          className={
            "cursor-pointer select-none flex items-center justify-center w-full"
          }
        >
          <div className="flex items-center">
            <div className="font-readexProSemiBold600 text-sm text-secondary-dark  ms-8">
              {t("notificationHistory.details")}
            </div>
          </div>
        </div>
      </td>
    ),
    accessorKey: "details",
    cell: (row) => (
      <td className="hover:cursor-pointer relative text-center w-[15%]   ms-8">
        <div
          onClick={() => {
            setIsDetailsFormOpen(true);
            setNotificationHistoryId(row.row.original.messageId as string);
            setChannelType(row.row.original.channelType as string);
            setReferenceId(row.row.original.referenceId as string);
            setNotificationHistoryDetails(
              row.row.original as unknown as NotificationMessageByIdInterface,
            );
          }}
        >
          <img src={detailsIcon} alt="info" />
        </div>
      </td>
    ),
  });

  return columns;
};
