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
  // watch,
}) => {
  return (
    <div
      className=" bg-cover bg-center bg-no-repeat p-6 rounded-lg w-[80%]"
      style={{
        backgroundImage: `url(${whatsappBG})`,
      }}
    >
      <div className="bg-white rounded-lg shadow p-4 max-w-xs mx-auto">
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
            key={""}
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
  );
};
