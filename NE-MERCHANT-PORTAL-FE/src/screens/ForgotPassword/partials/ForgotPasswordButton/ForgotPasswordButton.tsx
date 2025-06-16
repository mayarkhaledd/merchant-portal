import { useTranslation } from "react-i18next";

import { ForgotPasswordProps } from "@ejada/screens/ForgotPassword";
import { NavigationButton, Spinner } from "eds-react";

const ForgotPasswordButton = (props: ForgotPasswordProps) => {
  const { t } = useTranslation();
  const { isValid, loading, onClick } = props;

  return (
    <NavigationButton
      disabled={!isValid || loading}
      color={isValid ? "primary" : "disabled"}
      size="large"
      onClick={onClick}
      className={`${!isValid ? "!bg-[#F7F7F7]" : loading ? "!bg-[#F7F7F7]" : ""}`}
    >
      {loading ? (
        <>
          <Spinner size="w-6 h-6" margin="mx-4" />
          <span>{t("loading_btn")}</span>
        </>
      ) : (
        t("forgot_password")
      )}
    </NavigationButton>
  );
};

export default ForgotPasswordButton;
