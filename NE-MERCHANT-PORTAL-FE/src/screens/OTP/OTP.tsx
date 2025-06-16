import { FormContainer } from "./partials/FormContainer/FormContainer";
import { OtpProvider } from "./OtpProvider";
import { BackdropWithLogo } from "@ejada/common";

export const OTP = () => {
  return (
    <OtpProvider>
      <BackdropWithLogo>
        <FormContainer />
      </BackdropWithLogo>
    </OtpProvider>
  );
};
