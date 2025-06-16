import { TFunction } from "i18next";
import { Control, Controller, UseFormWatch } from "react-hook-form";
import { Context, useContext, useEffect } from "react";
import { Button } from "eds-react";
import { WhatsappFilterMenuValues } from "../WhatsappFilter.types";
import { TWhatsappState } from "@ejada/screens/Whatsapp/Whatsapp.types";
import { WhatsappContext } from "@ejada/screens/Whatsapp/WhatsappProvider";

interface Props {
  control: Control<WhatsappFilterMenuValues>;
  watch: UseFormWatch<WhatsappFilterMenuValues>;
  t: TFunction<"translation", undefined, "translation">;
  isMarketing: boolean;
  setIsMarketing: (value: boolean) => void;
  isUtility: boolean;
  setIsUtility: (value: boolean) => void;
  isAuthentication: boolean;
  setIsAuthentication: (value: boolean) => void;
}
export const TemplateCategory = ({
  control,
  watch,
  t,
  isMarketing,
  setIsMarketing,
  isUtility,
  setIsUtility,
  isAuthentication,
  setIsAuthentication,
}: Props) => {
  const { setIsButtonText } = useContext<TWhatsappState>(
    WhatsappContext as Context<TWhatsappState>,
  );
  const categoryType = watch("category");
  useEffect(() => {
    if (!categoryType) {
      setIsMarketing(false);
      setIsUtility(false);
      setIsAuthentication(false);
      setIsButtonText(false);
    }
  }, [categoryType]);

  useEffect(() => {
    switch (categoryType) {
      case "Marketing":
        setIsMarketing(true);
        setIsUtility(false);
        setIsAuthentication(false);
        break;
      case "Utility":
        setIsMarketing(false);
        setIsUtility(true);
        setIsAuthentication(false);
        break;
      case "Authentication":
        setIsMarketing(false);
        setIsUtility(false);
        setIsAuthentication(true);
        break;
      default:
        setIsMarketing(false);
        setIsUtility(false);
        setIsAuthentication(false);
        setIsButtonText(false);
        break;
    }
  }, [categoryType]);

  return (
    <Controller
      name="category"
      control={control}
      defaultValue={undefined}
      render={({ field }) => (
        <>
          <span className=" pt-6 text-[#404042]">{t("whatsapp.category")}</span>
          <div className="flex flex-row gap-3 pt-2">
            <Button
              state="default"
              type="default"
              size="small"
              className={`border-[2px] bg-[#E6E8E8] !border-[#59595C] rounded-full hover:!bg-primary-blue ${isUtility ? "bg-primary-blue text-white" : "bg-[#E6E8E8]"}`}
              buttonVariant="secondary"
              onClick={() => {
                field.onChange("Utility");
                setIsButtonText(true);
                setIsMarketing(false);
                setIsUtility(true);
                setIsAuthentication(false);
              }}
              label={t("whatsapp.utility")}
            />
            <Button
              state="default"
              type="default"
              size="small"
              className={`hover:!bg-primary-blue  border-[2px]  !border-[#59595C] rounded-full  ${isMarketing ? "bg-primary-blue text-white" : "bg-[#E6E8E8]"}`}
              buttonVariant="secondary"
              onClick={() => {
                field.onChange("Marketing");
                setIsButtonText(true);
                setIsMarketing(true);
                setIsUtility(false);
                setIsAuthentication(false);
              }}
              label={t("whatsapp.marketing")}
            />
            <Button
              state="default"
              type="default"
              size="small"
              className={`hover:!bg-primary-blue  border-[2px]  !border-[#59595C] rounded-full  ${isAuthentication ? "bg-primary-blue text-white" : "bg-[#E6E8E8]"}`}
              buttonVariant="secondary"
              onClick={() => {
                field.onChange("Authentication");
                setIsMarketing(false);
                setIsButtonText(true);
                setIsUtility(false);
                setIsAuthentication(true);
              }}
              label={t("whatsapp.authentication")}
            />
          </div>
        </>
      )}
    />
  );
};
