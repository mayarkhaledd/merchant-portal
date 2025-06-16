import { Onboarding } from "@ejada/screens/shared";
import { Table } from "eds-react";
import { useTranslation } from "react-i18next";
import { useSystemOnBoardingColumns } from "./useSystemOnBoardingTableColumns";
import { PlusIcon } from "lucide-react";
import { Context, useContext } from "react";
import {
  SystemOnboardingContext,
  Tsystemstate,
} from "@ejada/screens/SystemOnboarding";

export const SystemOnboardingTable = () => {
  const { t } = useTranslation();
  const SystemOnBoardingColumns = useSystemOnBoardingColumns();
  const { setIsDrawerOpen, systemOnboardingTableData } =
    useContext<Tsystemstate>(SystemOnboardingContext as Context<Tsystemstate>);

  return systemOnboardingTableData && systemOnboardingTableData.length ? (
    <>
      <div className="mt-[-2.25rem] w-full">
        <div className="-mx-4">
          {systemOnboardingTableData && (
            <Table
              data={systemOnboardingTableData}
              columns={SystemOnBoardingColumns}
              isColumnSelectorEnabled={false}
              variants="zebraStripe"
              backgroundColor="bg-transparent"
              enableSettingsColCustomization
              confirmLabel={t("system-onboarding.save") as string}
              popoverHeader={t("system-onboarding.customize_table") as string}
              infoText={t("system-onboarding.setting_title") as string}
              showHideTitle={t("system-onboarding.show_hide_col") as string}
              columnNameTitle={t("system-onboarding.col_name") as string}
              sortTitle={t("system-onboarding.sort") as string}
              disablePagination
            />
          )}
        </div>
      </div>
    </>
  ) : (
    <Onboarding
      message={t("system-onboarding.welcome-message") as string}
      title={t("system-onboarding.title-message") as string}
      onClick={() => setIsDrawerOpen(true)}
      buttonLabel={t("system-onboarding.button-message") as string}
      buttonIcon={<PlusIcon />}
    />
  );
};
