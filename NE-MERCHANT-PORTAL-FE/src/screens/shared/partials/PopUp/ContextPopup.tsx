import { DeactivateCustomerComponent } from "./CustomerDeactivate";
import { DeleteCustomer } from "./CustomerDelete";
import { ReactivateCustomerComponent } from "./CustomerReactivate";
import { DeleteEventGroup } from "./DeleteEventGroup";
import { DeleteSourceSystem } from "./DeleteSourceSystem";
import {
  DeactivateCustomerComponentProps,
  DeleteCustomerProps,
  DeleteEventGroupProps,
  DeleteSourceSystemProps,
  DeleteWhatsappTemplateProps,
  PopupProps,
  ReactivateCustomerComponentProps,
} from "./PopupIntefaces";
import { WhatsappTemplateDelete } from "./WhatsappTemplateDelete";

export const ContextPopup = ({
  option,
  ...props
}: PopupProps & { option: string }) => {
  switch (option) {
    case "deactivateCustomer":
      return (
        <DeactivateCustomerComponent
          {...(props as DeactivateCustomerComponentProps)}
        />
      );
    case "deleteEventGroup":
      return <DeleteEventGroup {...(props as DeleteEventGroupProps)} />;
    case "deleteSourceSystem":
      return <DeleteSourceSystem {...(props as DeleteSourceSystemProps)} />;
    case "deleteCustomer":
      return <DeleteCustomer {...(props as DeleteCustomerProps)} />;
    case "deleteWhatsappTemplate":
      return (
        <WhatsappTemplateDelete {...(props as DeleteWhatsappTemplateProps)} />
      );
    case "reactivateCustomer":
      return (
        <ReactivateCustomerComponent
          {...(props as ReactivateCustomerComponentProps)}
        />
      );
  }
};
