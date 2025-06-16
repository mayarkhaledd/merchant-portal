import { ContextMenu, Label, TTableColumnsDef } from "eds-react";
import {} from "eds-react";
import { useTranslation } from "react-i18next";
import {
  SystemOnboardingContext,
  Tsystemstate,
} from "@ejada/screens/SystemOnboarding";
import { Context, useContext } from "react";
import { SystemOnboardingInitialValues } from "..";
import { getStatusColor } from "@ejada/screens";
export const useSystemOnBoardingColumns = (): TTableColumnsDef[] => {
  const { t } = useTranslation();
  const {
    setIsEditDrawer,
    setSelectedSystem,
    setSystemId,
    setIsDeletePopUpOpen,
  } = useContext<Tsystemstate>(
    SystemOnboardingContext as Context<Tsystemstate>,
  );
  return [
    {
      header: () => {
        return (
          <td className=" w-[30%] ml-4">
            <div
              className={
                "cursor-pointer select-none flex items-center justify-start w-full font-readexProRegular text-secondary-dark"
              }
            >
              <div className="flex items-center">
                <div className="font-readexProSemiBold600 text-sm">
                  {t("system-onboarding.source_system_id")}
                </div>
              </div>
            </div>
          </td>
        );
      },
      accessorKey: "sourceSystemId",
      cell: (row) => {
        return (
          <td
            className={
              "py-3.5  font-readexProRegular  leading-4 text-sm justify-start whitespace-nowrap overflow-hidden text-overflow-ellipsis   w-[30%] text-black  flex ml-4"
            }
          >
            {row.cell.getValue() as string}
          </td>
        );
      },
    },

    {
      header: () => {
        return (
          <td className=" w-[30%] px-2 ">
            <div
              className={
                "cursor-pointer select-none flex items-center justify-start w-full font-readexProRegular text-secondary-dark"
              }
            >
              <div className="flex items-center">
                <div className="font-readexProSemiBold600 text-sm">
                  {t("system-onboarding.source_system_name")}
                </div>
              </div>
            </div>
          </td>
        );
      },
      accessorKey: "sourceSystemName",
      cell: (row) => {
        return (
          <td
            className={
              "py-3.5  font-readexProRegular  leading-4 text-sm justify-start !whitespace-normal break-all overflow-[auto] text-overflow-ellipsis   w-[30%] text-black px-2 flex "
            }
          >
            {row.cell.getValue() as string}
          </td>
        );
      },
    },
    {
      header: () => {
        return (
          <td className=" w-[30%] px-2">
            <div
              className={
                "cursor-pointer select-none flex items-center justify-start w-full font-readexProRegular text-secondary-dark"
              }
            >
              <div className="flex items-center">
                <div className="font-readexProSemiBold600 text-sm">
                  {t("system-onboarding.status")}
                </div>
              </div>
            </div>
          </td>
        );
      },
      accessorKey: "status",
      cell: (row) => {
        const styles = getStatusColor(row.cell.getValue() as string);

        return (
          <td
            className={
              "py-3.5   font-readexProRegular  leading-4 text-sm justify-start whitespace-nowrap overflow-hidden text-overflow-ellipsis   w-[30%] text-black px-2 flex "
            }
          >
            {row.cell.getValue() && row.cell.getValue() !== "" && (
              <Label
                label={row.cell.getValue() as string}
                text={t(`users.${row.cell.getValue()}`) as string}
                variant={styles}
              />
            )}
          </td>
        );
      },
    },
    {
      header: () => {
        return (
          <td className=" w-[3%] ">
            <div
              className={
                "cursor-pointer select-none flex items-center justify-center w-full"
              }
            >
              <div className="flex items-center">
                <div className="font-readexProSemiBold600 text-sm me-4">
                  {t("system-onboarding.manage")}
                </div>
              </div>
            </div>
          </td>
        );
      },

      accessorKey: "manage",
      cell: (row) => {
        return (
          <td className="hover:cursor-pointer relative text-center w-[3%] text-black me-4">
            <ContextMenu
              menuItems={{
                delete: {
                  title: t("system-onboarding.delete_source_system"),
                  onClick: () => {
                    setSystemId(Number(row.row.original.sourceSystemId));
                    setIsDeletePopUpOpen(true);
                  },
                },
                edit: {
                  title: t("system-onboarding.edit_source_system"),
                  onClick: () => {
                    setSelectedSystem(
                      row.row
                        .original as unknown as SystemOnboardingInitialValues,
                    );
                    setIsEditDrawer(true);
                  },
                },
              }}
            />
          </td>
        );
      },
    },
  ];
};
