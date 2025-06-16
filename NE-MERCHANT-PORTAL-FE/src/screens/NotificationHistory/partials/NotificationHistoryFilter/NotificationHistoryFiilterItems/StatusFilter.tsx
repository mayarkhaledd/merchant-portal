import { Control, Controller, UseFormWatch } from "react-hook-form";
import { Button } from "eds-react";
import { Context, useContext, useEffect } from "react";
import { NotificationHistoryFilterMenuValues } from "../NotificationHistoryFilter.types";
import { t } from "i18next";
import { NotificationHistoryState } from "@ejada/screens/NotificationHistory/NotificationHistory.types";
import { NotificationHistoryContext } from "@ejada/screens/NotificationHistory/NotificationHistoryProvider";
interface Props {
  control: Control<NotificationHistoryFilterMenuValues>;
  watch: UseFormWatch<NotificationHistoryFilterMenuValues>;
  //clearDynamicLabels: boolean;
  isSent: boolean;
  setIsSent: (value: boolean) => void;
  isFailed: boolean;
  setIsFailed: (value: boolean) => void;
}

export const Status = ({
  control,
  watch,
  //clearDynamicLabels,
  setIsSent,
  setIsFailed,
  isFailed,
  isSent,
}: Props) => {
  const messageStatus = watch("messageStatus");
  const { setIsButtonText } = useContext<NotificationHistoryState>(
    NotificationHistoryContext as Context<NotificationHistoryState>,
  );
  useEffect(() => {
    if (!messageStatus) {
      setIsSent(false);
      setIsFailed(false);
      setIsButtonText(false);
    }
  }, [messageStatus]);

  useEffect(() => {
    switch (messageStatus) {
      case "Sent":
        setIsSent(true);
        setIsFailed(false);
        break;
      case "Failed":
        setIsSent(false);
        setIsFailed(true);
        break;
      default:
        setIsSent(false);
        setIsFailed(false);
        setIsButtonText(false);
        break;
    }
  }, [messageStatus]);

  return (
    <Controller
      name="messageStatus"
      control={control}
      defaultValue={undefined}
      render={({ field }) => (
        <>
          <span className=" pt-6 text-[#404042]">
            {t("notificationHistory.status")}
          </span>
          <div className="flex flex-row gap-3 pt-2">
            <Button
              state="default"
              type="default"
              size="small"
              className={`border-[2px] bg-[#E6E8E8] !border-[#59595C] rounded-full hover:!bg-primary-blue ${isSent ? "bg-primary-blue text-white" : "bg-[#E6E8E8]"}`}
              buttonVariant="secondary"
              onClick={() => {
                field.onChange("S");
                setIsSent(true);
                setIsFailed(false);
                setIsButtonText(true);
              }}
              label={t("notificationHistory.sent")}
            />
            <Button
              state="default"
              type="default"
              size="small"
              className={`hover:!bg-primary-blue  border-[2px]  !border-[#59595C] rounded-full  ${isFailed ? "bg-primary-blue text-white" : "bg-[#E6E8E8]"}`}
              buttonVariant="secondary"
              onClick={() => {
                field.onChange("F");
                setIsSent(false);
                setIsFailed(true);
                setIsButtonText(true);
              }}
              label={t("notificationHistory.failed")}
            />
          </div>
        </>
      )}
    />
  );
};
