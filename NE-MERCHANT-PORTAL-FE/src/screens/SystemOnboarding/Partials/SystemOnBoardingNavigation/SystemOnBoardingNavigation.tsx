import { useTranslation } from "react-i18next";
import { NavigationBreadcrumb } from "@ejada/screens/shared";
import { ScreenTitle } from "@ejada/screens/SystemOnboarding";
import { Button } from "eds-react";
import { FaPlus } from "react-icons/fa";
import { Context, useContext } from "react";
import {
  SystemOnboardingContext,
  Tsystemstate,
} from "@ejada/screens/SystemOnboarding";

export function SystemOnBoardingNavigation() {
  const { t } = useTranslation();
  const { setIsDrawerOpen } = useContext<Tsystemstate>(
    SystemOnboardingContext as Context<Tsystemstate>,
  );
  return (
    <>
      <div>
        <NavigationBreadcrumb
          queryLabel={t("navigation.system-onboarding") as string}
        />
        <div className="flex justify-between items-center mb-[32px] mt-7">
          <ScreenTitle
            title={t("system-onboarding.system-onboarding") as string}
          />
          <div className="flex items-center justify-center">
            <Button
              size="large"
              label={t("system-onboarding.add_new_source_system")}
              onClick={() => {
                setIsDrawerOpen(true);
              }}
              type="withIcon"
              icon={<FaPlus />}
              state="default"
            />
          </div>
        </div>
      </div>
    </>
  );
}
