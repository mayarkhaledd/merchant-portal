import { GetCustomersPayload } from "@ejada/types/api/customerManagementInterface";
import { Dispatch, SetStateAction } from "react";
//import { Select } from "../../CustomerManagement.types";

export interface CustomerFilterMenuValues {
  title: string;
  email: string;
  mobile: string;
  preferredLanguage: "English" | "Arabic" | undefined;
  relationValue: string;
  relationType: "IDENTIFIER" | "IQAMA" | "NIN" | undefined;
  customerNameEnglish: string;
  customerNameArabic: string;
  status: "Active" | "InActive" | undefined;
}

export interface useCustomerFilterMenuFormProps {
  setSearchQuery: Dispatch<
    SetStateAction<boolean | Partial<GetCustomersPayload>>
  >;
  // setRelationTypeList: Dispatch<SetStateAction<Select[]>>; //if we need to get relationtype codes from API
  //isRelationTypeSuccess: boolean;
  //customersData: GetCustomersInterface | null;
  closeDrawer: () => void;
  activeSearchCriteria: Partial<GetCustomersPayload>;
  setActiveSearchCriteria: Dispatch<
    SetStateAction<Partial<GetCustomersPayload>>
  >;
}
