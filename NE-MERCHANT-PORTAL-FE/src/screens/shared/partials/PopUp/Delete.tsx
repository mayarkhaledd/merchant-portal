import React from "react";

import { DeleteComponentProps } from "./PopupIntefaces";
import { Popup } from "./GeneralPopup";
import "@ejada/common/sheets/index.css";
import { useTranslation } from "react-i18next";
import { t } from "i18next";
export const DeleteComponent: React.FC<DeleteComponentProps> = ({
  eventCode,
  onClose,
  onConfirm,
  deleteConfirmLabel = t("eventsManagement.delete"),
}) => {
  const { t } = useTranslation();
  const popupBody = (
    <div>
      <p className="mb-2 font-readexProRegular text-black">
        {t("eventsManagement.first_part_delete_message", {
          eventCode: eventCode,
        })}
      </p>
      <p className="mb-2  text-black font-readexProSemiBold600">
        {t("eventsManagement.second_part_delete_message")}
      </p>
    </div>
  );
  return (
    <Popup
      onClose={onClose}
      title={t("eventsManagement.delete_event")}
      body={popupBody}
      confirmLabel={deleteConfirmLabel}
      onConfirm={onConfirm}
    />
  );
};
