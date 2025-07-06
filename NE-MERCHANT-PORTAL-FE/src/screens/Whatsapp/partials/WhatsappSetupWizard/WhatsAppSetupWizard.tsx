import { AppRoutes } from "@ejada/navigation";
import { Stepper } from "eds-react";
import { useEffect } from "react";
import { useWhatsapp } from "../../useWhatsapp";
import { getParamValue } from "../../utils";
import { whatsappConstants } from "../../Whatsapp.constants";
import Cookies from "js-cookie";
import { OnBoardingFirstStep } from "./onBoardingFirstStep";
import { OnBoardingSecondStep } from "./onBoardingSecondStep";

export function WhatsAppSetupWizard() {
  const { refetchSystemParamsData, systemParamsData, whatsappOnboarding } =
    useWhatsapp();
  const metaUrl = "https://business.facebook.com/overview";

  useEffect(() => {
    refetchSystemParamsData?.();
  }, []);

  const validateForm = async () => {
    return true;
  };
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
        const { code, error } = event.data;

        if (code) {
          whatsappOnboarding({
            code,
            tenantId: Number(Cookies.get(whatsappConstants.tenantId)),
          });
        } else {
          console.error("WhatsApp signup error:", error);
        }

        window.removeEventListener("message", handleMessage);
      }
    };

    window.addEventListener("message", handleMessage);
  };

  return (
    <div className=" mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-start">
        WhatsApp Notification Setup
      </h1>
      <Stepper
        validateForm={validateForm}
        onSubmit={async () => {
          window.location.href = `/${AppRoutes.templates}`; // Redirect to templates page
        }}
        orientation="horizontal"
        size="medium"
      >
        <Stepper.Step title="Connect with Meta">
          <OnBoardingFirstStep
            metaSignUpUrl={metaUrl}
            startSignup={startSignup}
          ></OnBoardingFirstStep>
        </Stepper.Step>

        <Stepper.Step title="Done">
          <OnBoardingSecondStep allDoneFlag={true}></OnBoardingSecondStep>
        </Stepper.Step>
      </Stepper>
    </div>
  );
}
