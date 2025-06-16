import { TTableColumns } from "eds-react";
import { GetCustomersInterface } from "@ejada/types/api/customerManagementInterface";
import { booleanToActiveFlag } from "@ejada/screens/CustomerManagement/partials/utils";

export const formateCustomersColumns = (
  data: GetCustomersInterface,
): TTableColumns[] => {
  const customerData = data?.customers;
  return customerData.map((customer) => {
    return {
      //assign table fields to the parameters of customers got from BE with the type of interface defined in the api interface file for UI
      customerId: customer?.customerId,
      relationType: customer?.relationTypeCode,
      relationValue: customer?.relationValue,
      Status:
        booleanToActiveFlag(customer?.activeFlag) === "A"
          ? "ACTIVE"
          : "INACTIVE",
      firstNameAr: customer?.customerNameAr?.firstName || "",
      secondNameAr: customer?.customerNameAr?.secondName || "",
      firstNameEn: customer?.customerNameEn?.firstName || "",
      secondNameEn: customer?.customerNameEn?.secondName || "",
      preferredLanguage: customer?.preferredLanguage,
      title: customer?.title || "Default Title",
    };
  });
};
