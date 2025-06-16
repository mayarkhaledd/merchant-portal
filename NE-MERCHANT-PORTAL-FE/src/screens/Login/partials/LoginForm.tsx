import { BackdropWithLogo, Sizes, Types } from "@ejada/common";
import {
  IconAlertCircleFilled,
  IconChevronDown,
  IconWorld,
} from "@tabler/icons-react";
import { colors, InputField } from "eds-react";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useLoginValidationRules } from "../useLoginValidationRules";
import LoginButton from "./LoginButton/LoginButton";
import { useLogin } from "@ejada/screens/Login";

export const LoginForm = () => {
  const { t } = useTranslation();
  const loginSchema = useLoginValidationRules();
  const {
    control,
    handleSubmit,
    formState,
    onSubmit,
    isPending,
    toggleLanguageDropdown,
    changeLanguage,
    languageDropdownRef,
    showLanguageDropdown,
    currentLanguage,
  } = useLogin();

  return (
    <BackdropWithLogo>
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
          <p className="font-readexProSemiBold600 text-lg text-secondary-dark pt-3">
            {t("login_to_continue")}
          </p>
          <div className="max-w-md w-full mt-10 ">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-[20px]"
            >
              <Controller
                name="loginName"
                control={control}
                defaultValue=""
                rules={loginSchema.loginName}
                render={({ field }) => (
                  <div className="relative">
                    <InputField
                      noStar
                      type={Types.TextType}
                      placeHolder={t("login_name") as string}
                      size={Sizes.Large}
                      style={{ width: "100%", color: "#001081" }}
                      label={t("login_name") as string}
                      isRequired={true}
                      {...field}
                    />
                    {formState.errors.loginName && (
                      <span className="text-error-default mt-1 flex text-sm items-center -bottom-3">
                        <IconAlertCircleFilled
                          color={colors.errorDefault}
                          size={16}
                          className="mx-1"
                        />
                        {formState.errors.loginName?.message}
                      </span>
                    )}
                  </div>
                )}
              />
              <Controller
                name="password"
                control={control}
                defaultValue=""
                rules={loginSchema.password}
                render={({ field }) => (
                  <div className="relative">
                    <InputField
                      type={Types.PasswordType}
                      placeHolder={
                        t("password_placeholder", {
                          defaultValue: "Enter Your Password",
                        }) as string
                      }
                      noStar
                      size={Sizes.Large}
                      style={{ width: "100%", color: "#001081" }}
                      label={
                        t("password", { defaultValue: "Password" }) as string
                      }
                      isRequired={true}
                      {...field}
                    />
                    {formState.errors.password && (
                      <span className="text-error-default flex text-sm items-center mt-1 -bottom-3">
                        <IconAlertCircleFilled
                          color={colors.errorDefault}
                          size={16}
                          className="mx-1"
                        />
                        {formState.errors.password.message}
                      </span>
                    )}
                  </div>
                )}
              />
              <LoginButton
                className="mt-[32px]"
                isValid={formState.isValid}
                loading={isPending}
              />
              <div
                className="relative cursor-pointer flex items-center mr-7.5"
                onClick={toggleLanguageDropdown}
                ref={languageDropdownRef}
              >
                <div className="flex items-center text-sm font-semibold text-primary-blue">
                  <IconWorld
                    stroke={2}
                    width={18}
                    height={18}
                    className="mr-1"
                  />{" "}
                  {currentLanguage === "en" ? "English" : "العربية"}
                </div>
                <IconChevronDown stroke={2} width={18} height={18} />
                <div
                  className={`absolute top-9  bg-white shadow-md rounded-md z-50 w-24 ${
                    showLanguageDropdown ? "block" : "hidden"
                  }`}
                >
                  <div
                    className="p-2 cursor-pointer hover:bg-gray-200"
                    onClick={() => {
                      changeLanguage("en");
                    }}
                  >
                    {t("English")}
                  </div>
                  <div
                    className="p-2 cursor-pointer hover:bg-gray-200"
                    onClick={() => {
                      changeLanguage("ar");
                    }}
                  >
                    {t("Arabic")}
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </BackdropWithLogo>
  );
};
