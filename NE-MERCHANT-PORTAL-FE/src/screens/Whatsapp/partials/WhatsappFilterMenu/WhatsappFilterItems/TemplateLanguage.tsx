import { TFunction } from "i18next";
import { Control, Controller, UseFormWatch } from "react-hook-form";
import { WhatsappFilterMenuValues } from "@ejada/screens/Whatsapp/partials/WhatsappFilterMenu/WhatsappFilter.types";
import { Context, useContext, useEffect } from "react";
import { Button } from "eds-react";
import { TWhatsappState } from "@ejada/screens/Whatsapp/Whatsapp.types";
import { WhatsappContext } from "@ejada/screens/Whatsapp/WhatsappProvider";

interface Props {
  control: Control<WhatsappFilterMenuValues>;
  watch: UseFormWatch<WhatsappFilterMenuValues>;
  t: TFunction<"translation", undefined, "translation">;
  isEnglish: boolean;
  setIsEnglish: (value: boolean) => void;
  isArabic: boolean;
  setIsArabic: (value: boolean) => void;
}
export const TemplateLanguage = ({
  control,
  watch,
  t,
  isArabic,
  isEnglish,
  setIsArabic,
  setIsEnglish,
}: Props) => {
  const watchedLanguage = watch("languageCode");
  const { setIsButtonText } = useContext<TWhatsappState>(
    WhatsappContext as Context<TWhatsappState>,
  );
  useEffect(() => {
    if (!watchedLanguage) {
      setIsEnglish(false);
      setIsArabic(false);
      setIsButtonText(false);
    }
  }, [watchedLanguage]);

  useEffect(() => {
    switch (watchedLanguage) {
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
  }, [watchedLanguage]);

  return (
    <Controller
      name="languageCode"
      control={control}
      defaultValue={undefined}
      render={({ field }) => (
        <>
          <span className=" pt-6 text-[#404042]">{t("whatsapp.language")}</span>
          <div className="flex flex-row gap-3 pt-2">
            <Button
              state="default"
              type="default"
              size="small"
              className={`border-[2px] bg-[#E6E8E8] !border-[#59595C] rounded-full hover:!bg-primary-blue ${isEnglish ? "bg-primary-blue text-white" : "bg-[#E6E8E8]"}`}
              buttonVariant="secondary"
              onClick={() => {
                field.onChange("English");
                setIsButtonText(true);
                setIsEnglish(true);
                setIsArabic(false);
              }}
              label={t("whatsapp.english")}
            />
            <Button
              state="default"
              type="default"
              size="small"
              className={`hover:!bg-primary-blue  border-[2px]  !border-[#59595C] rounded-full  ${isArabic ? "bg-primary-blue text-white" : "bg-[#E6E8E8]"}`}
              buttonVariant="secondary"
              onClick={() => {
                field.onChange("Arabic");
                setIsButtonText(true);
                setIsEnglish(false);
                setIsArabic(true);
              }}
              label={t("whatsapp.arabic")}
            />
          </div>
        </>
      )}
    />
  );
};
