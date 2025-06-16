import { Button } from "eds-react";
import { useWhatsappFilterMenuFormProps } from "./WhatsappFilter.types";
import { useWhatsappFilterForm } from "./useWhatsappFilterForm";
import { TemplateName } from "./WhatsappFilterItems/TemplateName";
import { TemplateCategory } from "./WhatsappFilterItems/TemplateCategory";
import { TemplateLanguage } from "./WhatsappFilterItems/TemplateLanguage";
import i18n from "@ejada/common/locals/i18n";

export const WhatsappFilterForm = ({
  closeDrawer,
  setSearchQuery,
  activeSearchCriteria,
  setActiveSearchCriteria,
}: useWhatsappFilterMenuFormProps) => {
  const {
    control,
    handleSubmit,
    formState,
    watch,
    t,
    handleCancel,
    handleClear,
    onSubmit,
    isApplyButtonDisabled,
    isMarketing,
    setIsMarketing,
    isAuthentication,
    setIsAuthentication,
    isUtility,
    setIsUtility,
    isArabic,
    setIsArabic,
    isEnglish,
    setIsEnglish,
  } = useWhatsappFilterForm({
    closeDrawer,
    setSearchQuery,
    activeSearchCriteria,
    setActiveSearchCriteria,
  });
  const isRtl = i18n.language === "ar";
  return (
    <div className="">
      <div className={`absolute ${isRtl ? "left-8" : "right-8"} top-[37.5px] `}>
        <Button
          label={t("whatsapp.filter_menu.clear_all")}
          onClick={handleClear}
          size="large"
          className="text-primary-blue font-readexProMedium500 text-sm -mt-4"
          state="default"
          type="default"
          buttonVariant="link"
        />
      </div>
      <form className="relative  h-full" onSubmit={handleSubmit(onSubmit)}>
        <div className="max-h-[calc(100vh-215px)] overflow-y-auto pe-6">
          <div className="">
            <TemplateName control={control} formState={formState} t={t} />
          </div>
          <div className="pt-2">
            <TemplateLanguage
              control={control}
              watch={watch}
              t={t}
              isArabic={isArabic}
              setIsArabic={setIsArabic}
              isEnglish={isEnglish}
              setIsEnglish={setIsEnglish}
            />
          </div>
          <div className="pt-4 w-full">
            <div className="pt-2">
              <TemplateCategory
                control={control}
                watch={watch}
                t={t}
                isMarketing={isMarketing}
                setIsMarketing={setIsMarketing}
                isUtility={isUtility}
                setIsUtility={setIsUtility}
                isAuthentication={isAuthentication}
                setIsAuthentication={setIsAuthentication}
              />
            </div>
          </div>
        </div>
        <div className="fixed bottom-0 left-0 w-full bg-white p-5 border-t border-divider-color flex justify-between items-center">
          <div></div>
          <div className="flex gap-4">
            <Button
              state="default"
              type="default"
              size="small"
              buttonVariant="outlined"
              onClick={handleCancel}
              label={t("whatsapp.filter_menu.cancel")}
            />
            <Button
              label={t("whatsapp.filter_menu.apply")}
              size="small"
              state={isApplyButtonDisabled ? "disabled" : "default"}
              type="default"
              onClick={handleSubmit(onSubmit)}
            />
          </div>
        </div>
      </form>
    </div>
  );
};
