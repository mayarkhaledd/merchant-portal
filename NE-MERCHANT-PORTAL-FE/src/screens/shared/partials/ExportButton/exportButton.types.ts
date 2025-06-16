import { TTableColumns } from "eds-react";
import { AxiosError } from "axios";

export interface ExportButtonProps {
  data: TTableColumns[]; // The data to export
  fileName: string; // The base filename for the exported files
  isEnglish: boolean; // Flag for language
  refetchData?: (() => void) | undefined;
  isRefetchedDataError: boolean;
  isRefetchDataSuccess: boolean;
  errorMessage: AxiosError<unknown, any> | null;
  exportSearchQuery: boolean | Partial<TTableColumns>;
  prefix: string;
}
