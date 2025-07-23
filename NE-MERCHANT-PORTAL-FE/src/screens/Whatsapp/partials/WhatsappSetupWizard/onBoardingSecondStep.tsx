import { useState } from "react";
import { Button } from "@ejada/common/components/ui/button";
import { DesktopStepCard } from "@ejada/common/components/DesktopStepProgress";
import { ExternalLink, FileText } from "lucide-react";
import { Tooltip } from "react-tooltip";
import { t } from "i18next";
import { whatsappConstants } from "../../Whatsapp.constants";

export const OnBoardingSecondStep: React.FC<{
  onNext: () => void;
  onBack: () => void;
}> = ({ onNext, onBack }) => {
  const [accountCreated, setAccountCreated] = useState(false);

  const metaUrl = whatsappConstants.metaUrl;
  const pdfUrl = whatsappConstants.pdfUrl;

  const handleOpenMeta = () => {
    window.open(metaUrl, "_blank", "width=600,height=700,left=100,top=100");
  };

  const handleOpenInstructions = () => {
    window.open(pdfUrl, "_blank");
  };

  return (
    <DesktopStepCard
      title={t("onboarding.create_fb_account_title")}
      description={t("onboarding.create_fb_account_desc")}
    >
      <div className="space-y-8">
        <div className="flex items-center justify-end mb-4 gap-2">
          <Button
            variant="outline"
            onClick={handleOpenInstructions}
            id="meta-instructions-tooltip-trigger"
            className="border-2 border-[#001081] text-[#001081] hover:bg-[#001081] hover:text-white font-medium flex items-center gap-2"
            data-tooltip-content={t("onboarding.download_instructions_tooltip")}
            data-tooltip-id="meta-instructions-tooltip"
          >
            <FileText className="w-5 h-5 mr-2" />
            {t("onboarding.view_instructions")}
          </Button>
          <Tooltip
            id="meta-instructions-tooltip"
            place="right"
          />
        </div>

        <div className="flex flex-col items-center gap-4">
          <Button
            variant="default"
            onClick={handleOpenMeta}
            className="bg-[#001081] hover:bg-[#000d5e] text-white font-medium flex items-center gap-2 px-8 py-3"
          >
            <ExternalLink className="w-5 h-5 mr-2" />
            {t("onboarding.create_new_fb_account")}
          </Button>
          <p className="text-[#59595C] text-center max-w-3xl" style={{ marginTop: "25px" }}>
            {t("onboarding.create_account_instruction")}
          </p>
        </div>

        <div className="flex items-start justify-start gap-2 mt-4 ml-4"
          style={{ marginLeft: "142px", marginTop: "16px", marginBottom: "80px" }}>
          <input
            type="checkbox"
            id="accountCreated"
            checked={accountCreated}
            onChange={e => setAccountCreated(e.target.checked)}
            className="w-4 h-4 accent-[#001081]"
            style={{ marginTop: "2px" }}
          />
          <label htmlFor="accountCreated" className="text-[#001081] font-small cursor-pointer" style={{ fontSize: "smaller" }}>
            {t("onboarding.checkbox_label")}
          </label>
        </div>

        <div className="flex justify-between w-full mx-auto mt-8">
          <Button
            variant="outline"
            onClick={onBack}
            className="border-2 border-[#001081] text-[#001081] hover:bg-[#001081] hover:text-white font-medium px-8"
          >
            {t("onboarding.back")}
          </Button>
          <Button
            onClick={onNext}
            disabled={!accountCreated}
            className="bg-[#001081] hover:bg-[#000d5e] font-medium px-8"
            style={{ color: "white" }}
          >
            {t("onboarding.continue")}
          </Button>
        </div>
      </div>
    </DesktopStepCard>
  );
};
