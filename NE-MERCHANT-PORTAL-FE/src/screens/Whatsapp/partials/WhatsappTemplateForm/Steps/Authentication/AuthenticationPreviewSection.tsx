import whatsappBG from "@ejada/common/assets/whatsappBG.png";
import { t } from "i18next";

interface AuthPreviewSectionProps {
  codeHeader: string;
  securitybody: string;
  isExpirySection: boolean;
  isSecuritySection: boolean;
  expiryDuration?: string;
  copyCodeButton: string;
  replaceVariable: (variableValue: string) => string;
}
export const AuthenticationPreviewSection: React.FC<
  AuthPreviewSectionProps
> = ({
  codeHeader,
  securitybody,
  isExpirySection,
  isSecuritySection,
  expiryDuration,
  copyCodeButton,
  replaceVariable,
}) => {
  return (
    <div className="flex items-center justify-center w-2/5">
      {/* Phone Frame */}
      <div className="relative w-[300px] h-[600px] bg-gray-800 rounded-[3rem] shadow-3xl border-4 border-gray-800">
        {/* Phone Speaker */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-16 h-2 bg-gray-800 rounded-full"></div>

        {/* Phone Screen */}
        <div className="absolute top-8 left-2 right-2 bottom-8 bg-white rounded-[2rem] overflow-hidden">
          {/* WhatsApp Background and Content */}
          <div
            className="h-full w-full p-4 overflow-y-auto relative"
            style={{
              background: `url(${whatsappBG}) repeat`,
              backgroundSize: "200px",
              backgroundPosition: "center",
              opacity: 0.7,
            }}
          >
            {/* Message Container */}
            <div className="bg-white rounded-lg shadow-lg p-4 max-w-xs mx-auto mt-4 relative z-10">
              <div className="text-xs text-gray-500 mb-2">
                {new Date().toLocaleString()}
              </div>
              <div className="bg-green-100 p-3 rounded-lg mb-2">
                <strong className="block mb-1">{codeHeader}</strong>
                {isSecuritySection && securitybody && <div>{securitybody}</div>}
              </div>
              {isExpirySection && (
                <div className="text-base text-gray-600 mt-2">
                  {replaceVariable(expiryDuration as string)}
                </div>
              )}
              <div className="mt-2 space-y-2">
                <button
                  className="w-full border border-blue-500 text-blue-500 py-1 rounded flex flex-col items-center"
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                  type="button"
                >
                  <div className="flex items-center gap-2 justify-center w-full px-4">
                    <span className="text-sm">
                      {(copyCodeButton as string) || t("whatsapp.copy_code")}
                    </span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Home Button/Line */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gray-800 rounded-full"></div>
      </div>
    </div>
  );
};
