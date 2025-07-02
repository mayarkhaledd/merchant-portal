import { TFunction } from "i18next";
import { Control, Controller, UseFormWatch } from "react-hook-form";
import { useEffect } from "react";
import { Button } from "eds-react";
import { WhatsappFilterMenuValues } from "../WhatsappFilter.types";

interface Props {
  control: Control<WhatsappFilterMenuValues>;
  watch: UseFormWatch<WhatsappFilterMenuValues>;
  t: TFunction<"translation", undefined, "translation">;
  isApproved: boolean;
  setIsApproved: (value: boolean) => void;
  isRejected: boolean;
  setIsRejected: (value: boolean) => void;
  isPending: boolean;
  setIsPending: (value: boolean) => void;
}
export const TemplateStatus = ({
  control,
  watch,
  t,
  isApproved,
  setIsApproved,
  isRejected,
  setIsRejected,
  isPending,
  setIsPending,
}: Props) => {
  const statusType = watch("templateStatus");
  useEffect(() => {
    if (!statusType) {
      setIsApproved(false);
      setIsRejected(false);
      setIsPending(false);
    }
  }, [statusType]);

  useEffect(() => {
    switch (statusType) {
      case "Approved":
        setIsApproved(true);
        setIsRejected(false);
        setIsPending(false);
        break;
      case "Rejected":
        setIsApproved(false);
        setIsRejected(true);
        setIsPending(false);
        break;
      case "Pending":
        setIsApproved(false);
        setIsRejected(false);
        setIsPending(true);
        break;
      default:
        setIsApproved(false);
        setIsRejected(false);
        setIsPending(false);
        break;
    }
  }, [statusType]);

  return (
    <Controller
      name="templateStatus"
      control={control}
      defaultValue={undefined}
      render={({ field }) => (
        <>
          <span className=" pt-6 text-[#404042]">{t("whatsapp.status")}</span>
          <div className="flex flex-row gap-3 pt-2">
            <Button
              state="default"
              type="default"
              size="small"
              className={`border-[2px] bg-[#E6E8E8] !border-[#59595C] rounded-full hover:!bg-primary-blue ${isApproved ? "bg-primary-blue text-white" : "bg-[#E6E8E8]"}`}
              buttonVariant="secondary"
              onClick={() => {
                field.onChange("Approved");
                setIsApproved(true);
                setIsRejected(false);
                setIsPending(false);
              }}
              label={t("whatsapp.approved")}
            />
            <Button
              state="default"
              type="default"
              size="small"
              className={`hover:!bg-primary-blue  border-[2px]  !border-[#59595C] rounded-full  ${isRejected ? "bg-primary-blue text-white" : "bg-[#E6E8E8]"}`}
              buttonVariant="secondary"
              onClick={() => {
                field.onChange("Rejected");
                setIsApproved(false);
                setIsRejected(true);
                setIsPending(false);
              }}
              label={t("whatsapp.rejected")}
            />
            <Button
              state="default"
              type="default"
              size="small"
              className={`hover:!bg-primary-blue  border-[2px]  !border-[#59595C] rounded-full  ${isPending ? "bg-primary-blue text-white" : "bg-[#E6E8E8]"}`}
              buttonVariant="secondary"
              onClick={() => {
                field.onChange("Pending");
                setIsApproved(false);
                setIsRejected(false);
                setIsPending(true);
              }}
              label={t("whatsapp.pending")}
            />
          </div>
        </>
      )}
    />
  );
};
