import { PropsWithChildren } from "react";
import EjadaLogo from "@ejada/common/assets/esharat.svg";
import blueCircle from "@ejada/common/assets/loginPageGraphic.svg";
import circles from "@ejada/common/assets/circlesBackdrop.svg";
import { useTranslation } from "react-i18next";
import i18n from "@ejada/common/locals/i18n";

export const BackdropWithLogo = ({ children }: PropsWithChildren) => {
  const { t } = useTranslation();
  const isRtl = i18n.language === "ar";
  return (
    <div className="flex flex-col items-center justify-start relative h-full min-h-[100vh]">
      {/* Background Circles */}
      <div className="absolute inset-0 z-0">
        <img
          className="w-full h-full object-cover"
          src={circles}
          alt="Backdrop Circles"
        />
      </div>
      <div
        className={`absolute bottom-0  ${isRtl ? "right-0" : "left-0"}  flex justify-start`}
      >
        <div className="relative flex">
          {/* Left: Blue Circle with Content */}
          <div className="relative">
            <img
              src={blueCircle}
              alt="Blue Circle"
              className={`max-w-none h-[80vh] w-[44.5vw] transform ${isRtl ? "scale-x-[-1]" : ""}`}
              style={{ maxWidth: "100%", minWidth: "600px" }}
            />
            <div
              className="absolute inset-0 flex flex-col justify-center space-y-4 w-[517px]"
              style={{
                paddingTop: "100px",
                ...(isRtl ? { paddingRight: "40px" } : { paddingLeft: "40px" }),
              }}
            >
              <img
                className="w-[213.2px] h-auto"
                src={EjadaLogo}
                alt="Ejada Logo"
              />
              <span
                className="block text-white text-5xl font-readexProSemiBold600 w-[517px] pt-4"
                style={{ lineHeight: "60px" }}
              >
                {t("notifications_engine_merchant_portal")}
              </span>
              <span className="block text-white font-readexProSemiBold600 text-lg w-[517px] pt-4">
                {t("description")}
              </span>
            </div>
          </div>
          <div className="relative z-10 flex items-start justify-center ml-10 mt-[-60px]">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
