import { Button, NavigationTitle } from "eds-react";
import { useTranslation } from "react-i18next";
import { NavigationBreadcrumb } from "@ejada/screens/shared";
import { FaPlus } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { AppRoutes } from "@ejada/navigation";

export function WhatsappNavigation() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const handleOnClick = () => {
    navigate(AppRoutes.createWhatsappTemplate);
  };
  const location = useLocation();
  const path = location.pathname;

  return (
    <>
      <NavigationBreadcrumb queryLabel={t("navigation.whatsapp") as string} />
      <div className="flex justify-between items-center mb-[32px] mt-7">
        <NavigationTitle title={t("navigation.whatsapp") as string} />

        {!(
          path.startsWith(
            `/${AppRoutes.templates}/${AppRoutes.createWhatsappTemplate}`,
          ) ||
          path.startsWith(
            `/${AppRoutes.templates}/${AppRoutes.editWhatsappTemplate}`,
          ) ||
          path.startsWith(
            `/${AppRoutes.templates}/${AppRoutes.viewWhatsappTemplate}`,
          ) ||
          path.startsWith(`/${AppRoutes.whatsappSignUp}`) ||
          path.startsWith(`/${AppRoutes.whatsappSignupCallback}`)
        ) ? (
          <div className="flex items-center justify-center">
            <Button
              size="large"
              label={t("whatsapp.add_new_template")}
              onClick={handleOnClick}
              type="withIcon"
              icon={<FaPlus />}
              state="default"
            />
          </div>
        ) : null}
      </div>
    </>
  );
}
