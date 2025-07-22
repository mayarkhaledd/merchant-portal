import { Card, CardContent } from "@ejada/common/components/ui/card";
import { CheckCircle } from "lucide-react";
import { Button } from "@ejada/common/components/ui/button";
import { AppRoutes } from "@ejada/navigation";
import { useNavigate } from "react-router-dom";
import { t } from "i18next";

export const OnBoardingDoneStep = () => {
  const navigate = useNavigate();
  return (
    <Card className="max-w-3xl mx-auto border-2 border-[#e2e8f0] bg-[#f0fdf4]">
      <CardContent className="p-8 space-y-6 text-center">
        <CheckCircle className="h-16 w-16 text-[#22c55e] mx-auto" />
        <h2 className="text-2xl font-semibold text-[#22c55e]">
          {t("onboarding.done_title")}
        </h2>
        <p className="text-[#166534]">{t("onboarding.done_desc")}</p>
        <Button
          onClick={() => {
            localStorage.setItem("showWhatsappTemplatesMenu", "true");
            navigate(`/${AppRoutes.templates}`, { replace: true });
            window.location.reload();
          }}
          className="w-full h-12 bg-[#001081] hover:bg-[#000d5e] font-medium"
          style={{ color: "white" }}
        >
          {t("onboarding.create_templates")}
        </Button>
      </CardContent>
    </Card>
  );
};
