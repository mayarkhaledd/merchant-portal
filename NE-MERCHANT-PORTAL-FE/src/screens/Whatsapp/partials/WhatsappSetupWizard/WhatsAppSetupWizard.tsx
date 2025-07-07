import { AppRoutes } from "@ejada/navigation";
import { Stepper } from "eds-react";
import { useEffect, useRef } from "react";
import { useWhatsapp } from "../../useWhatsapp";
import { getParamValue } from "../../utils";
import { whatsappConstants } from "../../Whatsapp.constants";
import Cookies from "js-cookie";
import { OnBoardingFirstStep } from "./onBoardingFirstStep";
import { OnBoardingSecondStep } from "./onBoardingSecondStep";
import i18n from "@ejada/common/locals/i18n";
import { Notification } from "eds-react";
import { toast } from "react-toastify";

export function WhatsAppSetupWizard() {
  const { isConnected, setIsConnected } = useWhatsapp();
  const { refetchSystemParamsData, systemParamsData, whatsappOnboarding } =
    useWhatsapp();
  const metaUrl = "https://business.facebook.com/overview";
  const stepperRef = useRef<HTMLDivElement>(null);
  const hasAutoAdvanced = useRef(false); // Prevent multiple auto-advances

  useEffect(() => {
    refetchSystemParamsData?.();
  }, []);

  useEffect(() => {
    if (isConnected && !hasAutoAdvanced.current) {
      hasAutoAdvanced.current = true;
      
      
      const timer = setTimeout(() => {
        const findAndClickNextButton = () => {
          const buttons = stepperRef.current?.querySelectorAll('button');
          if (buttons) {
            for (const button of buttons) {
              const buttonText = button.textContent?.toLowerCase();
              if (buttonText?.includes('next') || buttonText?.includes('التالي')) {
                button.click();
                return true;
              }
            }
          }
        };
        
      
        const success = findAndClickNextButton();
        
        if (!success) {
          console.warn('Could not find Next button for auto-advance');
        }
      }, 1500); 

      return () => clearTimeout(timer);
    }
  }, [isConnected]);

  const validateForm = async () => {
    if (!isConnected) {
      toast.dark(
        <Notification
          title={i18n.t("whatsapp.something_went_wrong") as string}
          body={i18n.t("whatsapp.please_connect_via_meta_first") as string}
          option="fail"
        />,
        {
          position: toast.POSITION.TOP_RIGHT,
        }
      );
      return false; 
    }
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
          setIsConnected(true);
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
      <div ref={stepperRef}>
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
            />
          </Stepper.Step>

          <Stepper.Step title="Done">
            <OnBoardingSecondStep allDoneFlag={true} />
          </Stepper.Step>
        </Stepper>
      </div>
    </div>
  );
}