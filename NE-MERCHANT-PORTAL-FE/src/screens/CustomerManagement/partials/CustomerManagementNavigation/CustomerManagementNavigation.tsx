import { NavigationBreadcrumb } from "@ejada/screens/shared";
import { Button, NavigationTitle } from "eds-react";
import { useTranslation } from "react-i18next";
import { useCustomerManagement } from "../../useCustomerManagement";
import { FaPlus } from "react-icons/fa";
import { TCustomerManagementState } from "../../CustomerManagement.types";
import { Context, useContext } from "react";
import { CustomerManagementContext } from "../../CustomerManagementProvider";

export function CustomerManagementNavigation() {
  const { setIsCreateCustomerOpen } = useContext<TCustomerManagementState>(
    CustomerManagementContext as Context<TCustomerManagementState>,
  );
  const { t } = useTranslation();
  const { CustomerManagementData } = useCustomerManagement();
  return (
    <div>
      <NavigationBreadcrumb />
      <div className="flex justify-between items-center mb-[32px] mt-7">
        <NavigationTitle title={`${t("customer.customer_management")}`} />
        {CustomerManagementData && CustomerManagementData.length > 0 && (
          <div className="flex items-center justify-center">
            <Button
              size="large"
              label={t("customer.new_customer")}
              onClick={() => {
                setIsCreateCustomerOpen(true);
              }}
              type="withIcon"
              icon={<FaPlus />}
              state="default"
            />
          </div>
        )}
      </div>
    </div>
  );
}
