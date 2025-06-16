import { Button } from "eds-react";
import { CustomerStatus } from "./CustomerFilterItems/CustomerStatus";
import { CustomerRelationType } from "./CustomerFilterItems/CustomerRelationType";
import { CustomerRelationValue } from "./CustomerFilterItems/CustomerRelationValue";
import { CustomerNameEnglish } from "./CustomerFilterItems/CustomerNameEnglish";
import { CustomerNameArabic } from "./CustomerFilterItems/CustomerNameArabic";
import { CustomerEmail } from "./CustomerFilterItems/CustomerEmail";
import { CustomerMobile } from "./CustomerFilterItems/CustomerMobile";
import { CustomerPreferredLanguage } from "./CustomerFilterItems/CustomerPreferredLanguage";

import { useCustomerFilterMenuFormProps } from "./CustomerFilter.types";
import { useCustomerFilterForm } from "./useCustomerFilterForm";
import i18n from "@ejada/common/locals/i18n";

export const CustomerFilterMenuForm = ({
  closeDrawer,
  setSearchQuery,
  activeSearchCriteria,
  setActiveSearchCriteria,
}: useCustomerFilterMenuFormProps) => {
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
    isIqama,
    setIsIqama,
    isIdentifier,
    setIsIdentifier,
    isNin,
    setIsNin,
    isEnglish,
    setIsEnglish,
    isArabic,
    setIsArabic,
    isActive,
    setIsActive,
    isInActive,
    setIsInActive,
  } = useCustomerFilterForm({
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
          label={t("customer.filterMenu.clear_all")}
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
          <div className="pt-2">
            <CustomerRelationType
              control={control}
              watch={watch}
              t={t}
              isIdentifier={isIdentifier}
              setIsIdentifier={setIsIdentifier}
              isIqama={isIqama}
              setIsIqama={setIsIqama}
              isNin={isNin}
              setIsNin={setIsNin}
            />
          </div>
          <div className="">
            <CustomerRelationValue
              control={control}
              formState={formState}
              t={t}
              //relationValueRule={relationValueValidationRule}
            />
          </div>
          <div className="pt-2">
            <CustomerStatus
              control={control}
              watch={watch}
              t={t}
              isActive={isActive}
              setIsActive={setIsActive}
              isInActive={isInActive}
              setIsInActive={setIsInActive}
            />
            <div className="">
              <CustomerNameEnglish
                control={control}
                formState={formState}
                t={t}
              />
            </div>
            <div className="">
              <CustomerNameArabic
                control={control}
                formState={formState}
                t={t}
                //nameArabicRule={nameArabicRule}
              />
            </div>
            <div className="pt-2">
              <CustomerPreferredLanguage
                control={control}
                watch={watch}
                t={t}
                isEnglish={isEnglish}
                setIsEnglish={setIsEnglish}
                isArabic={isArabic}
                setIsArabic={setIsArabic}
              />
            </div>
            <div className="">
              <CustomerEmail
                control={control}
                formState={formState}
                t={t}
                //emailRule={customerEmailRule}
              />
            </div>
            <div className="">
              <CustomerMobile
                control={control}
                formState={formState}
                t={t}
                //mobileRule={customerMobileRule}
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
              label={t("customer.filterMenu.cancel")}
            />
            <Button
              label={t("customer.filterMenu.apply")}
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
