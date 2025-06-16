import { Popup } from "./GeneralPopup";
import { DeactivateCustomerComponentProps } from "./PopupIntefaces";
import { t } from "i18next";

export function DeactivateCustomerComponent({
  onClose,
  relationValue,
  customerId,
  updateStatus,
}: DeactivateCustomerComponentProps) {
  const handleConfirm = () => {
    updateStatus({ customerId, activeFlag: false });
    onClose();
  };

  return (
    <Popup
      step={2}
      onClose={onClose}
      title={t("customer.deactivate_customer")}
      body={
        <>
          <p className="m-0 font-readexProRegular text-[#334D6E]">
            {t("customer.deactivate_message_first", {
              relationValue: relationValue,
            })}
          </p>
          <div className="mt-2 font-readexProSemiBold600 ">
            {t("customer.deactivate_message_second")}
          </div>
        </>
      }
      onConfirm={handleConfirm}
    />
  );
}
