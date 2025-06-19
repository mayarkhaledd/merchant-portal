import { AppRoutes } from "@ejada/navigation";
import { Stepper } from "eds-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function WhatsAppSetupWizard() {
  const [checkboxes, setCheckboxes] = useState([false, false, false, false]);
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();

  const handleCheckboxChange = (index: number) => {
    const updated = [...checkboxes];
    updated[index] = !updated[index];
    setCheckboxes(updated);
  };

  const handleSubmit = async () => {
    window.location.href = `/${AppRoutes.templates}`; // Redirect to templates page
  };

  const validateForm = async () => {
    return checkboxes[currentStep];
  };

  const startSignup = () => {
    const appId = "990049736643186";
    const redirectUri =
      "http://localhost:5173/whatsapp/whatsapp-signup-callback";
    const state = "test_user_123";
    const scope =
      "whatsapp_business_messaging,whatsapp_business_management,business_management";
    const url = `https://www.facebook.com/v19.0/dialog/oauth?client_id=${appId}&redirect_uri=${encodeURIComponent(
      redirectUri,
    )}&state=${state}&scope=${scope}`;

    const popup = window.open(
      url,
      "whatsapp-signup",
      "width=600,height=700,left=100,top=100",
    );

    const handleMessage = (event: MessageEvent) => {
      if (event.data?.source === "whatsapp-signup-callback") {
        const { code, error } = event.data;

        if (code) {
          navigate("/whatsapp/whatsapp-templates", {
            state: {
              whatsappCode: code,
              fromSignup: true,
            },
            replace: true,
          });
        } else {
          console.error("WhatsApp signup error:", error);
        }

        window.removeEventListener("message", handleMessage);
        if (popup) popup.close();
      }
    };

    window.addEventListener("message", handleMessage);
  };

  return (
    <div className=" mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">
        WhatsApp Notification Setup
      </h1>

      <Stepper
        onSubmit={handleSubmit}
        orientation="horizontal"
        progressStepper={true}
        size="medium"
        validateForm={validateForm}
        onStepChange={(step) => setCurrentStep(step)}
        submitAfterStep={5}
        // disableNext={!checkboxes[currentStep]} TODO in EDS
      >
        <Stepper.Step title="Create Facebook Business Manager">
          <p className="mb-4">
            You’ll need a Facebook Business account to use WhatsApp with
            Esharat.
          </p>
          <a
            href="https://business.facebook.com/overview"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Create Business Manager
            </button>
          </a>
          <div className="mt-4">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="form-checkbox mr-2"
                checked={checkboxes[0]}
                onChange={() => handleCheckboxChange(0)}
              />
              I have created my Facebook Business Manager.
            </label>
          </div>
        </Stepper.Step>

        <Stepper.Step title="Verify Facebook Business">
          <p className="mb-4">
            Facebook may require verification documents. Make sure your business
            is verified before proceeding.
          </p>
          <div className="mt-4">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="form-checkbox mr-2"
                checked={checkboxes[1]}
                onChange={() => handleCheckboxChange(1)}
              />
              My business is verified on Facebook.
            </label>
          </div>
        </Stepper.Step>

        <Stepper.Step title="Connect with WhatsApp Meta">
          <p className="mb-4">
            Connect your business account via Meta's embedded signup. This will
            link your WABA ID to Esharat.
          </p>
          <button
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            onClick={startSignup}
          >
            Connect via Meta
          </button>
          <div className="mt-4">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="form-checkbox mr-2"
                checked={checkboxes[2]}
                onChange={() => handleCheckboxChange(2)}
              />
              I have connected my Meta account.
            </label>
          </div>
        </Stepper.Step>

        <Stepper.Step title="Create WhatsApp Templates">
          <p className="mb-4">
            All set! Click Finish to start creating your notification templates.
          </p>
          <div className="mt-4">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="form-checkbox mr-2"
                checked={checkboxes[3]}
                onChange={() => handleCheckboxChange(3)}
              />
              I’m ready to create my WhatsApp templates.
            </label>
          </div>
        </Stepper.Step>
      </Stepper>
    </div>
  );
}
