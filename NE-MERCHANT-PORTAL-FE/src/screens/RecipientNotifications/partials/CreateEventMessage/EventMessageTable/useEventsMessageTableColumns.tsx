import { TTableColumnsDef, Label, Button, TTableColumns } from "eds-react";
import SortingIcon from "@ejada/common/assets/SecondaryDarkSortingIcon.svg";
import { formatHeader, getStatusColor } from "@ejada/screens";
import { Context, useContext } from "react";
import { IconSend } from "@tabler/icons-react";

import i18n from "@ejada/common/locals/i18n";
import { TRecipientNotificationsState } from "@ejada/screens/RecipientNotifications/RecipientNotifications.types";
import { RecipientNotificationsContext } from "@ejada/screens/RecipientNotifications/RecipientNotificationsProvider";
import { HeaderContext } from "@tanstack/react-table";
import { useRecipientNotifications } from "@ejada/screens/RecipientNotifications/useRecipientNotifications";
import { t } from "i18next";

export const useEventsMessageTableColumns = (): TTableColumnsDef[] => {
  const isRtl = i18n.language === "ar";
  const { setIsSendEventMessageOpen, setEventId, isEnglish } =
    useContext<TRecipientNotificationsState>(
      RecipientNotificationsContext as Context<TRecipientNotificationsState>,
    );
  const { EventsManagementData } = useRecipientNotifications();
  if (
    !EventsManagementData ||
    !Array.isArray(EventsManagementData) ||
    EventsManagementData.length === 0
  ) {
    return [];
  }
  let eventStatus = "";
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
                {t(formatHeader(key, isEnglish, "eventsManagement"))}
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
          const className = `py-3.5 font-readexProRegular leading-4 text-sm justify-start whitespace-nowrap break-all overflow-hidden text-overflow-ellipsis w-[23%] text-black flex text-wrap ${key === "eventCode" && !isRtl ? "ml-4" : "px-2"}`;

          if (key === "status") {
            const styles = getStatusColor(row.cell.getValue() as string);
            eventStatus = row.cell.getValue().toString();
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
              {i18n.t("recipient_notifications.send")}
            </div>
          </div>
        </div>
      </td>
    ),
    accessorKey: "send",
    cell: (row) => (
      <td className="hover:cursor-pointer relative text-center w-[3%] me-4">
        {eventStatus === "Enabled" ? (
          <Button
            type="withIcon"
            label=""
            onClick={() => {
              setEventId(row.row.original.eventCode as string);
              setIsSendEventMessageOpen(true);
            }}
            size="medium"
            state="default"
            buttonVariant="link"
            icon={<IconSend />}
          />
        ) : (
          <></>
        )}
      </td>
    ),
  });

  return columns;
};
