export interface OTPState {
  OTP: string;
  disabled: boolean;
  handleOtpChange: (value: string) => void;
  handleVerifyOtp: () => void;
  isVerifyPending: boolean;
  verifyError: unknown;
  isVerifySuccess: boolean;
}
