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
  isEnglish: boolean;
  setIsEnglish: (value: boolean) => void;
  isArabic: boolean;
  setIsArabic: (value: boolean) => void;
}
export const CustomerPreferredLanguage = ({
  control,
  watch,
  t,
  isArabic,
  isEnglish,
  setIsArabic,
  setIsEnglish,
}: Props) => {
  const preferredLanguage = watch("preferredLanguage");
  const { setIsButtonText } = useContext<TCustomerManagementState>(
    CustomerManagementContext as Context<TCustomerManagementState>,
  );
  useEffect(() => {
    if (!preferredLanguage) {
      setIsEnglish(false);
      setIsArabic(false);
      setIsButtonText(false);
    }
  }, [preferredLanguage]);

  useEffect(() => {
    switch (preferredLanguage) {
      case "English":
        setIsEnglish(true);
        setIsArabic(false);
        break;
      case "Arabic":
        setIsEnglish(false);
        setIsArabic(true);
        break;
      default:
        setIsEnglish(false);
        setIsArabic(false);
        setIsButtonText(false);
        break;
    }
  }, [preferredLanguage]);

  return (
    <Controller
      name="preferredLanguage"
      control={control}
      defaultValue={undefined}
      render={({ field }) => (
        <>
          <span className=" pt-6 text-[#404042]">Preferred Language</span>
          <div className="flex flex-row gap-3 pt-2">
            <Button
              state="default"
              type="default"
              size="small"
              className={`border-[2px] bg-[#E6E8E8] !border-[#59595C] rounded-full hover:!bg-primary-blue ${isEnglish ? "bg-primary-blue text-white" : "bg-[#E6E8E8]"}`}
              buttonVariant="secondary"
              onClick={() => {
                field.onChange("English");
                setIsEnglish(true);
                setIsArabic(false);
                setIsButtonText(true);
              }}
              label={t("customer.english")}
            />
            <Button
              state="default"
              type="default"
              size="small"
              className={`hover:!bg-primary-blue  border-[2px]  !border-[#59595C] rounded-full  ${isArabic ? "bg-primary-blue text-white" : "bg-[#E6E8E8]"}`}
              buttonVariant="secondary"
              onClick={() => {
                field.onChange("Arabic");
                setIsEnglish(false);
                setIsArabic(true);
                setIsButtonText(true);
              }}
              label={t("customer.arabic")}
            />
          </div>
        </>
      )}
    />
  );
};
