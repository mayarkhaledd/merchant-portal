import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { BackdropWithLogo } from "@ejada/common/wrappers";
import { ErrorBadge, InputField, TextLink } from "eds-react";
import { SetNewPasswordSchema } from "./SetNewPasswordSchema";
import { useTranslation } from "react-i18next";
import { ColorValues, Sizes, Types } from "@ejada/common/utils";
import { SetNewPasswordButton } from "@ejada/screens/SetNewPassword/components";
import { SetNewPasswordFormValues } from "@ejada/screens/SetNewPassword/SetNewPassword.types";
import { AppRoutes } from "@ejada/navigation";
import { useChangePassword } from "@ejada/providers";
import { Navigate } from "react-router-dom";

export const SetNewPasswordForm = () => {
  const { t } = useTranslation();
  const { mutate, isSuccess, isPending, isError, error } = useChangePassword();

  const { control, handleSubmit, formState } =
    useForm<SetNewPasswordFormValues>({
      mode: "onTouched",
      defaultValues: {
        newPassword: "",
        confirmPassword: "",
      },
      resolver: yupResolver(SetNewPasswordSchema),
    });

  const onSubmit = (data: SetNewPasswordFormValues) => {
    mutate({
      currentPassword: "123492",
      newPassword: data.newPassword,
    });
  };
  return (
    <BackdropWithLogo>
      {isSuccess && <Navigate to={AppRoutes.login} />}
      <div className="flex flex-col items-center justify-center">
        <div>
          <div className="text-primary-blue">
            <span className=" font-readexProSemiBold600 text-5xl">
              {t("welcome")}
            </span>
            <span className="block font-readexProSemiBold600 text-3xl">
              {t("notifications_engine_merchant_portal")}
            </span>
          </div>
          <h3 className="font-readexProSemiBold600 text-lg text-secondary-dark pt-3">
            {t("set_new_password")}
          </h3>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-[20px] pt-12"
          >
            {isError && error && <ErrorBadge error={error} />}
            <Controller
              name="newPassword"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <div className="relative  max-w-xl">
                  <InputField
                    type={Types.PasswordType}
                    placeHolder="Enter Your Password"
                    color={ColorValues.Gray}
                    size={Sizes.Large}
                    formState={formState}
                    style={{ width: "100%" }}
                    label={t("new_password")}
                    isRequired={true}
                    tooltipId="new-password-tooltip"
                    tooltipContent={
                      <ul className="list-disc ps-4 py-2">
                        <li>
                          {
                            "Password must include (uppercase , lowercase , number, special characters)."
                          }
                        </li>
                        <li>
                          {"Password should be 8 minimum character limit."}
                        </li>
                      </ul>
                    }
                    className={`
                      ${formState.errors.newPassword ? "border-error-default" : ""}
                    `}
                    inputError={formState?.errors?.newPassword?.message}
                    {...field}
                  />
                </div>
              )}
            />
            <Controller
              name="confirmPassword"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <div className="relative max-w-xl">
                  <InputField
                    type={Types.PasswordType}
                    placeHolder="Re-type Your Password"
                    color={ColorValues.Gray}
                    size={Sizes.Large}
                    formState={formState}
                    style={{ width: "100%" }}
                    label={t("confirm_password")}
                    isRequired={true}
                    tooltipId="confirm-password-tooltip"
                    tooltipContent={
                      <ul className="list-disc ps-4 py-2">
                        <li>
                          {
                            "Password must include (uppercase , lowercase , number, special characters)."
                          }
                        </li>
                        <li>
                          {"Password should be 8 minimum character limit."}
                        </li>
                      </ul>
                    }
                    className={
                      formState.errors.confirmPassword
                        ? "border-error-default"
                        : ""
                    }
                    inputError={formState?.errors?.confirmPassword?.message}
                    {...field}
                  />
                </div>
              )}
            />
            <SetNewPasswordButton
              isValid={formState.isValid}
              loading={isPending}
            />
          </form>
          <TextLink
            to={AppRoutes.login}
            className="flex justify-center mt-8 text-sm font-readexProMedium500 hover:decoration-primary-blue hover:underline text-primary-blue"
          >
            {t("back_to_login")}
          </TextLink>
        </div>
      </div>
    </BackdropWithLogo>
  );
};
