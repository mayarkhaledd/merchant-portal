import { Controller } from "react-hook-form";
import { ColorValues, Sizes, Types } from "@ejada/common/utils";

import { useTranslation } from "react-i18next";
import { Button, InputField, Select } from "eds-react";
import {
  AddSourceSystemProps,
  SystemOnboardingInitialValues,
} from "./AddSourceSystemForm.types";
import { useAddSourceSystemForm } from "./useAddSourceSystemForm";
import { systemValidationRules } from "./ValidationSchema";
type Mode = "create" | "edit";
interface EditSourceSystemProps extends AddSourceSystemProps {
  mode: Mode;
  initialValues?: SystemOnboardingInitialValues;
}
export const AddSourceSystemForm: React.FC<EditSourceSystemProps> = ({
  mode,
  initialValues,
  closeDrawer,
}) => {
  const { t } = useTranslation();

  const { control, handleSubmit, formState, onSubmit } = useAddSourceSystemForm(
    closeDrawer,
    mode,
    initialValues,
  );
  const handleStepperSubmit = async () => {
    await handleSubmit(onSubmit)();
  };
  return (
    <form
      className="pl-[8px] h-full flex flex-col"
      onSubmit={handleSubmit(onSubmit)}
    >
      {mode === "edit" && (
        <>
          <div className="flex gap-[20px] mb-[16px]">
            <div className="w-1/2 ">
              <Controller
                name="sourceSystemId"
                control={control}
                rules={systemValidationRules.sourceSystemId}
                defaultValue={initialValues?.sourceSystemId}
                render={({ field }) => (
                  <div className="relative">
                    <InputField
                      type={Types.TextType}
                      color={ColorValues.Gray}
                      size={Sizes.Medium}
                      style={{ width: "100%" }}
                      label={t("system-onboarding.form.id") as string}
                      isRequired
                      disabled={mode === "edit"}
                      inputError={formState.errors.sourceSystemId?.message}
                      placeHolder={t("system-onboarding.form.id") as string}
                      {...field}
                    />
                  </div>
                )}
              />
            </div>
            <div className="w-1/2">
              <Controller
                name="sourceSystemName"
                control={control}
                rules={systemValidationRules.sourceSystemName}
                defaultValue={initialValues?.sourceSystemName}
                render={({ field }) => (
                  <div className="relative">
                    <InputField
                      type={Types.TextType}
                      color={ColorValues.Gray}
                      size={Sizes.Medium}
                      style={{ width: "100%" }}
                      label={t("system-onboarding.form.name") as string}
                      isRequired
                      {...field}
                      inputError={formState.errors.sourceSystemName?.message}
                      placeHolder={t("system-onboarding.form.name") as string}
                    />
                  </div>
                )}
              />
            </div>
          </div>
          <div className="w-full mb-[16px]">
            <Controller
              name="status"
              control={control}
              rules={systemValidationRules.status}
              defaultValue={initialValues?.status}
              render={({ field }) => (
                <div className="relative">
                  <Select
                    isRequired
                    label={t("system-onboarding.form.status") as string}
                    options={[
                      { key: "A", node: "Active" },
                      { key: "I", node: "Inactive" },
                    ]}
                    value={field.value}
                    onChange={field.onChange}
                    inputError={formState.errors.status?.message}
                    placeholder={t("system-onboarding.form.status") as string}
                  />
                </div>
              )}
            />
          </div>
        </>
      )}
      {mode === "create" && (
        <div className="flex gap-[20px] mb-[16px]">
          <div className="w-1/2">
            <Controller
              name="sourceSystemName"
              control={control}
              rules={systemValidationRules.sourceSystemName}
              defaultValue={initialValues?.sourceSystemName}
              render={({ field }) => (
                <div className="relative">
                  <InputField
                    type={Types.TextType}
                    color={ColorValues.Gray}
                    size={Sizes.Medium}
                    style={{ width: "100%" }}
                    label={t("system-onboarding.form.name") as string}
                    isRequired
                    {...field}
                    inputError={formState.errors.sourceSystemName?.message}
                    placeHolder={t("system-onboarding.form.name") as string}
                  />
                </div>
              )}
            />
          </div>
          <div className="w-1/2 ">
            <Controller
              name="status"
              control={control}
              rules={systemValidationRules.status}
              defaultValue={initialValues?.status}
              render={({ field }) => (
                <div className="relative">
                  <Select
                    isRequired
                    label={t("system-onboarding.form.status") as string}
                    options={[
                      { key: "A", node: "Active" },
                      { key: "I", node: "Inactive" },
                    ]}
                    value={field.value}
                    onChange={field.onChange}
                    inputError={formState.errors.status?.message}
                    placeholder={t("system-onboarding.form.status") as string}
                  />
                </div>
              )}
            />
          </div>
        </div>
      )}
      <div className="border-b-[0.5px] border-divider-color w-[100%] mt-auto py-4"></div>
      <div className=" w-full flex justify-end gap-[20px] p-4 ">
        <Button
          size="large"
          className="mt-1"
          onClick={(e) => {
            e.preventDefault();
            closeDrawer();
          }}
          label={t("cancel")}
          type="default"
          buttonVariant="outlined"
          state="default"
        />
        <Button
          size="large"
          className="mt-1"
          onClick={(e) => {
            e.preventDefault();
            handleStepperSubmit();
          }}
          label={t("Submit")}
          type="default"
          state="default"
        />
      </div>
    </form>
  );
};
