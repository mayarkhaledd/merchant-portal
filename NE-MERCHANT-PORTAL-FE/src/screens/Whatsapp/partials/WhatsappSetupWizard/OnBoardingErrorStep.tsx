import { Card, CardContent } from "@ejada/common/components/ui/card";
import { XCircle } from "lucide-react";
import { Button } from "@ejada/common/components/ui/button";
import { t } from "i18next";

export const OnBoardingErrorStep = ({ onRetry }: { onRetry: () => void }) => (
    <Card className="max-w-3xl mx-auto border-2 border-[#fee2e2] bg-[#fef2f2]">
        <CardContent className="p-8 space-y-6 text-center">
            <XCircle className="h-16 w-16 text-[#ef4444] mx-auto" />
            <h2 className="text-2xl font-semibold text-[#ef4444]">{t("onboarding.error_title")}</h2>
            <p className="text-[#991b1b]">
                {t("onboarding.error_desc")}
            </p>
            <Button
                onClick={onRetry}
                className="w-full h-12 bg-[#ef4444] hover:bg-[#991b1b] font-medium"
                style={{ color: "white" }}
            >
                {t("onboarding.retry")}
            </Button>
        </CardContent>
    </Card>
);