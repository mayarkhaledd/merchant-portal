import React from "react";
import { DeleteEmailTemplateProps } from "./PopupIntefaces";

import { Popup } from "./GeneralPopup";
import { t } from "i18next";

export const DeleteEmailTemplate: React.FC<DeleteEmailTemplateProps> = ({
  templateName,
  onClose,
  onConfirm,
  deleteConfirmLabel = t("email.delete") as string,
}) => {
  const popupBody = (
    <div>
      <p className="m-0 font-readexProRegular text-black">
        {t("email.delete_message_first_part", {
          name: templateName,
        })}
      </p>
      <div className="mt-2 font-readexProSemiBold600 text-black">
        {t("email.delete_message_confirm")}
      </div>
    </div>
  );

  return (
    <Popup
      onClose={onClose}
      title={t("email.delete_email_template")}
      body={popupBody}
      confirmLabel={deleteConfirmLabel}
      onConfirm={onConfirm}
      step={0}
    />
  );
};
