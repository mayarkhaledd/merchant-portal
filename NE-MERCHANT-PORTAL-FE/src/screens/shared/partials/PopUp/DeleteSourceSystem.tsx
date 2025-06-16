import React from "react";
import { DeleteSourceSystemProps } from "./PopupIntefaces";

import { Popup } from "./GeneralPopup";
import i18n from "@ejada/common/locals/i18n";
import { t } from "i18next";

export const DeleteSourceSystem: React.FC<DeleteSourceSystemProps> = ({
  id,
  onClose,
  onConfirm,
  deleteConfirmLabel = t("system-onboarding.delete") as string,
}) => {
  const popupBody = (
    <div>
      <p className="m-0 font-readexProRegular text-black">
        {i18n.t("system-onboarding.delete_message", { id })}
      </p>
      <div className="mt-2 font-readexProSemiBold600 text-black">
        {i18n.t("system-onboarding.delete_confirm")}
      </div>
    </div>
  );

  return (
    <Popup
      onClose={onClose}
      title={t("system-onboarding.delete_source_system")}
      body={popupBody}
      confirmLabel={deleteConfirmLabel}
      onConfirm={onConfirm}
      step={0}
    />
  );
};
