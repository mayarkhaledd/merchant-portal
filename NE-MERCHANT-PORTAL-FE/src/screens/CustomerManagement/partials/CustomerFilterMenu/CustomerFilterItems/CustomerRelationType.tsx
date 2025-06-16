import { TFunction } from "i18next";
import { Control, Controller, UseFormWatch } from "react-hook-form";
import { CustomerFilterMenuValues } from "../CustomerFilter.types";
import { Context, useContext, useEffect } from "react";
import { Button } from "eds-react";
import { TCustomerManagementState } from "@ejada/screens/CustomerManagement/CustomerManagement.types";
import { CustomerManagementContext } from "@ejada/screens/CustomerManagement/CustomerManagementProvider";

interface Props {
  control: Control<CustomerFilterMenuValues>;
  watch: UseFormWatch<CustomerFilterMenuValues>;
  t: TFunction<"translation", undefined, "translation">;
  isIdentifier: boolean;
  setIsIdentifier: (value: boolean) => void;
  isIqama: boolean;
  setIsIqama: (value: boolean) => void;
  isNin: boolean;
  setIsNin: (value: boolean) => void;
}
export const CustomerRelationType = ({
  control,
  watch,
  t,
  isIdentifier,
  setIsIdentifier,
  isIqama,
  setIsIqama,
  isNin,
  setIsNin,
}: Props) => {
  const relationType = watch("relationType");
  const { setIsButtonText } = useContext<TCustomerManagementState>(
    CustomerManagementContext as Context<TCustomerManagementState>,
  );
  useEffect(() => {
    if (!relationType) {
      setIsIqama(false);
      setIsIdentifier(false);
      setIsNin(false);
      setIsButtonText(false);
    }
  }, [relationType]);

  useEffect(() => {
    switch (relationType) {
      case "IDENTIFIER":
        setIsIdentifier(true);
        setIsIqama(false);
        setIsNin(false);
        break;
      case "IQAMA":
        setIsIdentifier(false);
        setIsIqama(true);
        setIsNin(false);
        break;
      case "NIN":
        setIsIdentifier(false);
        setIsIqama(false);
        setIsNin(true);
        break;
      default:
        setIsIdentifier(false);
        setIsIqama(false);
        setIsNin(false);
        setIsButtonText(false);
        break;
    }
  }, [relationType]);

  return (
    <Controller
      name="relationType"
      control={control}
      defaultValue={undefined}
      render={({ field }) => (
        <>
          <span className=" pt-6 text-[#404042]">
            {t("customer.create_customer.first_step.relation_type")}
          </span>
          <div className="flex flex-row gap-3 pt-2">
            <Button
              state="default"
              type="default"
              size="small"
              className={`border-[2px] bg-[#E6E8E8] !border-[#59595C] rounded-full hover:!bg-primary-blue ${isIdentifier ? "bg-primary-blue text-white" : "bg-[#E6E8E8]"}`}
              buttonVariant="secondary"
              onClick={() => {
                field.onChange("IDENTIFIER");
                setIsIqama(false);
                setIsIdentifier(true);
                setIsNin(false);
                setIsButtonText(true);
              }}
              label={t("customer.IDENTIFIER")}
            />
            <Button
              state="default"
              type="default"
              size="small"
              className={`hover:!bg-primary-blue  border-[2px]  !border-[#59595C] rounded-full  ${isIqama ? "bg-primary-blue text-white" : "bg-[#E6E8E8]"}`}
              buttonVariant="secondary"
              onClick={() => {
                field.onChange("IQAMA");
                setIsIqama(true);
                setIsIdentifier(false);
                setIsNin(false);
                setIsButtonText(true);
              }}
              label={t("customer.IQAMA")}
            />
            <Button
              state="default"
              type="default"
              size="small"
              className={`hover:!bg-primary-blue  border-[2px]  !border-[#59595C] rounded-full  ${isNin ? "bg-primary-blue text-white" : "bg-[#E6E8E8]"}`}
              buttonVariant="secondary"
              onClick={() => {
                field.onChange("NIN");
                setIsIqama(false);
                setIsIdentifier(false);
                setIsNin(true);
                setIsButtonText(true);
              }}
              label={t("customer.NIN")}
            />
          </div>
        </>
      )}
    />
  );
};
