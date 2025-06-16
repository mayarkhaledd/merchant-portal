import { HTTPCookies } from "@ejada/common";
import Cookies from "js-cookie";
import { CustomerInitialValues } from "./CustomerForm";
import {
  CreateCustomerPayload,
  CustomerInterface,
} from "@ejada/types/api/customerManagementInterface";

export const booleanToActiveFlag = (value: boolean) => {
  return value === true ? "A" : "I";
};

export const activeFlagToBoolean = (value: string) => {
  return value === "A"; // Convert "A" to true and "I" to false
};

export function mapToPayload(
  data: CustomerInitialValues,
): CreateCustomerPayload {
  const payload = {
    relationTypeCode: data.relationTypeCode,
    relationValue: data.relationValue,
    preferredLanguage: data.preferredLanguage,
    title: data.title,
    customerNameAr: data.customerNameAr,
    customerNameEn: data.customerNameEn,
    activeFlag:
      data.activeFlag === "true" ||
      data.activeFlag === "A" ||
      data.activeFlag === true,
    customerEmailDetails: data.customerEmailDetails
      .filter((email) => email.email && email.email.trim())
      .map((email, index) => ({
        ...email,
        contactType: index === 0 ? "P" : "S",
        activeFlag: true,
        confirmedFlag: true,
      })),
    customerMobileDetails: data.customerMobileDetails
      .filter((mobile) => mobile.mobileNumber && mobile.mobileNumber.trim())
      .map((mobile, index) => ({
        ...mobile,
        contactType: index === 0 ? "P" : "S",
        activeFlag: true,
        confirmedFlag: true,
      })),
    customerId: data.customerId,
    tenantId: Cookies.get(HTTPCookies.tenantId) || "",
  };
  return payload;
}

export const mapCustomerInterfaceToInitialValues = (
  customer: CustomerInterface,
): CustomerInitialValues => {
  return {
    relationTypeCode: customer.relationTypeCode,
    relationValue: customer.relationValue,
    customerNameAr: customer.customerNameAr,
    customerNameEn: customer.customerNameEn,
    preferredLanguage: customer.preferredLanguage,
    activeFlag: customer.activeFlag,
    title: customer.title,
    customerEmailDetails: customer.customerEmailDetails.map((email) => ({
      email: email.email,
      activeFlag: email.activeFlag,
      contactType: email.confirmedFlag, // Assuming contactType is equivalent to confirmedFlag
      preferredLanguage: email.preferredLanguage,
    })),
    customerMobileDetails: customer.customerMobileDetails.map((mobile) => ({
      mobileNumber: mobile.mobileNumber,
      activeFlag: mobile.activeFlag,
      contactType: "mobile", // Assuming a default contactType for mobile
      preferredLanguage: mobile.preferredLanguage,
    })),
    customerId: customer.customerId,
  };
};
