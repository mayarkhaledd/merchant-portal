import { TFunction } from "i18next";
import { Control, Controller, UseFormWatch } from "react-hook-form";
import { Context, useContext, useEffect } from "react";
import { Button } from "eds-react";
import { EventGroupFilterMenuValues } from "../EventGroupFilter.types";
import { TEventGroupManagementState } from "@ejada/screens/EventGroupManagement/EventGroupManagement.types";
import { EventGroupManagementContext } from "@ejada/screens/EventGroupManagement/EventGroupManagementProvider";

interface Props {
  control: Control<EventGroupFilterMenuValues>;
  watch: UseFormWatch<EventGroupFilterMenuValues>;
  t: TFunction<"translation", undefined, "translation">;
  isMarketing: boolean;
  setIsMarketing: (value: boolean) => void;
  isEshaar: boolean;
  setIsEshaar: (value: boolean) => void;
  isTouchId: boolean;
  setIsTouchId: (value: boolean) => void;
}
export const EventGroupType = ({
  control,
  watch,
  t,
  isMarketing,
  setIsMarketing,
  isEshaar,
  setIsEshaar,
  isTouchId,
  setIsTouchId,
}: Props) => {
  const eventGroupType = watch("eventGroupType");
  const { setIsButtonText } = useContext<TEventGroupManagementState>(
    EventGroupManagementContext as Context<TEventGroupManagementState>,
  );
  useEffect(() => {
    if (!eventGroupType) {
      setIsMarketing(false);
      setIsEshaar(false);
      setIsTouchId(false);
      setIsButtonText(false);
    }
  }, [eventGroupType]);

  useEffect(() => {
    switch (eventGroupType) {
      case "MARKETING":
        setIsMarketing(true);
        setIsEshaar(false);
        setIsTouchId(false);
        //setIsButtonText(true);
        break;
      case "ESHAAR":
        setIsMarketing(false);
        setIsEshaar(true);
        setIsTouchId(false);
        //setIsButtonText(true);
        break;
      case "TOUCHID":
        setIsMarketing(false);
        setIsEshaar(false);
        setIsTouchId(true);
        //setIsButtonText(true);
        break;
      default:
        setIsMarketing(false);
        setIsEshaar(false);
        setIsTouchId(false);
        //setIsButtonText(false);
        break;
    }
  }, [eventGroupType]);

  return (
    <Controller
      name="eventGroupType"
      control={control}
      defaultValue={undefined}
      render={({ field }) => (
        <>
          <span className=" pt-6 text-[#404042]">
            {t("eventGroupManagement.event_group_type")}
          </span>
          <div className="flex flex-row gap-3 pt-2">
            <Button
              state="default"
              type="default"
              size="small"
              className={`border-[2px] bg-[#E6E8E8] !border-[#59595C] rounded-full hover:!bg-primary-blue ${isEshaar ? "bg-primary-blue text-white" : "bg-[#E6E8E8]"}`}
              buttonVariant="secondary"
              onClick={() => {
                field.onChange("ESHAAR");
                setIsMarketing(false);
                setIsEshaar(true);
                setIsTouchId(false);
                //setIsButtonText(true);
              }}
              label={t("eventGroupManagement.ESHAAR")}
            />
            <Button
              state="default"
              type="default"
              size="small"
              className={`hover:!bg-primary-blue  border-[2px]  !border-[#59595C] rounded-full  ${isMarketing ? "bg-primary-blue text-white" : "bg-[#E6E8E8]"}`}
              buttonVariant="secondary"
              onClick={() => {
                field.onChange("MARKETING");
                setIsMarketing(true);
                setIsEshaar(false);
                setIsTouchId(false);
                //setIsButtonText(true);
              }}
              label={t("eventGroupManagement.MARKETING")}
            />
            <Button
              state="default"
              type="default"
              size="small"
              className={`hover:!bg-primary-blue  border-[2px]  !border-[#59595C] rounded-full  ${isTouchId ? "bg-primary-blue text-white" : "bg-[#E6E8E8]"}`}
              buttonVariant="secondary"
              onClick={() => {
                field.onChange("TOUCHID");
                setIsMarketing(false);
                setIsEshaar(false);
                setIsTouchId(true);
                //setIsButtonText(true);
              }}
              label={t("eventGroupManagement.TOUCHID")}
            />
          </div>
        </>
      )}
    />
  );
};
