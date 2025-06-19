import { useEffect } from "react";
import { t } from "i18next";

export const WhatsappSignupCallback = () => {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    const state = params.get("state");
    const error = params.get("error");

    if (window.opener) {
      window.opener.postMessage(
        {
          source: "whatsapp-signup-callback",
          code,
          state,
          error,
        },
        "*",
      );
      window.close();
    }
  }, []);

  return <div>{t("whatsapp.signup_processing")}</div>;
};
