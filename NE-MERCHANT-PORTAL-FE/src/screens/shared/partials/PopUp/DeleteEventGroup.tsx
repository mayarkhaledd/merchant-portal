import React from "react";
import { DeleteEventGroupProps } from "./PopupIntefaces";

import { Popup } from "./GeneralPopup";
import { t } from "i18next";

export const DeleteEventGroup: React.FC<DeleteEventGroupProps> = ({
  id,
  onClose,
  onConfirm,
  deleteConfirmLabel = t("eventGroupManagement.delete") as string,
}) => {
  const popupBody = (
    <div>
      <p className="m-0 font-readexProRegular text-black">
        {t("eventGroupManagement.delete_message_first_part", {
          id: id,
        })}
      </p>
      <div className="mt-2 font-readexProSemiBold600 text-black">
        {t("eventGroupManagement.delete_message_confirm")}
      </div>
    </div>
  );

  return (
    <Popup
      onClose={onClose}
      title={t("eventGroupManagement.delete_event_group")}
      body={popupBody}
      confirmLabel={deleteConfirmLabel}
      onConfirm={onConfirm}
      step={0}
    />
  );
};
