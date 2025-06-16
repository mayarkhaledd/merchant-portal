import { Popup } from "./GeneralPopup";
import { DeleteCustomerProps } from "./PopupIntefaces";
import { t } from "i18next";

export function DeleteCustomer({
  onClose,
  //customerId,
  relationValue,
  //deleteCustomer,
  onConfirm,
  deleteConfirmLabel = t("customer.delete"),
}: DeleteCustomerProps) {
  // const handleConfirm = () => {
  //   deleteCustomer({ customerId: +customerId });
  //   onClose();
  // };
  return (
    <Popup
      step={2}
      onClose={onClose}
      title={t("customer.delete_customer")}
      body={
        <>
          <p className="m-0 font-readexProRegular text-[#334D6E]">
            {t("customer.delete_message_first", {
              relationValue: relationValue,
            })}
          </p>
          <div className="mt-2 font-readexProSemiBold600 ">
            {t("customer.delete_message_second")}
          </div>
        </>
      }
      confirmLabel={deleteConfirmLabel}
      onConfirm={onConfirm}
    />
  );
}
