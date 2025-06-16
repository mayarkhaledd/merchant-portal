import { ResponseInterface } from "./responseInterface";

export interface GetCustomersPayload {
  tenantId: string; //tenant id of the merchant who logged in
  limit?: number;
  offset?: number;
  relationValue?: string;
  relationTypeCode?: string;
  preferredLanguage?: string;
  title?: string;
  firstNameEnglish?: string;
  secondNameEnglish?: string;
  firstNameArabic?: string;
  secondNameArabic?: string;
  primaryEmail?: string;
  secondaryEmail?: string;
  primaryMobile?: string;
  secondaryMobile?: string;
  activeFlag?: boolean;
}
export interface GetCustomerPayload {
  customerId: number;
}
export interface DeleteCustomerPayload {
  customerId: number;
}
export interface CreateCustomerPayload {
  relationTypeCode: string;
  relationValue: string;
  customerNameAr?: {
    firstName: string;
    secondName: string;
  };
  customerNameEn?: {
    firstName: string;
    secondName: string;
  };
  preferredLanguage: string;
  activeFlag: boolean;
  title?: string;
  customerEmailDetails?: {
    activeFlag: boolean;
    email: string;
    preferredLanguage?: string;
  }[];
  customerMobileDetails?: {
    activeFlag: boolean;
    mobileNumber: string;
    preferredLanguage?: string;
  }[];
  customerId?: number;
}
export interface UpdateCustomerPayload {
  relationTypeCode: string;
  relationValue: string;
  customerNameAr?: {
    firstName: string;
    secondName: string;
  };
  customerNameEn?: {
    firstName: string;
    secondName: string;
  };
  preferredLanguage: string;
  activeFlag: boolean;
  title?: string;
  customerEmailDetails?: {
    activeFlag: boolean;
    email: string;
    preferredLanguage?: string;
  }[];
  customerMobileDetails?: {
    activeFlag: boolean;
    mobileNumber: string;
    preferredLanguage?: string;
  }[];
  customerId?: number;
}
export interface CustomerStatusPayload {
  customerId: string;
  activeFlag: boolean;
}
export interface CustomerInterface {
  relationTypeCode: string;
  relationValue: string;
  customerNameAr: {
    firstName: string;
    secondName: string;
  };
  customerNameEn: {
    firstName: string;
    secondName: string;
  };
  title: string;
  preferredLanguage: string;
  customerEmailDetails: {
    preferredLanguage?: string;
    email: string;
    cdcTimestamp: string;
    confirmedFlag: string;
    activeFlag: boolean;
    customerId: number;
  }[];
  customerId: number;
  customerMobileDetails: {
    mobileNumber: string;
    preferredLanguage?: string;
    cdcTimestamp: string;
    activeFlag: boolean;
    customerId: number;
  }[];
  tenantResponse: {
    tenantName: string;
    tenantId: string;
  };
  activeFlag: boolean;
}
export interface GetCustomersInterface {
  customers: CustomerInterface[];
  totalElements: number;
}

export interface GetCustomersResponse
  extends ResponseInterface<GetCustomersInterface> {}
export interface GetCustomerResponse
  extends ResponseInterface<CustomerInterface> {}
export interface CreateCustomerResponse
  extends ResponseInterface<CustomerInterface> {}
export interface UpdateCustomerResponse
  extends ResponseInterface<CustomerInterface> {}
export interface DeleteCustomerResponse extends ResponseInterface<void> {}
export interface CustomerStatusResponse extends ResponseInterface<void> {}
