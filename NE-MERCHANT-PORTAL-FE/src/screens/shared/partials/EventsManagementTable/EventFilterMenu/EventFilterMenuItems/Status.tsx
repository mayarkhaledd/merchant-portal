import { Control, Controller, UseFormWatch } from "react-hook-form";
import { EventFilterMenuValues } from "../EventFilterMenu.types";
import { Button } from "eds-react";
import { useEffect } from "react";
import { TFunction } from "i18next";

interface Props {
  control: Control<EventFilterMenuValues>;
  watch: UseFormWatch<EventFilterMenuValues>;
  t: TFunction<"translation", undefined, "translation">;
  isDisabled: boolean;
  setIsEnabled: (value: boolean) => void;
  isEnabled: boolean;
  setIsDisabled: (value: boolean) => void;
  setIsButtonText: (value: boolean) => void;
}

export const Status = ({
  control,
  watch,
  t,
  isDisabled,
  isEnabled,
  setIsDisabled,
  setIsEnabled,
  setIsButtonText,
}: Props) => {
  const status = watch("status");

  useEffect(() => {
    if (!status) {
      setIsDisabled(false);
      setIsEnabled(false);
      setIsButtonText(false);
    }
  }, [status]);

  useEffect(() => {
    switch (status) {
      case "enabled":
        setIsEnabled(true);
        setIsDisabled(false);
        break;
      case "disabled":
        setIsEnabled(false);
        setIsDisabled(true);
        break;
      default:
        setIsEnabled(false);
        setIsDisabled(false);
        setIsButtonText(false);
        break;
    }
  }, [status]);

  return (
    <Controller
      name="status"
      control={control}
      defaultValue={undefined}
      render={({ field }) => (
        <>
          <span className=" pt-6 text-[#404042]">
            {t("eventsManagement.status")}
          </span>
          <div className="flex flex-row gap-3 pt-2">
            <Button
              state="default"
              type="default"
              size="small"
              className={`border-[2px] bg-[#E6E8E8] !border-[#59595C] rounded-full hover:!bg-primary-blue ${isEnabled ? "bg-primary-blue text-white" : "bg-[#E6E8E8]"}`}
              buttonVariant="secondary"
              onClick={() => {
                field.onChange("enabled");
                setIsEnabled(true);
                setIsDisabled(false);
                setIsButtonText(true);
              }}
              label={t("eventsManagement.filterMenu.enabled")}
            />
            <Button
              state="default"
              type="default"
              size="small"
              className={`hover:!bg-primary-blue  border-[2px]  !border-[#59595C] rounded-full  ${isDisabled ? "bg-primary-blue text-white" : "bg-[#E6E8E8]"}`}
              buttonVariant="secondary"
              onClick={() => {
                field.onChange("disabled");
                setIsEnabled(false);
                setIsDisabled(true);
                setIsButtonText(true);
              }}
              label={t("eventsManagement.filterMenu.disabled")}
            />
          </div>
        </>
      )}
    />
  );
};
