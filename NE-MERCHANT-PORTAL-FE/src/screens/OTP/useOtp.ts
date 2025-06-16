import { HTTPCookies } from "@ejada/common/constants";
import { useVerifyOtp } from "@ejada/providers";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { AppRoutes } from "@ejada/navigation";
import { useNavigate } from "react-router-dom";
import { getLocalizedErrorMessage, useErrorToast } from "@ejada/screens/shared";
import { useTranslation } from "react-i18next";

export function useOtp() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [errorCode, setErrorCode] = useState<string>("");
  const [OTP, setOTP] = useState<string>("");
  const [disabled, setDisabled] = useState<boolean>(true);

  const {
    mutate,
    isPending: isVerifyPending,
    error: verifyError,
    isError: isVerifyError,
    isSuccess: isVerifySuccess,
    data,
  } = useVerifyOtp();
  //const { updatedData: tenants } = useGetTenants(true);

  useErrorToast(
    isVerifyError,
    t("otp_failure") as string,
    getLocalizedErrorMessage(verifyError, t("otp_failure_message") as string),
  );

  const handleOtpChange = (otpValue: string) => {
    setOTP(otpValue);
    if (otpValue.length === 4) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };
  const handleVerifyOtp = () => {
    const userEmail = (Cookies.get(HTTPCookies.email) as string) ?? "";
    //Cookies.set("tenantId", tenants?.tenants.tenants[0].tenantId as string);
    mutate({
      email: userEmail,
      purpose: "001",
      otp: Number(OTP),
      otpReference: Cookies.get(HTTPCookies.otpReferenece) || "",
    });
  };

  // OTP error handling
  useEffect(() => {
    if (data) {
      if (data.header?.status.code === "I000000" && data.status === 200) {
        setErrorCode("");
        navigate(AppRoutes.dashboard);
      }
      if (data.header?.status.code !== "I000000" && data.status !== 200) {
        setErrorCode(data.status.toString());
      }
    }
  }, [data]);

  const navigateTo = () => {
    if (isVerifySuccess) {
      // Set is otp verified before accessing other pages
      Cookies.set(HTTPCookies.otpVerified, "1");

      const targetRoute = AppRoutes.home;
      Cookies.set(HTTPCookies.otpValidationStatus, "Y");
      return navigate(targetRoute);
    }
    return null;
  };

  return {
    errorCode,
    setErrorCode,
    OTP,
    disabled,
    setDisabled,
    handleOtpChange,
    handleVerifyOtp,
    isVerifyPending,
    verifyError,
    isVerifySuccess,
    navigateTo,
  };
}
