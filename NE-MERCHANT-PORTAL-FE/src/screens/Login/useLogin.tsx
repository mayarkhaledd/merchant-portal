import { useForm } from "react-hook-form";
import { LoginFormValues } from "./Login.types";
import { useAuth } from "@ejada/providers";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "@ejada/navigation";
import { getLocalizedErrorMessage, useErrorToast } from "@ejada/screens/shared";
import { useTranslation } from "react-i18next";
import Cookies from "js-cookie";
import { HTTPCookies } from "@ejada/common";
import i18n from "@ejada/common/locals/i18n";

export function useLogin() {
  const navigate = useNavigate();
  const { mutate, isPending, error, isSuccess, data, isError } = useAuth();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const languageDropdownRef = useRef<HTMLDivElement>(null);

  const { control, handleSubmit, formState } = useForm<LoginFormValues>({
    mode: "onTouched",
    defaultValues: {
      loginName: "",
      password: "",
    },
  });
  const { t } = useTranslation();

  // Call the login provider with login data
  const onSubmit = (data: LoginFormValues) => {
    mutate({
      loginName: data.loginName,
      password: data.password.trim(),
    });
  };

  // In case of 200 and statusCode ES00040, We need to redirect the user to OTP
  useEffect(() => {
    if (data && isSuccess && Cookies.get(HTTPCookies.token)) {
      navigate(AppRoutes.otp, { replace: true });
    }
  }, [data]);

  useErrorToast(
    isError,
    t("login_failure") as string,
    getLocalizedErrorMessage(error, t("login_failure_message") as string),
  );

  const toggleLanguageDropdown = () => {
    setShowLanguageDropdown((prev) => !prev);
  };
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("userLanguage", lng);
    setShowLanguageDropdown(false);
    setCurrentLanguage(lng);
    window.location.reload();
  };
  // In case of 200 and and statusCode ES00038, We need to display error message to the user
  return {
    onSubmit,
    isPending,
    error,
    isSuccess,
    control,
    handleSubmit,
    formState,
    toggleLanguageDropdown,
    changeLanguage,
    languageDropdownRef,
    showLanguageDropdown,
    currentLanguage,
  };
}
