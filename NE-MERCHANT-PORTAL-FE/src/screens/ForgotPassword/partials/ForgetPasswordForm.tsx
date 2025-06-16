import { useForm, Controller } from "react-hook-form";

import { useTranslation } from "react-i18next";
import { Sizes, Types } from "@ejada/common/utils";
import ForgotPasswordButton from "@ejada/screens/ForgotPassword/partials/ForgotPasswordButton/ForgotPasswordButton";
import { IconAlertCircleFilled } from "@tabler/icons-react";
import { BackdropWithLogo, colors } from "@ejada/common";

import { ForgotPasswordFormValues } from "@ejada/screens/ForgotPassword/ForgotPassword.types";
import { AppRoutes } from "@ejada/navigation";

import { Navigate } from "react-router-dom";
import { ErrorBadge, InputField, TextLink } from "eds-react";
import { useForgotPasswordValidation } from "./useForgotPasswordValidation";
import { useForgotPassword } from "@ejada/providers";

export const ForgotPasswordForm = () => {
  const { t } = useTranslation();
  const forgetPassValidation = useForgotPasswordValidation();

  const { control, handleSubmit, formState } =
    useForm<ForgotPasswordFormValues>({
      mode: "onTouched",
      defaultValues: {
        passResetMethod: "email",
        passResetMethodvalue: "",
      },
    });

  const { mutate, isPending, isError, error, isSuccess } = useForgotPassword();

  function onSubmit(data: ForgotPasswordFormValues) {
    mutate(data);
  }

  return (
    <BackdropWithLogo>
      {isSuccess && (
        <Navigate to={AppRoutes.otp} state={{ location: location.pathname }} />
      )}
      <div className="flex flex-col items-center justify-center">
        <h3 className=" font-readexProBold700 text-2xl text-primary-blue mb-4">
          {t("forgot_password")}
        </h3>
        <p className=" font-readexProSemiBold600 text-secondary-dark text-lg">
          {t("email_instruction")}
        </p>
        <div className="max-w-md w-full">
          {isError && error && <ErrorBadge error={error} />}

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-[50px]"
          >
            <Controller
              name="passResetMethodvalue"
              control={control}
              defaultValue=""
              rules={forgetPassValidation.passResetMethodvalue}
              render={({ field }) => (
                <InputField
                  type={Types.TextType}
                  style={{ color: "#001081" }}
                  size={Sizes.Large}
                  //control={control}
                  hidden={true}
                  {...field}
                />
              )}
            />
            <Controller
              name="passResetMethodvalue"
              control={control}
              defaultValue=""
              rules={forgetPassValidation.passResetMethodvalue}
              render={({ field }) => (
                <div className="relative">
                  <InputField
                    type={Types.EmailType}
                    placeHolder="Enter Your Email"
                    size={Sizes.Large}
                    //control={control}
                    style={{ width: "100%", color: "#001081" }}
                    label={t("Email")}
                    isRequired={true}
                    className={`
                    ${formState.errors.passResetMethodvalue ? "border-error-default" : ""}
                  `}
                    {...field}
                  />
                  {formState.errors.passResetMethodvalue && (
                    <span className="text-error-default mt-1 flex text-sm items-center -bottom-3">
                      <IconAlertCircleFilled
                        color={colors.errorDefault}
                        size={16}
                        className="mx-1"
                      />
                      {formState.errors.passResetMethodvalue.message}
                    </span>
                  )}
                </div>
              )}
            />
            {
              <ForgotPasswordButton
                loading={isPending}
                isValid={formState.isValid}
              />
            }
          </form>
          <TextLink
            to={AppRoutes.login}
            className="flex justify-center mt-10 text-sm font-readexProMedium500 hover:decoration-primary-blue hover:underline text-primary-blue"
          >
            {t("back_to_login")}
          </TextLink>
        </div>
      </div>
    </BackdropWithLogo>
  );
};
