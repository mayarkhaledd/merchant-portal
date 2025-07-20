import { useState } from "react";
import Cookies from "js-cookie";
import { AppRoutes } from "@ejada/navigation";
import { useWhatsapp } from "../../useWhatsapp";
import { getParamValue } from "../../utils";
import { whatsappConstants } from "../../Whatsapp.constants";
import { OnBoardingFirstStep } from "./onBoardingFirstStep";
import { OnBoardingSecondStep } from "./onBoardingSecondStep";
import { useWhatsappOnboardingParams } from "@ejada/context/WhatsappOnboardingContext";
import { HTTPCookies } from "@ejada/common";
import { OnBoardingThirdStep } from "./onBoardingThirdStep";
import { OnBoardingLoadingStep } from "./OnBoardingLoadingStep";
import { OnBoardingDoneStep } from "./OnBoardingDoneStep";

export function WhatsAppSetupWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const { setIsConnected, systemParamsData, whatsappOnboarding } =
    useWhatsapp();
  const context = useWhatsappOnboardingParams();
  const refetch = context?.refetch;

  const metaUrl = "https://business.facebook.com/overview";

  const startSignup = () => {
    const params = systemParamsData?.params || [];
    const appId = getParamValue(params, whatsappConstants.whatsappAppId);
    const redirectUri = getParamValue(
      params,
      whatsappConstants.whatsappRedirectUri,
    );
    const state = getParamValue(params, whatsappConstants.whatsappState);
    const scope = getParamValue(params, whatsappConstants.whatsappScope);

    const url = `https://www.facebook.com/v19.0/dialog/oauth?client_id=${appId}&redirect_uri=${encodeURIComponent(
      redirectUri,
    )}&state=${state}&scope=${scope}`;

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
          if (Cookies.get(HTTPCookies.tenantId)) {
            refetch?.();
          }
          setCurrentStep(3); // loading
          setTimeout(() => setCurrentStep(4), 3000); // done after 3s
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
            onHasAccount={() => setCurrentStep(2)}
            onNeedsAccount={() => setCurrentStep(1)}
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
            onBack={() => setCurrentStep(1)}
          />
        );
      case 3:
        return <OnBoardingLoadingStep />;
      case 4:
        return <OnBoardingDoneStep />;
      default:
        return null;
    }
  };

  return (
    <div className="mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">WhatsApp Business Setup</h1>
      {renderStep()}
    </div>
  );
}
