import {
  CreateTemplatePayload,
  DeleteWhatsappTemplatePayload,
  GetWhatsappTemplatesInterface,
  GetWhatsappTemplatesPayload,
  UpdateTemplatePayload,
  WhatsappTemplate,
} from "@ejada/types/api/whatsappInterface";
import { SelectSearchList } from "../CustomerManagement";
import { TTableColumns } from "eds-react";
import { AxiosError } from "axios";
import { Dispatch, SetStateAction } from "react";
import {
  WhatsappFormValues,
  WhatsappInitialValues,
} from "./partials/WhatsappTemplateForm";
import {
  Control,
  FieldErrors,
  UseFormGetValues,
  UseFormRegister,
  UseFormReturn,
  UseFormSetValue,
  UseFormUnregister,
} from "react-hook-form";

export interface TWhatsappState {
  currentPage: number;
  setCurrentPage: (state: number) => void;
  itemsPerPage: number;
  setItemsPerPage: (state: number) => void;
  totalListSize: number;
  setTotalListSize: (state: number) => void;
  isWhatsappFilterMenuOpen: boolean;
  setIsWhatsappFilterMenuOpen: (value: boolean) => void;
  whatsappTemplateId: string;
  setWhatsappTemplateId: (value: string) => void;
  setIsDeletePopUpOpen: (value: boolean) => void;
  isDeletePopUpOpen: boolean;
  deleteWhatsappTemplateById: (data: DeleteWhatsappTemplatePayload) => void;
  createWhatsappTemplate: (data: CreateTemplatePayload) => void;
  updateWhatsappTemplate: (data: UpdateTemplatePayload) => void;
  isDeleteWhatsappTemplateByIdSuccess: boolean;
  isDeleteWhatsappTemplateByIdError: boolean;
  isDeleteWhatsappTemplateByIdAxiosError: AxiosError<unknown, unknown> | null;
  isCreateWhatsappTemplateSuccess: boolean;
  isCreateWhatsappTemplateError: boolean;
  isCreateWhatsappTemplateAxiosError: AxiosError<unknown, unknown> | null;
  isUpdateWhatsappTemplateSuccess: boolean;
  isUpdateWhatsappTemplateError: boolean;
  isUpdateWhatsappTemplateAxiosError: AxiosError<unknown, unknown> | null;
  whatsappTemplateByIdData: WhatsappTemplate | null;
  isEnglish: boolean;
  setIsEnglish: (value: boolean) => void;
  isButtonText: boolean;
  setIsButtonText: (value: boolean) => void;
  whatsappTemplatesList: SelectSearchList[];
  setWhatsappTemplatesList: (value: SelectSearchList[]) => void;
  searchQuery: boolean | Partial<GetWhatsappTemplatesPayload>;
  setSearchQuery: (
    value: boolean | Partial<GetWhatsappTemplatesPayload>,
  ) => void;
  whatsappTemplatesManegementData: TTableColumns[];
  setWhatsappTemplatesManegementData: (value: TTableColumns[]) => void;
  allWhatsappTemplatesData: GetWhatsappTemplatesInterface | null;
  whatsappTemplatesData: GetWhatsappTemplatesInterface | null;
  refetchAllWhatsappTemplatesData: (() => void) | undefined;
  refetchWhatsappTemplates: (() => void) | undefined;
  isRefetchedDataError: boolean;
  isRefetchDataSuccess: boolean;
  errorMessage: AxiosError<unknown, any> | null;
  isWhatsappTemplatesSuccess: boolean;
  isWhatsappTemplatesError: boolean;
  activeSearchCriteria: Partial<GetWhatsappTemplatesPayload>;
  setActiveSearchCriteria: Dispatch<
    SetStateAction<Partial<GetWhatsappTemplatesPayload>>
  >;
  templateType: string;
  setTemplateType: (value: string) => void;
  isGetWhatsappTemplatesLoading: boolean;
  isGetWhatsappTemplateByIdLoading: boolean;
}

export interface WhatsappFormProps {
  closeDrawer?: () => void;
  drawerMode?: "add" | "edit" | "view";
  templateId?: number | null | string;
  initialValues?: WhatsappInitialValues;
  control?: Control<WhatsappFormValues>;
  formState?: {
    errors: FieldErrors<WhatsappFormValues>;
  };
  colors?: {
    errorDefault: string;
  };
  watch?: UseFormReturn<WhatsappFormValues>["watch"];
  unregister?: UseFormUnregister<WhatsappFormValues>;
  register?: UseFormRegister<WhatsappFormValues>;
  setValue?: UseFormSetValue<WhatsappFormValues>;
  getValues?: UseFormGetValues<WhatsappFormValues>;
  templateType?: string;
}
export type ExtendedWhatsappFormProps = WhatsappFormProps & {
  setValue: UseFormSetValue<WhatsappFormValues>;
};
