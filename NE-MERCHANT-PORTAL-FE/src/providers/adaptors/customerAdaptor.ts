import {
  CreateCustomerResponse,
  GetCustomerResponse,
  GetCustomersResponse,
  GetCustomersInterface,
  CustomerInterface,
} from "@ejada/types/api/customerManagementInterface";

export function adaptGetCustomers(
  res: GetCustomersResponse,
): GetCustomersInterface {
  return {
    customers: res.data.customers.map((customer) => ({
      relationTypeCode: customer.relationTypeCode,
      relationValue: customer.relationValue,
      customerNameAr: customer.customerNameAr,
      customerNameEn: customer.customerNameEn,
      title: customer.title,
      preferredLanguage: customer.preferredLanguage,
      customerEmailDetails: customer.customerEmailDetails,
      customerId: customer.customerId,
      customerMobileDetails: customer.customerMobileDetails,
      tenantResponse: customer.tenantResponse,
      activeFlag: customer.activeFlag,
    })),
    totalElements: res.data.totalElements,
  };
}

export function adaptGetCustomer(res: GetCustomerResponse): CustomerInterface {
  return {
    relationTypeCode: res.data.relationTypeCode,
    relationValue: res.data.relationValue,
    customerNameAr: res.data.customerNameAr,
    customerNameEn: res.data.customerNameEn,
    title: res.data.title,
    preferredLanguage: res.data.preferredLanguage,
    customerEmailDetails: res.data.customerEmailDetails,
    customerId: res.data.customerId,
    customerMobileDetails: res.data.customerMobileDetails,
    tenantResponse: res.data.tenantResponse,
    activeFlag: res.data.activeFlag,
  };
}

export function adaptCreateUpdateCustomer(res: CreateCustomerResponse) {
  return {
    relationTypeCode: res.data.relationTypeCode,
    relationValue: res.data.relationValue,
    customerNameAr: res.data.customerNameAr,
    customerNameEn: res.data.customerNameEn,
    title: res.data.title,
    preferredLanguage: res.data.preferredLanguage,
    customerEmailDetails: res.data.customerEmailDetails,
    customerId: res.data.customerId,
    customerMobileDetails: res.data.customerMobileDetails,
    tenantResponse: res.data.tenantResponse,
    activeFlag: res.data.activeFlag,
    status: res.status,
  };
}
