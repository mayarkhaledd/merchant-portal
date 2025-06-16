import CloseIcon from "@ejada/common/assets/close.png";
import { Button } from "eds-react";
import { t } from "i18next";
import { createPortal } from "react-dom";

export interface PopupProps {
  onClose: () => void;
  title: string;
  body: React.ReactNode;
  confirmLabel?: string;
  proceedLabel?: string;
  onConfirm: () => void;
  onProceed?: () => void;
  step?: number;
}

export const Popup = ({
  onClose,
  title,
  body,
  confirmLabel = t("eventsManagement.confirm") as string,
  proceedLabel = t("eventsManagement.proceed") as string,
  onConfirm,
  onProceed,
  step,
}: PopupProps) => {
  return createPortal(
    <>
      <div className="fixed inset-0 bg-black bg-opacity-20 z-[50] flex items-center justify-center">
        <div className="bg-white rounded-[7px] w-[40%] relative z-[51] pointer-events-auto">
          <div className="flex justify-between items-center p-6 text-lg font-readexProMedium500">
            <h2>{title}</h2>
            <button onClick={onClose}>
              <img src={CloseIcon} alt="Close" />
            </button>
          </div>
          <div className="border-t border-b border-gray-300 p-6 text-base self-center">
            {body}
          </div>
          <div className="flex justify-end p-2 mb-4 mt-4 gap-4">
            <Button
              buttonVariant="outlined"
              onClick={onClose}
              type="default"
              size="small"
              className="me-0"
              label={t("eventsManagement.cancel")}
              state="default"
            />

            {step === 1 ? (
              <Button
                onClick={() => onProceed}
                type="default"
                size="small"
                className="me-0"
                label={proceedLabel}
                state="default"
              />
            ) : (
              <Button
                onClick={onConfirm}
                type="default"
                size="small"
                className="me-0"
                label={confirmLabel}
                state="default"
              />
            )}
          </div>
        </div>
      </div>
    </>,
    document.body,
  );
};
