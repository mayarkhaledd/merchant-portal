import { t } from "i18next";
import { NavigationTitle } from "eds-react";

export const WhatsappSignUp = () => {
  const startSignup = () => {
    const appId = "990049736643186";
    const redirectUri = "http://localhost:4200/whatsapp-signup-callback";
    const state = "random-state-token";
    const scope =
      "whatsapp_business_messaging,whatsapp_business_management,business_management";

    const url = `https://www.facebook.com/v19.0/dialog/oauth?client_id=${appId}&redirect_uri=${encodeURIComponent(
      redirectUri,
    )}&state=${state}&scope=${scope}`;

    window.open(url, "_blank", "width=600,height=700");

    const handleMessage = (event: MessageEvent) => {
      if (event.data?.source === "whatsapp-signup-callback") {
        const { code, error } = event.data;
        if (code) {
          console.log(" Got OAuth code:", code);
          // call backend with code
        } else {
          console.error(" OAuth error:", error);
        }

        window.removeEventListener("message", handleMessage);
      }
    };

    window.addEventListener("message", handleMessage);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-[32px] mt-7">
        <NavigationTitle title={t("navigation.whatsapp") as string} />
      </div>
      <h2 className="text-xl font-semibold mb-4">
        {t("whatsapp.embedded_signup")}
      </h2>
      <button
        onClick={startSignup}
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        {t("whatsapp.start_signup")}
      </button>
    </div>
  );
};
