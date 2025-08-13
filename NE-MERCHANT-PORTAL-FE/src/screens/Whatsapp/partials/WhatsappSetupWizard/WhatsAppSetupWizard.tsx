import { useState } from "react";
import Cookies from "js-cookie";
import { useWhatsapp } from "../../useWhatsapp";
import { getParamValue } from "../../utils";
import { whatsappConstants } from "../../Whatsapp.constants";
import { OnBoardingThirdStep } from "./onBoardingThirdStep";
import { OnBoardingLoadingStep } from "./OnBoardingLoadingStep";
import { OnBoardingDoneStep } from "./OnBoardingDoneStep";
import { OnBoardingErrorStep } from "./OnBoardingErrorStep";
import { useEffect } from "react";
import {
  ErrorCode,
  getLocalizedErrorMessage,
  useErrorToast,
} from "@ejada/screens/shared";
import { DesktopStepProgress } from "@ejada/common/components/DesktopStepProgress";
import { t } from "i18next";
import i18n from "@ejada/common/locals/i18n";
import { HTTPCookies } from "@ejada/common";

export function WhatsAppSetupWizard() {
  const [currentStep, setCurrentStep] = useState(0); // Start from step 0 (Meta connection)
  const [setupStatus, setSetupStatus] = useState<"success" | "failed" | null>(
    null,
  );

  const localeMap: Record<string, string> = {
    en: whatsappConstants.en_US,
    ar: whatsappConstants.ar_AR,
  };

  const {
    setIsConnected,
    systemParamsData,
    whatsappOnboarding,
    refetchSystemParamsData,
    isWhatsappOnboardingAxiosError,
    isWhatsappOnboardingSuccess,
  } = useWhatsapp();

  useEffect(() => {
    refetchSystemParamsData?.();
  }, []);

  useErrorToast(
    isWhatsappOnboardingAxiosError ? true : false,
    t("whatsapp.something_went_wrong"),
    getLocalizedErrorMessage(
      isWhatsappOnboardingAxiosError as ErrorCode,
      t(isWhatsappOnboardingAxiosError?.message as string),
    ),
  );

  useEffect(() => {
    if (currentStep === 1) {
      // Loading step
      if (isWhatsappOnboardingAxiosError) {
        setSetupStatus("failed");
        setCurrentStep(3); // error step
      } else if (isWhatsappOnboardingSuccess) {
        setSetupStatus("success");
        setCurrentStep(2); // done step
      }
    }
  }, [
    isWhatsappOnboardingAxiosError,
    currentStep,
    isWhatsappOnboardingSuccess,
  ]);

  useEffect(() => {
    const handleSignupMessage = (event: MessageEvent) => {
      const allowedOrigins = [
        "https://www.facebook.com",
        "https://web.facebook.com",
      ];
      if (!allowedOrigins.includes(event.origin)) return;

      try {
        const data = JSON.parse(event.data);

        if (data.type === "WA_EMBEDDED_SIGNUP") {
          if (data.event === "FINISH") {
            // const { phone_number_id, waba_id } = data.data;
            //console.log("Signup completed:", phone_number_id, waba_id);
          } else if (data.event === "CANCEL") {
            const { current_step } = data.data;
            console.warn("User cancelled at step:", current_step);
          } else if (data.event === "ERROR") {
            const { error_message } = data.data;
            console.error("Signup error:", error_message);
          }
        }
      } catch {
        console.log("Received non-JSON message:", event.data);
      }
    };

    window.addEventListener("message", handleSignupMessage);
    return () => window.removeEventListener("message", handleSignupMessage);
  }, []);

  const startSignup = () => {
    const params = systemParamsData?.params || [];
    const appId = getParamValue(params, whatsappConstants.whatsappAppId);
    const redirectUri = getParamValue(
      params,
      whatsappConstants.whatsappRedirectUri,
    );
    const state = getParamValue(params, whatsappConstants.whatsappState);
    const scope = getParamValue(params, whatsappConstants.whatsappScope);
    const config_id = getParamValue(params, whatsappConstants.configId);
    const extras = {
      sessionInfoVersion: "3",
      version: "v3",
    };
    const encodedExtras = encodeURIComponent(JSON.stringify(extras));
    const currentLang = i18n.language;
    const fbLocale = localeMap[currentLang] || whatsappConstants.en_US;

    const url = `https://www.facebook.com/v23.0/dialog/oauth?display=popup&client_id=${appId}&redirect_uri=${encodeURIComponent(
      redirectUri,
    )}&response_type=code&auth_type&config_id=${config_id}&override_default_response_type=true&state=${state}&scope=${scope}&extras=${encodedExtras}&locale=${fbLocale}`;

    window.open(url, "_blank", "width=600,height=700,left=100,top=100");

    const handleCodeMessage = (event: MessageEvent) => {
      if (event.data?.source === whatsappConstants.whatsappSignupCallback) {
        const { code } = event.data;

        if (code) {
          whatsappOnboarding({
            code,
            tenantId: Number(Cookies.get(whatsappConstants.tenantId)),
          });

          setIsConnected(true);
          setCurrentStep(1); // Go to loading step

          setTimeout(() => {}, 4000);
        } else {
          setSetupStatus("failed");
        }

        window.removeEventListener("message", handleCodeMessage);
      }
    };

    window.addEventListener("message", handleCodeMessage);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <OnBoardingThirdStep
            startSignup={startSignup}
            onBack={() => {}} // No back functionality needed since this is the first step
            alreadyOnboarded={
              Cookies.get(HTTPCookies.showWhatsappTemplatesMenu) === "true" ||
              false
            }
          />
        );
      case 1:
        return <OnBoardingLoadingStep />;
      case 2:
        return <OnBoardingDoneStep />;
      case 3:
        return <OnBoardingErrorStep onRetry={() => setCurrentStep(0)} />;
      default:
        return null;
    }
  };

  // Simplified steps array - only 4 steps now
  const allSteps = [
    {
      id: "connect-meta",
      title: t("stepper.connect_meta_title"),
      description: t("stepper.connect_meta_desc"),
      completed: currentStep > 0,
      active: currentStep === 0,
    },
    {
      id: "loading",
      title: t("stepper.loading_title"),
      description: t("stepper.loading_desc"),
      completed: currentStep > 1,
      active: currentStep === 1,
    },
    {
      id: "finish",
      title: t("stepper.finish_title"),
      description:
        currentStep === 2
          ? setupStatus === "success"
            ? t("stepper.finish_desc_success")
            : t("stepper.finish_desc_failed")
          : currentStep === 3
            ? t("stepper.finish_desc_failed")
            : t("stepper.finish_desc_success"),
      completed: currentStep > 2,
      active: currentStep === 2 || currentStep === 3,
    },
  ];

  return (
    <div className="mx-auto p-4">
      <DesktopStepProgress
        steps={allSteps}
        currentStep={currentStep}
        isChecked={true} // Always true since we don't need the account selection logic
      />
      {renderStep()}
    </div>
  );
}
