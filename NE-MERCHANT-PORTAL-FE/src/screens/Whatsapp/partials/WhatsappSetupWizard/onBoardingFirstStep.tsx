import React from "react";
import { WhatsappOnboardingProps } from "../../Whatsapp.types";

export const OnBoardingFirstStep: React.FC<WhatsappOnboardingProps> = ({
  metaSignUpUrl,
  startSignup,
}) => {
  return (
    <>
      <h1 className="text-xl font-semibold mb-4">
        Connect your business account via Meta's embedded signup. This will link
        your WABA ID to Esharat
      </h1>
      <button
        className="px-4 py-2 bg-primary-blue text-white rounded hover:bg-primary-dark"
        onClick={startSignup}
      >
        Connect via Meta
      </button>
      <div className="mt-4">
        <a
          href={metaSignUpUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-black underline hover:text-blue-700"
        >
          Don't have a business account? Create a Business Account
        </a>
      </div>
    </>
  );
};
