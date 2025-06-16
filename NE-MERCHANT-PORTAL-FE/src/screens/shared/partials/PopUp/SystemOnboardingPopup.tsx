import { SystemOnboardingPopupProps } from "./PopupIntefaces";
import { Popup } from "./GeneralPopup";
import { Select } from "eds-react";
import { Context, useContext, useState } from "react";
import { SystemOnboardingContext, Tsystemstate } from "@ejada/screens";

export const SystemOnboardingPopup = ({
  onClose,
  sourceSystemOptions,
}: SystemOnboardingPopupProps) => {
  const { setChoice } = useContext<Tsystemstate>(
    SystemOnboardingContext as Context<Tsystemstate>,
  );
  const [select, setSelect] = useState("");
  const handleConfirm = () => {
    onClose();
    setChoice(select);
  };

  const getBody = () => (
    <Select
      label="Please Select Source System to Continue"
      options={sourceSystemOptions ? sourceSystemOptions : []}
      onChange={setSelect}
    />
  );

  return (
    <Popup
      onConfirm={handleConfirm}
      onClose={onClose}
      title="Select Source System"
      step={2}
      body={getBody()}
      confirmLabel="Continue"
    />
  );
};
