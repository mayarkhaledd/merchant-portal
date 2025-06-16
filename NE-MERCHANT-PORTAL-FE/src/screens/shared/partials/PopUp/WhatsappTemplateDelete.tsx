import { Popup } from "./GeneralPopup";
import { t } from "i18next";
import { DeleteWhatsappTemplateProps } from "./PopupIntefaces";

export function WhatsappTemplateDelete({
  onClose,
  deleteConfirmLabel = t("whatsapp.delete") as string,
  id,
  onConfirm,
}: DeleteWhatsappTemplateProps) {
  // const handleConfirm = () => {
  //   // deleteTemplate({ TemplateId });
  //   onClose();
  // };
  return (
    <Popup
      step={2}
      onClose={onClose}
      title={t("whatsapp.delete_template")}
      body={
        <>
          <p className="m-0 font-readexProRegular text-[#334D6E]">
            {t("whatsapp.delete_message_first", {
              templateId: id,
            })}
          </p>
          <div className="mt-2 font-readexProSemiBold600 ">
            {t("whatsapp.delete_message_second")}
          </div>
        </>
      }
      confirmLabel={deleteConfirmLabel}
      onConfirm={onConfirm}
    />
  );
}
