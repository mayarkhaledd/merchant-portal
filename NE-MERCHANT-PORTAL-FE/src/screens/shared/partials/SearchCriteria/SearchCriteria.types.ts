import { AxiosError } from "axios";
import { TTableColumns } from "eds-react";

export interface SearchCriteriaProps {
  searchContainerStyle: string;
  placeHolder?: string;
  setIsDrawerOpen?: (isOpen: boolean) => void;
  buttonStyle: string;
  currentPageName?: string;

  onSubmit: (state: {
    [key: string]: string | string[] | number | number[] | Date;
  }) => void;
  disableAdvancedSearch?: boolean;
  hideFilter?: boolean;
  exportData: TTableColumns[];
  exportFilteredData?: TTableColumns[];
  fileName: string;
  exportRefetchData?: (() => void) | undefined;
  isRefetchedDataError: boolean;
  isRefetchDataSuccess: boolean;
  errorMessage: AxiosError<unknown, any> | null;
  exportSearchQuery: boolean | Partial<TTableColumns>;
  prefix: string;
  isEnglish: boolean; // Flag for language
}

export interface SearchFormData {
  searchInputField: string;
}
