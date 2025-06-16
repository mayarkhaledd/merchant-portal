import { useTranslation } from "react-i18next";
import { NavigationButton, Spinner } from "eds-react";
import type { LoginButtonProps } from "./LoginButton.types";

const LoginButton = (props: LoginButtonProps) => {
  const { t } = useTranslation();
  const { isValid, loading, onClick, className } = props;

  return (
    <NavigationButton
      disabled={!isValid || loading}
      type="submit"
      size="large"
      color={isValid ? "primary" : "disabled"}
      onClick={onClick}
      className={`${className && className} flex items-center justify-center  ${!isValid ? "!bg-[#F7F7F7]" : loading ? "!bg-[#F7F7F7]" : ""}`}
    >
      {loading ? (
        <>
          <Spinner size="w-6 h-6" margin="mx-4" />
          <span>{t("loading_btn")}</span>
        </>
      ) : (
        t("login")
      )}
    </NavigationButton>
  );
};

export default LoginButton;
