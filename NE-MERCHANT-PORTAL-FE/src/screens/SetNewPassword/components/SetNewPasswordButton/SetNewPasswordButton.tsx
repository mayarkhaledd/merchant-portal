import { useTranslation } from "react-i18next";
import { NavigationButton, Spinner } from "eds-react";
import type { SetNewPasswordButtonProps } from "./SetNewButton.types";

export const SetNewPasswordButton = (props: SetNewPasswordButtonProps) => {
  const { t } = useTranslation();
  const { isValid, loading, onClick } = props;

  return (
    <NavigationButton
      disabled={!isValid || loading}
      color={isValid ? "primary" : "disabled"}
      size="large"
      onClick={onClick}
      className="flex items-center justify-center mt-10"
    >
      {loading && <Spinner size="w-6 h-6" margin="mx-4" />}
      {t("confirm_password")}
    </NavigationButton>
  );
};
