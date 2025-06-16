import { Popup } from "@ejada/screens/shared/partials/PopUp/GeneralPopup";
import { DatePicker } from "eds-react";
import { useState } from "react";

export interface SnoozingPeriodPopupProps {
  onClose: () => void;
  onConfirm: (startDate: string, endDate: string) => void;
}

export const SnoozingPeriodPopup: React.FC<SnoozingPeriodPopupProps> = ({
  onClose,
  onConfirm,
}) => {
  const [startDate, setStartDateState] = useState<string>("");
  const [endDate, setEndDateState] = useState<string>("");

  const handleConfirm = () => {
    onConfirm(startDate, endDate);
    onClose();
  };

  const popupBody = (
    <div className="p-2 text-base max-h-[70vh] overflow-y-auto">
      <div className="mb-4">
        <DatePicker
          value={startDate ? new Date(startDate) : undefined}
          label="From"
          classes="border-grey"
          onChange={(date) => {
            if (date) {
              const offset = date.getTimezoneOffset() * 60000;
              const adjustedDate = new Date(date.getTime() - offset);
              setStartDateState(adjustedDate.toISOString());
            } else {
              setStartDateState("");
            }
          }}
        />
      </div>
      <div className="mb-4">
        <DatePicker
          value={endDate ? new Date(endDate) : undefined}
          label="To"
          classes="border-grey"
          onChange={(date) => {
            if (date) {
              const offset = date.getTimezoneOffset() * 60000;
              const adjustedDate = new Date(date.getTime() - offset);
              setEndDateState(adjustedDate.toISOString());
            } else {
              setEndDateState("");
            }
          }}
        />
      </div>
    </div>
  );

  return (
    <Popup
      step={2}
      onClose={onClose}
      title="Add Snoozing Period"
      body={popupBody}
      confirmLabel="Confirm"
      onConfirm={handleConfirm}
    />
  );
};
