import { TTableColumnsDef, TTableColumns } from "eds-react";
import SortingIcon from "@ejada/common/assets/SecondaryDarkSortingIcon.svg";
import {
  NotificatioHistoryDetailsFormProps,
  NotificationHistoryContext,
  NotificationHistoryState,
  useNotificationHistoryForm,
} from "@ejada/screens/NotificationHistory";
import { HeaderContext } from "@tanstack/react-table";
import { formatHeader } from "@ejada/screens/shared";
import { t } from "i18next";
import { Context, useContext } from "react";

export const useMessageHistoryLogTableColumns = ({
  onCancel,
  initialValues,
}: NotificatioHistoryDetailsFormProps): TTableColumnsDef[] => {
  const { statusLogHistoryData } = useNotificationHistoryForm(
    onCancel,
    initialValues,
  );
  const { isEnglish } = useContext<NotificationHistoryState>(
    NotificationHistoryContext as Context<NotificationHistoryState>,
  );
  if (
    !statusLogHistoryData ||
    !Array.isArray(statusLogHistoryData) ||
    statusLogHistoryData.length === 0
  ) {
    return [];
  }
  const columns = Object.keys(statusLogHistoryData[0]).flatMap((key) => {
    return [
      {
        header: (head: HeaderContext<TTableColumns, TTableColumns>) => (
          <td className={`w-[23%] px-2`}>
            <div
              className={
                "cursor-pointer select-none flex items-center justify-start w-full font-readexProRegular text-secondary-dark"
              }
              onClick={head.column.getToggleSortingHandler()}
            >
              <div className="text-sm flex items-center">
                {t(formatHeader(key, isEnglish, "notificationHistory"))}
                <div>
                  <div
                    className={`w-[5vw] px-2 ${
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
            "p-4 font-readexProRegular leading-4 text-sm justify-start whitespace-nowrap overflow-hidden text-overflow-ellipsis  w-[20%] flex";
          //   if (key === "Status") {
          //     const styles = getStatusColor(row.cell.getValue() as string);
          //     return (
          //       <td className={className + " !w-[15%]"}>
          //         <Label label={row.cell.getValue() as string} variant={styles} />
          //       </td>
          //     );
          //   }
          return <td className={className}>{displayValue}</td>;
        },
      },
    ];
  });
  return columns;
};
