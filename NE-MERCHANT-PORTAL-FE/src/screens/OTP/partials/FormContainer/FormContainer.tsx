import { Button } from "eds-react";
import OtpInput from "react-otp-input";
import styles from "@ejada/screens/OTP/otp.module.css";
import { useTranslation } from "react-i18next";
import { useOtp } from "@ejada/screens/OTP";

export const FormContainer = () => {
  const { t } = useTranslation();
  const {
    errorCode,
    disabled,
    handleOtpChange,
    handleVerifyOtp,
    OTP,
    navigateTo,
  } = useOtp();

  return (
    <div>
      {navigateTo() || null}
      <div>
        <p className="text-primary-blue font-readexProBold600 font-semibold text-[48px] leading-[60px] tracking-[-0.02em]">
          {t("welcome")}
        </p>
        <p className="text-primary-blue font-readexProBold700 mb-[3.5%] font-bold  text-[28px] leading-[35px] tracking-[-0.02em]">
          {t("notifications_engine_merchant_portal")}
        </p>
        <p className="text-secondary-dark font-readexProBold600 font-semibold leading-[22.5px] text-[18px]">
          {t("verify_your_account")}
        </p>
      </div>
      <form className="flex flex-col">
        {errorCode !== "" && (
          <span className="p-4 w-[80%] mt-4 d-block bg-error-bg rounded">
            {t(errorCode)}
          </span>
        )}
        <div dir="ltr" style={{ width: "100%" }}>
          <OtpInput
            value={OTP}
            onChange={handleOtpChange}
            inputType="number"
            renderInput={(props) => (
              <input
                {...props}
                className="shadow font-readexProBold600 font-semibold leading-[32.5px] text-[26px] tracking-[-0.02em]"
              />
            )}
            shouldAutoFocus
            numInputs={4}
            inputStyle={{
              marginTop: "50px",
              border: "1.5px solid",
              borderRadius: "7px",
              width: "64px",
              height: "64px",
              margin: "5px",
              textAlign: "center",
              appearance: "none",
              WebkitAppearance: "none",
              borderColor: "#D1D4D4",
              color: "#001081",
            }}
            skipDefaultStyles={false}
            containerStyle={{ justifyContent: "center" }}
          />
        </div>
        <span
          className={`${styles.otp_timer} text-center text-md font-readexProSemiBold600`}
        ></span>

        <div className="flex  mt-4">
          <Button
            className="w-[442px] "
            size="medium"
            label="Verify"
            onClick={handleVerifyOtp}
            type="default"
            state={disabled ? "disabled" : "default"}
          />
        </div>
      </form>
    </div>
  );
};
