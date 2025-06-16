import { EventsManagementContext } from "@ejada/screens/EventsManagement/EventsManagementProvider";
import { IconAlertTriangle, IconEdit, IconTrash } from "@tabler/icons-react";
import { Label, TTableColumnsDef } from "eds-react";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { TemplateChannelsData } from "@ejada/screens/EventsManagement/partials/EventManagementForm/types";
import {
  getLocalizedChannels,
  getLocalizedLanguages,
} from "@ejada/screens/EventsManagement/utils";

export const useChannelsColumns = (mode: string): TTableColumnsDef[] => {
  const { t } = useTranslation();
  const {
    setEditTemplateDrawer,
    setEditTemplateData,
    setChannelsTableDataEditMode,
  } = useContext(EventsManagementContext);

  const columns: TTableColumnsDef[] = [
    {
      header: () => {
        return (
          <td className=" w-[50%] px-10  ">
            <div
              className={
                "cursor-pointer select-none flex items-center justify-start w-full font-readexProRegular text-secondary-dark"
              }
            >
              <div className="flex items-center">
                <div className="font-readexProSemiBold600 text-sm">
                  {t("eventsManagement.channels")}
                </div>
              </div>
            </div>
          </td>
        );
      },
      accessorKey: "channelId",
      cell: (row) => {
        return (
          <td
            className={
              " px-10 py-3.5  font-readexProRegular items-center gap-[10px]  leading-4 text-sm justify-start whitespace-nowrap overflow-hidden text-overflow-ellipsis   w-[50%] text-black  flex "
            }
          >
            <IconAlertTriangle size={24} color="#ED696A" />
            {getLocalizedChannels(row.cell.getValue() as string)}
          </td>
        );
      },
    },
    {
      header: () => {
        return (
          <td className=" w-[50%]  px-10">
            <div
              className={
                "cursor-pointer select-none flex items-center justify-center w-full font-readexProRegular text-secondary-dark"
              }
            >
              <div className="flex items-center">
                <div className="font-readexProSemiBold600 text-sm">
                  {t("eventsManagement.languages")}
                </div>
              </div>
            </div>
          </td>
        );
      },
      accessorKey: "languageCode",
      cell: (row) => {
        return (
          <td
            className={
              "py-3.5 px-10 font-readexProRegular  leading-4 text-sm justify-center !whitespace-normal break-all overflow-[auto] text-overflow-ellipsis   w-[50%] text-black  flex "
            }
          >
            <Label
              text={getLocalizedLanguages(row.cell.getValue() as string)}
              label={getLocalizedLanguages(row.cell.getValue() as string)}
              variant="blue"
              noCircle
              className="!px-3 !py-2 rounded-[32px] !text-primary-dark !font-readexProRegular"
            />
          </td>
        );
      },
    },
  ];

  if (mode === "edit") {
    columns.push({
      header: () => {
        return (
          <td className=" w-[15%] ">
            <div
              className={
                "cursor-pointer select-none flex items-center justify-center w-full  font-readexProRegular text-secondary-dark"
              }
            >
              <div className="flex items-center">
                <div className="font-readexProSemiBold600 text-sm">
                  {t("eventsManagement.manage")}
                </div>
              </div>
            </div>
          </td>
        );
      },
      accessorKey: "manage",
      cell: (row) => {
        return (
          <td className="flex items-center justify-center relative text-center hover:cursor-pointer w-[15%] text-black ">
            <div className="flex items-center justify-center gap-[20px]">
              <IconEdit
                color="#001081"
                size={20}
                onClick={() => {
                  setEditTemplateDrawer(true);
                  setEditTemplateData(
                    row.row.original as unknown as TemplateChannelsData,
                  );
                }}
              />
              <IconTrash
                size={20}
                color="#ED696A"
                onClick={() => {
                  setChannelsTableDataEditMode((prev) =>
                    prev.filter((item) => {
                      const isSameLanguage =
                        ((item.languageCode === "EN" ||
                          item.languageCode === "English") &&
                          (row.row.original.languageCode === "EN" ||
                            row.row.original.languageCode === "English")) ||
                        ((item.languageCode === "AR" ||
                          item.languageCode === "Arabic") &&
                          (row.row.original.languageCode === "AR" ||
                            row.row.original.languageCode === "Arabic"));

                      return (
                        !isSameLanguage ||
                        item.channelId !== row.row.original.channelId
                      );
                    }),
                  );
                }}
              />
            </div>
          </td>
        );
      },
    });
  }

  return columns;
};
