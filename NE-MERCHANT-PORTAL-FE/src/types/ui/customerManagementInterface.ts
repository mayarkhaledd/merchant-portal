export interface CustomerInterface {
  customerId: number;
  relationType: string;
  relationValue: string;
  Status: string;
  title: string;
  language: string;
  firstNameEn: string;
  firstNameAr: string;
  secondNameEn: string;
  secondNameAr: string;
  primaryEmail: string;
  secondaryEmail?: string;
  mobileNumber: string;
  secondaryMobileNumber?: string;
  activeFlag: boolean;
}
