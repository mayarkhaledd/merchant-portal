import { ContextMenu, Label, TTableColumns, TTableColumnsDef } from "eds-react";
import { Context, useContext } from "react";
import { CustomerManagementContext } from "../../CustomerManagementProvider";
import { formatHeader, getStatusColor } from "@ejada/screens/shared/utils";
import { t } from "i18next";
import SortingIcon from "@ejada/common/assets/SecondaryDarkSortingIcon.svg";
import { useCustomerManagement } from "../../useCustomerManagement";
import { TCustomerManagementState } from "../../CustomerManagement.types";
import i18n from "@ejada/common/locals/i18n";
import { ColumnDef, HeaderContext, Row } from "@tanstack/react-table";

const numericSort = (
  rowA: Row<TTableColumns>,
  rowB: Row<TTableColumns>,
  columnId: string,
): number => {
  const a = Number(rowA.getValue(columnId));
  const b = Number(rowB.getValue(columnId));
  return a - b;
};

export function useCustomerManagementColumns(): TTableColumnsDef[] {
  const {
    setCustomerId,
    setIsPopUpOpen,
    setUserDetails,
    setPopupType,
    setIsUpdateCustomerOpen,
    setIsViewDetailsOpen,
    isEnglish,
  } = useContext<TCustomerManagementState>(
    CustomerManagementContext as Context<TCustomerManagementState>,
  );
  const { CustomerManagementData } = useCustomerManagement();

  if (!CustomerManagementData || CustomerManagementData.length === 0) {
    return [];
  }
  const isRtl = i18n.language === "ar";
  const columns: (
    | ColumnDef<TTableColumns, TTableColumns>
    | ColumnDef<TTableColumns, number>
  )[] = [];

  Object.keys(CustomerManagementData[0]).forEach((key) => {
    if (key === "customerId") {
      return;
    }
    // Special handling for relationValue column (numeric sorting)
    if (key === "relationValue") {
      columns.push({
        accessorKey: "relationValue",
        accessorFn: (row: TTableColumns) => Number(row.relationValue),
        header: (head: HeaderContext<TTableColumns, TTableColumns>) => (
          <th className={`w-[8vw] ${isRtl ? "first:mr-2" : "first:ml-2"}`}>
            <div
              className="cursor-pointer select-none flex items-center justify-start w-full font-readexProRegular text-secondary-dark"
              onClick={head.column.getToggleSortingHandler()}
            >
              <div className="text-sm flex items-center first:ml-6">
                {t(formatHeader("relationValue", isEnglish, "customer"))}
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
          </th>
        ),
        cell: (row: {
          row: { original: TTableColumns };
          cell: {
            getValue: () =>
              | string
              | (() => number)
              | { date?: string; time?: string };
          };
        }) => {
          const value = row.cell.getValue();
          const className = `py-4 ${isRtl ? "first:mr-2" : "first:ml-2"} font-readexProRegular leading-4 text-sm justify-start whitespace-nowrap overflow-hidden text-overflow-ellipsis w-[8vw] flex`;
          return (
            <td className={className}>
              <span className="first:ml-6">{value as number}</span>
            </td>
          );
        },
        sortingFn: numericSort,
      });
      return;
    }

    // Default column handling
    columns.push({
      accessorKey: key,
      header: (head: HeaderContext<TTableColumns, TTableColumns>) => (
        <th className={`w-[8vw] ${isRtl ? "first:mr-2" : "first:ml-2"}`}>
          <div
            className="cursor-pointer select-none flex items-center justify-start w-full font-readexProRegular text-secondary-dark"
            onClick={head.column.getToggleSortingHandler()}
          >
            <div className="text-sm flex items-center first:ml-6">
              {t(formatHeader(key, isEnglish, "customer"))}
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
        </th>
      ),
      cell: (row: {
        row: { original: TTableColumns };
        cell: {
          getValue: () => string | { date?: string; time?: string | number };
        };
      }) => {
        const value = row.cell.getValue();
        const displayValue =
          typeof value === "string" ? value : value?.toString() || "";
        let className = `py-4 ${isRtl ? "first:mr-2" : "first:ml-2"} font-readexProRegular leading-4 text-sm justify-start whitespace-nowrap overflow-hidden text-overflow-ellipsis w-[8vw] flex`;
        if (key === "Status") {
          const styles = getStatusColor(row.cell.getValue() as string);
          return (
            <td className={className}>
              <span className="first:ml-6">
                <Label
                  text={t(`users.${row.cell.getValue()}`) as string}
                  label={row.cell.getValue() as string}
                  variant={styles}
                />
              </span>
            </td>
          );
        }
        if (key === "customerEmailDetails") {
          className += " !whitespace-normal break-all overflow-[auto]";
        }
        return (
          <td className={className}>
            <span className="first:ml-6">{t(displayValue)}</span>
          </td>
        );
      },
    });
  });

  // Add the actions menu buttons
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
              {t("customer.manage")}
            </div>
          </div>
        </div>
      </td>
    ),
    accessorKey: "contextMenu",
    cell: (row) => (
      <td className="hover:cursor-pointer relative text-right">
        <>
          {row.row.original.Status === "INACTIVE" ? (
            <ContextMenu
              menuItems={{
                view: {
                  title: t("customer.view"),
                  onClick: () => {
                    setCustomerId(row.row.original.customerId as number);
                    setIsViewDetailsOpen(true);
                  },
                },
                update: {
                  title: t("customer.edit"),
                  onClick: () => {
                    setCustomerId(row.row.original.customerId as number);
                    setIsUpdateCustomerOpen(true);
                  },
                },
                deactivate: {
                  title: t("customer.reactivate"),
                  onClick: () => {
                    setIsPopUpOpen(true);
                    setUserDetails(row.row.original);
                    setPopupType("reactivateCustomer");
                  },
                },
                delete: {
                  title: t("customer.delete"),
                  onClick: () => {
                    setIsPopUpOpen(true);
                    setPopupType("deleteCustomer");
                    setUserDetails(row.row.original);
                  },
                },
              }}
            />
          ) : (
            <ContextMenu
              menuItems={{
                view: {
                  title: t("customer.view"),
                  onClick: () => {
                    setCustomerId(row.row.original.customerId as number);
                    setIsViewDetailsOpen(true);
                  },
                },
                update: {
                  title: t("customer.edit"),
                  onClick: () => {
                    setCustomerId(row.row.original.customerId as number);
                    setIsUpdateCustomerOpen(true);
                  },
                },
                deactivate: {
                  title: t("customer.deactivate"),
                  onClick: () => {
                    setIsPopUpOpen(true);
                    setUserDetails(row.row.original);
                    setPopupType("deactivateCustomer");
                  },
                },
                delete: {
                  title: t("customer.delete"),
                  onClick: () => {
                    setIsPopUpOpen(true);
                    setPopupType("deleteCustomer");
                    setUserDetails(row.row.original);
                    setCustomerId(row.row.original.customerId as number);
                  },
                },
              }}
            />
          )}
        </>
      </td>
    ),
  });

  return columns as TTableColumnsDef[];
}
