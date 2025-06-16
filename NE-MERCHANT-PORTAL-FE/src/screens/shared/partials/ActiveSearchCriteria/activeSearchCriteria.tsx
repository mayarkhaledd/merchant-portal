import { Label, TTableColumns } from "eds-react"; // Import Tag from your UI library
import { formatHeader } from "@ejada/screens/shared";
import { t } from "i18next";
import { SelectSearchList } from "@ejada/screens";

interface IActiveSearchCriteria {
  refetch?: (() => void) | undefined;
  setSearchQuery: (state: {
    [key: string]: string | string[] | number | number[] | Date;
  }) => void;
  activeSearchCriteria: Partial<TTableColumns>;
  setActiveSearchCriteria: (state: Partial<TTableColumns>) => void;
  sourceSystemsMenu?: SelectSearchList[] | undefined;
  isEnglish: boolean;
  currentPage: string;
  isButtonText?: boolean;
}

export const ActiveSearchCriteria = ({
  setSearchQuery,
  activeSearchCriteria,
  setActiveSearchCriteria,
  sourceSystemsMenu,
  isEnglish,
  currentPage,
  isButtonText,
}: IActiveSearchCriteria) => {
  // Only render if we have criteria
  if (Object.keys(activeSearchCriteria).length === 0) {
    return null;
  }
  return (
    <div className="flex flex-wrap items-center gap-2 py-3 px-4 bg-gray-50 rounded-md mb-4">
      <span className="text-gray-600 font-medium mr-2">
        {t("SearchCriteria.filtered_by")}
      </span>

      {Object.entries(activeSearchCriteria)
        .slice(0, 1)
        .map(([key, value]) => {
          let displayValue = value;
          if (key === "limit" || key === "offset" || key === "tenantId") {
            return null;
          }

          if (key === "eventGroupPushFlag") {
            key = "eventGroupType";
            displayValue = t(`users.${String(displayValue)}`);
          }
          if (key === "languageCode") {
            key = "language";
          }
          if (key === "enabledFlag") {
            key = "status";
            displayValue = value ? "Enabled" : "Disabled";
          }

          if (key === "activeFlag") {
            key = "status";
            displayValue = value ? "Active" : "Inactive";
            displayValue = t(`users.${String(displayValue)}`);
          }

          if (
            (key === "appType" || key === "appTypeId") &&
            sourceSystemsMenu &&
            sourceSystemsMenu.length > 0
          ) {
            const matchedSystem = sourceSystemsMenu.find(
              (system) => system.id === value?.toString(),
            );
            displayValue = matchedSystem ? matchedSystem.label : value;
          }
          if (key === "messageStatus") {
            displayValue =
              value === "S" ? "Sent" : value === "F" ? "Failed" : value;
          }
          return (
            <Label
              key={key}
              text={`${formatHeader(key, isEnglish, currentPage)}: ${isButtonText ? t(`users.${String(displayValue)}`) : t(String(displayValue))}`}
              label={key}
              className="bg-blue-50 text-blue-700 border border-blue-200"
            />
          );
        })}

      {Object.keys(activeSearchCriteria).length > 1 && (
        <span className="text-gray-600 font-medium ml-2">
          + {Object.keys(activeSearchCriteria).length - 1}{" "}
          {t("whatsapp.filter_menu.more")}
        </span>
      )}

      {Object.keys(activeSearchCriteria).length > 0 && (
        <button
          className="text-sm text-blue-600 hover:text-blue-800 font-medium ml-auto"
          onClick={() => {
            setSearchQuery({});
            setActiveSearchCriteria({});
          }}
        >
          {t("whatsapp.filter_menu.clear_all")}
        </button>
      )}
    </div>
  );
};
