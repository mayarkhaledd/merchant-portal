import { TFunction } from "i18next";
import { Control, Controller, UseFormWatch } from "react-hook-form";
import { CustomerFilterMenuValues } from "../CustomerFilter.types";
import { Context, useContext, useEffect } from "react";
import { Button } from "eds-react";
import { CustomerManagementContext } from "@ejada/screens/CustomerManagement/CustomerManagementProvider";
import { TCustomerManagementState } from "@ejada/screens/CustomerManagement/CustomerManagement.types";

interface Props {
  control: Control<CustomerFilterMenuValues>;
  watch: UseFormWatch<CustomerFilterMenuValues>;
  t: TFunction<"translation", undefined, "translation">;
  isActive: boolean;
  setIsActive: (value: boolean) => void;
  isInActive: boolean;
  setIsInActive: (value: boolean) => void;
}
export const CustomerStatus = ({
  control,
  watch,
  t,
  isActive,
  setIsActive,
  isInActive,
  setIsInActive,
}: Props) => {
  const status = watch("status");
  const { setIsButtonText } = useContext<TCustomerManagementState>(
    CustomerManagementContext as Context<TCustomerManagementState>,
  );
  useEffect(() => {
    if (!status) {
      setIsActive(false);
      setIsInActive(false);
      setIsButtonText(false);
    }
  }, [status]);

  useEffect(() => {
    switch (status) {
      case "Active":
        setIsActive(true);
        setIsInActive(false);
        //setIsButtonText(true);
        break;
      case "InActive":
        setIsActive(false);
        setIsInActive(true);
        // setIsButtonText(true);
        break;
      default:
        setIsActive(false);
        setIsInActive(false);
        //setIsButtonText(false);
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
            {" "}
            {t("customer.create_customer.first_step.status")}
          </span>
          <div className="flex flex-row gap-3 pt-2">
            <Button
              state="default"
              type="default"
              size="small"
              className={`border-[2px] bg-[#E6E8E8] !border-[#59595C] rounded-full hover:!bg-primary-blue ${isActive ? "bg-primary-blue text-white" : "bg-[#E6E8E8]"}`}
              buttonVariant="secondary"
              onClick={() => {
                field.onChange("Active");
                setIsActive(true);
                setIsInActive(false);
                //setIsButtonText(true);
              }}
              label={t("customer.active")}
            />
            <Button
              state="default"
              type="default"
              size="small"
              className={`hover:!bg-primary-blue  border-[2px]  !border-[#59595C] rounded-full  ${isInActive ? "bg-primary-blue text-white" : "bg-[#E6E8E8]"}`}
              buttonVariant="secondary"
              onClick={() => {
                field.onChange("InActive");
                setIsActive(false);
                setIsInActive(true);
                // setIsButtonText(true);
              }}
              label={t("customer.inActive")}
            />
          </div>
        </>
      )}
    />
  );
};
