import {
  CustomerStatusPayload,
  DeleteCustomerPayload,
} from "@ejada/types/api/customerManagementInterface";
import { DrawerProps, TTableColumns } from "eds-react";

export interface DeleteComponentProps {
  onClose: () => void;
  onConfirm: () => void;
  event?: string;
  eventCode?: string;
  deleteConfirmLabel: string;
}
export interface DeleteWhatsappTemplateProps {
  onClose: () => void;
  id: string;
  onConfirm: () => void;
  deleteConfirmLabel?: string;
}
export interface DeletePartyComponentProps {
  onClose: () => void;
  partycode: string;
}
export interface DeactivateProductComponentProps {
  onClose: () => void;
  product: string;
  productCode: string;
  productDetails: TTableColumns;
}
export interface ReactivateProductComponentProps {
  onClose: () => void;
  product: string;
  productId: string;
}
export interface DeactivateEventProps {
  onClose: () => void;
  event: string;
  eventId: string;
}
export interface ReactivateEventProps {
  onClose: () => void;
  event: string;
  eventId: string;
}
export interface SystemOnboardingPopupProps {
  onClose: () => void;
  sourceSystemOptions: {
    key: string;
    node: string;
  }[];
}
export interface DeleteEventGroupProps {
  onClose: () => void;
  id: string;
  onConfirm: () => void;
  deleteConfirmLabel?: string;
}
export interface DeleteSourceSystemProps {
  onClose: () => void;
  id: string;
  onConfirm: () => void;
  deleteConfirmLabel?: string;
}
export interface DeleteCustomerProps {
  onClose: () => void;
  customerId: string;
  relationType: string;
  relationValue: string;
  deleteCustomer: (data: DeleteCustomerPayload) => void;
  deleteConfirmLabel: string;
  onConfirm: () => void;
}

export interface DeactivateCustomerComponentProps {
  onClose: () => void;
  relationValue: string;
  relationType: string;
  customerId: string;
  updateStatus: (data: CustomerStatusPayload) => void;
}
export interface ReactivateCustomerComponentProps {
  onClose: () => void;
  relationValue: string;
  relationType: string;
  customerId: string;
  updateStatus: (data: CustomerStatusPayload) => void;
}
export type PopupProps =
  | DeleteComponentProps
  | DrawerProps
  | DeletePartyComponentProps
  | ReactivateProductComponentProps
  | DeactivateProductComponentProps
  | ReactivateEventProps
  | DeactivateEventProps
  | DeleteEventGroupProps
  | DeleteSourceSystemProps
  | ReactivateCustomerComponentProps
  | DeactivateCustomerComponentProps
  | DeleteCustomerProps;
