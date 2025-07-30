import { useState } from "react";
import Cookies from "js-cookie";
import { useWhatsapp } from "../../useWhatsapp";
import { getParamValue } from "../../utils";
import { whatsappConstants } from "../../Whatsapp.constants";
import { OnBoardingFirstStep } from "./onBoardingFirstStep";
import { OnBoardingSecondStep } from "./onBoardingSecondStep";
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
import { WhatsappStepperSteps } from "./WhatsappStepperSteps";
import { t } from "i18next";
import i18n from "@ejada/common/locals/i18n";
import { HTTPCookies } from "@ejada/common";

export function WhatsAppSetupWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [hasExistingAccount, setHasExistingAccount] = useState<boolean | null>(
    null,
  );
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
    if (currentStep === 3) {
      if (isWhatsappOnboardingAxiosError) {
        setSetupStatus("failed");
        setCurrentStep(5); // error
      } else {
        setSetupStatus("success");
        setCurrentStep(4); // done
      }
    }
  }, [isWhatsappOnboardingAxiosError, currentStep]);

  const startSignup = () => {
    const params = systemParamsData?.params || [];
    const appId = getParamValue(params, whatsappConstants.whatsappAppId);
    const redirectUri = getParamValue(
      params,
      whatsappConstants.whatsappRedirectUri,
    );

    const state = getParamValue(params, whatsappConstants.whatsappState);
    const scope = getParamValue(params, whatsappConstants.whatsappScope);

    // Get current language and map it to Facebook locale
    const currentLang = i18n.language;

    const fbLocale = localeMap[currentLang] || whatsappConstants.en_US;

    const url = `https://www.facebook.com/v19.0/dialog/oauth?client_id=${appId}&redirect_uri=${encodeURIComponent(
      redirectUri,
    )}&state=${state}&scope=${scope}&locale=${fbLocale}`;
    window.open(url, "_blank", "width=600,height=700,left=100,top=100");

    const handleMessage = (event: MessageEvent) => {
      if (event.data?.source === whatsappConstants.whatsappSignupCallback) {
        const { code } = event.data;

        if (code) {
          whatsappOnboarding({
            code,
            tenantId: Number(Cookies.get(whatsappConstants.tenantId)),
          });

          setIsConnected(true);
          setCurrentStep(3);

          // setTimeout(() => {
          //   if (currentStep === 3) {
          //     // Still in loading state (no error occurred)
          //     setSetupStatus("success");
          //     setCurrentStep(4);
          //   }
          // }, 3000);
        } else {
          setSetupStatus("failed");
        }

        window.removeEventListener("message", handleMessage);
      }
    };

    window.addEventListener("message", handleMessage);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <OnBoardingFirstStep
            onHasAccount={() => {
              setHasExistingAccount(true);
              setCurrentStep(2);
            }}
            onNeedsAccount={() => {
              setHasExistingAccount(false);
              setCurrentStep(1);
            }}
            alreadyOnboarded={
              Cookies.get(HTTPCookies.showWhatsappTemplatesMenu) === "true" ||
              false
            }
          />
        );
      case 1:
        return (
          <OnBoardingSecondStep
            onNext={() => setCurrentStep(2)}
            onBack={() => setCurrentStep(0)}
          />
        );
      case 2:
        return (
          <OnBoardingThirdStep
            startSignup={startSignup}
            onBack={() => setCurrentStep(hasExistingAccount ? 0 : 1)}
          />
        );
      case 3:
        return <OnBoardingLoadingStep />;
      case 4:
        return <OnBoardingDoneStep />;
      case 5:
        return <OnBoardingErrorStep onRetry={() => setCurrentStep(2)} />;
      default:
        return null;
    }
  };

  const allSteps = WhatsappStepperSteps(
    currentStep,
    hasExistingAccount,
    setupStatus,
  );
  // Do NOT filter out hidden steps
  return (
    <div className="mx-auto p-4">
      <DesktopStepProgress steps={allSteps} currentStep={currentStep} />
      {renderStep()}
    </div>
  );
}
