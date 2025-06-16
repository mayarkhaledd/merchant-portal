import { Popup } from "./GeneralPopup";
import { DeactivateCustomerComponentProps } from "./PopupIntefaces";
import { t } from "i18next";

export function ReactivateCustomerComponent({
  onClose,
  relationValue,
  customerId,
  updateStatus,
}: DeactivateCustomerComponentProps) {
  const handleConfirm = () => {
    updateStatus({ customerId, activeFlag: true });
    onClose();
  };

  return (
    <Popup
      step={2}
      onClose={onClose}
      title={t("customer.reactivate_customer")}
      body={
        <>
          <p className="m-0 font-readexProRegular text-[#334D6E]">
            {t("customer.reactivate_message_first", {
              relationValue: relationValue,
            })}
          </p>
          <div className="mt-2 font-readexProSemiBold600 ">
            {t("customer.reactivate_message_second")}
          </div>
        </>
      }
      onConfirm={handleConfirm}
    />
  );
}
