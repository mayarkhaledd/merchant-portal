import { Button, Stepper, Tabs } from "eds-react";
import {
  WhatsappAuthSecondStep,
  WhatsappFirstStep,
  WhatsappMarketingUtilitySecondStep,
} from "./Steps";
import { TWhatsappState, WhatsappFormProps } from "../../Whatsapp.types";
import { useWhatsappTemplateForm } from "./useWhatsappTemplateForm";
import { Context, useContext } from "react";
import { WhatsappContext } from "../../WhatsappProvider";
import { t } from "i18next";
import { colors } from "@ejada/common";
import { AppRoutes } from "@ejada/navigation";
import { useNavigate } from "react-router-dom";
import { usePath } from "@ejada/screens/shared";
import { Loader } from "lucide-react";

export const WhatsappTemplateForm: React.FC<WhatsappFormProps> = ({
  drawerMode,
  initialValues,
}) => {
  const {
    control,
    handleSubmit,
    formState,
    onSubmit,
    trigger,
    watch,
    setValue,
    // register,
    getValues,
    unregister,
  } = useWhatsappTemplateForm(drawerMode, initialValues);

  const {
    whatsappTemplateId,
    templateType,
    whatsappTemplateByIdData,
    isGetWhatsappTemplateByIdLoading,
  } = useContext<TWhatsappState>(WhatsappContext as Context<TWhatsappState>);
  const categoryType = whatsappTemplateByIdData?.category;
  const navigate = useNavigate();
  const path = usePath();
  const watchedTemplateType = watch("categoryButtons");
  const handleStepperSubmit = async () => {
    if (whatsappTemplateId) {
      setValue("templateId", whatsappTemplateId);
    }
    await handleSubmit(onSubmit)();
  };
  const handleCreateSubmit = async () => {
    const isValid = await trigger();
    if (isValid) {
      await handleSubmit(onSubmit)();
    } else {
      console.log("Form validation failed!");
    }
  };
  return drawerMode === "add" ? (
    <form className="flex flex-col h-screen w-full formWrapper">
      <div className="flex-1 w-full">
        <Stepper
          validateForm={trigger}
          onSubmit={handleCreateSubmit}
          drawerClose={() => {
            if (path === AppRoutes.createWhatsappTemplate) {
              navigate(AppRoutes.templates, { replace: true });
            }
          }}
          labelPosition="below"
          orientation="horizontal"
        >
          <Stepper.Step title={t("whatsapp.generalDetails")}>
            <div className="flex flex-col h-full w-full">
              <WhatsappFirstStep
                control={control}
                formState={formState}
                colors={{ errorDefault: colors.errorDefault }}
                initialValues={initialValues}
                drawerMode={drawerMode}
                watch={watch}
                setValue={setValue}
                closeDrawer={() => {}}
              />
            </div>
          </Stepper.Step>
          <Stepper.Step title={t(`whatsapp.${templateType}Template`)}>
            <div className="flex flex-col h-full w-full">
              {watchedTemplateType === "Marketing" && (
                <WhatsappMarketingUtilitySecondStep
                  templateType={templateType}
                  control={control}
                  formState={formState}
                  colors={{ errorDefault: colors.errorDefault }}
                  initialValues={initialValues}
                  drawerMode={drawerMode}
                  watch={watch}
                  setValue={setValue}
                  closeDrawer={() => {}}
                  getValues={getValues}
                />
              )}
              {watchedTemplateType === "Utility" && (
                <WhatsappMarketingUtilitySecondStep
                  templateType={templateType}
                  control={control}
                  formState={formState}
                  colors={{ errorDefault: colors.errorDefault }}
                  initialValues={initialValues}
                  drawerMode={drawerMode}
                  watch={watch}
                  setValue={setValue}
                  closeDrawer={() => {}}
                  getValues={getValues}
                />
              )}
              {watchedTemplateType === "Authentication" && (
                <WhatsappAuthSecondStep
                  control={control}
                  formState={formState}
                  colors={{ errorDefault: colors.errorDefault }}
                  initialValues={initialValues}
                  setValue={setValue}
                  drawerMode={drawerMode}
                  watch={watch}
                  closeDrawer={() => {}}
                />
              )}
            </div>
          </Stepper.Step>
        </Stepper>
      </div>
    </form>
  ) : isGetWhatsappTemplateByIdLoading ? (
    <div className="flex justify-center items-center h-screen">
      <Loader className="animate-spin" />
    </div>
  ) : (
    <form className="flex flex-col h-screen">
      <div className="flex-1">
        <Tabs
          tabs={[
            {
              label: t("whatsapp.Template"),
              value: t("whatsapp.Template"),
              content: (
                <WhatsappFirstStep
                  control={control}
                  formState={formState}
                  colors={{ errorDefault: colors.errorDefault }}
                  initialValues={initialValues}
                  drawerMode={drawerMode}
                  watch={watch}
                  setValue={setValue}
                  closeDrawer={() => {}}
                />
              ),
            },
            ...(categoryType === "MARKETING"
              ? [
                  {
                    label: t("whatsapp.MarketingTemplate"),
                    value: t("whatsapp.MarketingTemplate"),
                    content: (
                      <WhatsappMarketingUtilitySecondStep
                        templateType={templateType}
                        control={control}
                        formState={formState}
                        colors={{ errorDefault: colors.errorDefault }}
                        initialValues={initialValues}
                        drawerMode={drawerMode}
                        watch={watch}
                        setValue={setValue}
                        closeDrawer={() => {}}
                      />
                    ),
                  },
                ]
              : []),
            ...(categoryType === "UTILITY"
              ? [
                  {
                    label: t("whatsapp.UtilityTemplate"),
                    value: t("whatsapp.UtilityTemplate"),
                    content: (
                      <WhatsappMarketingUtilitySecondStep
                        templateType={templateType}
                        control={control}
                        formState={formState}
                        colors={{ errorDefault: colors.errorDefault }}
                        initialValues={initialValues}
                        setValue={setValue}
                        drawerMode={drawerMode}
                        watch={watch}
                        closeDrawer={() => {}}
                        unregister={unregister}
                      />
                    ),
                  },
                ]
              : []),
            ...(categoryType === "AUTHENTICATION"
              ? [
                  {
                    label: t("whatsapp.AuthenticationTemplate"),
                    value: t("whatsapp.AuthenticationTemplate"),
                    content: (
                      <WhatsappAuthSecondStep
                        control={control}
                        formState={formState}
                        colors={{ errorDefault: colors.errorDefault }}
                        initialValues={initialValues}
                        setValue={setValue}
                        drawerMode={drawerMode}
                        watch={watch}
                        closeDrawer={() => {}}
                        unregister={unregister}
                      />
                    ),
                  },
                ]
              : []),
          ]}
        />
      </div>
      <div className="border-b-[0.5px] border-divider-color w-[100%] mt-auto py-4"></div>
      <div className="w-full flex justify-end gap-[20px] p-4">
        <Button
          size="large"
          onClick={() => {
            navigate(AppRoutes.templates);
          }}
          label={t("whatsapp.cancel")}
          type={"default"}
          state={"default"}
          buttonVariant="outlined"
        />
        {drawerMode !== "view" && (
          <Button
            size="large"
            onClick={async () => {
              const isValid = await trigger();
              if (isValid) {
                await handleStepperSubmit();
              }
            }}
            label={t("whatsapp.submit")}
            type={"default"}
            state={"default"}
          />
        )}
      </div>
    </form>
  );
};
