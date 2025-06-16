import { Button } from "eds-react";
//import { useWatch } from "react-hook-form";
import {
  EventsManagementContext,
  EventsManagementFormStepProps,
  TEventsManagementState,
} from "@ejada/screens/EventsManagement";
import { Context, useContext } from "react";
import { ExtraEventChannelForm } from "../AddExtraChannelsForm";
import { t } from "i18next";

export const EventManagementSecondStep: React.FC<
  EventsManagementFormStepProps
> = () => {
  const { addExtraChannelBtn, setAddExtraChannelBtn } = useContext(
    EventsManagementContext as Context<TEventsManagementState>,
  );
  return (
    <>
      {!addExtraChannelBtn && (
        <Button
          size={"medium"}
          label={t("eventsManagement.add_extra_channel")}
          state={`${addExtraChannelBtn ? "disabled" : "default"}`}
          type="default"
          onClick={() => setAddExtraChannelBtn(true)}
        />
      )}
      {addExtraChannelBtn && <ExtraEventChannelForm />}
    </>
  );
};
