import React from "react";
import { ReactNode, createContext } from "react";
import { useOtp } from "./useOtp";
import { OTPState } from "./OTP.types";

export const OTPContext = createContext<OTPState | undefined>(undefined);

export const OtpProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const {
    OTP,
    disabled,
    handleOtpChange,
    handleVerifyOtp,
    isVerifyPending,
    verifyError,
    isVerifySuccess,
  } = useOtp();
  return (
    <>
      <OTPContext.Provider
        value={{
          OTP,
          disabled,
          handleOtpChange,
          handleVerifyOtp,
          isVerifyPending,
          verifyError,
          isVerifySuccess,
        }}
      >
        {children}
      </OTPContext.Provider>
    </>
  );
};
