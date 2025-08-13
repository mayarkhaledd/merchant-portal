import React from "react";
import { CheckCircle, Circle, ArrowRight } from "lucide-react";
import { t } from "i18next";
import Cookies from "js-cookie";
import { HTTPCookies } from "@ejada/common";

interface Step {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  active: boolean;
}

interface DesktopStepProgressProps {
  steps: Step[];
  currentStep: number;
  isChecked?: boolean;
}

export function DesktopStepProgress({
  steps,
  isChecked,
  // currentStep,
}: DesktopStepProgressProps) {
  return (
    <div className="bg-[#ffffff] border-b border-[#e2e8f0] mb-4 w-full">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-[#001081] mb-2">
            {t("onboarding.setup_title")}
          </h1>
          <p className="text-[#59595C]">{t("onboarding.headline")}</p>
        </div>

        <div className="relative w-full mx-auto">
          {/* Progress line */}
          <div className="absolute top-6 left-0 right-0 h-0.5 bg-[#e2e8f0] hidden md:block">
            <div
              className="h-full bg-[#001081] transition-all duration-500 ease-in-out"
              style={{ width: `100%` }}
            />
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            {steps.map((step, index) => (
              <div key={step.id} className="relative flex justify-center">
                <div className="flex items-start space-x-4 md:flex-col md:items-center md:space-x-0 md:space-y-4 w-full max-w-xs">
                  {/* Step icon */}
                  <div className="relative z-10 flex-shrink-0 mx-auto">
                    {step.completed ||
                    (Cookies.get(HTTPCookies.showWhatsappTemplatesMenu) ===
                      "true" &&
                      isChecked) ? (
                      <div className="w-12 h-12 bg-[#001081] rounded-full flex items-center justify-center">
                        <CheckCircle className="w-6 h-6 text-white" />
                      </div>
                    ) : step.active ? (
                      <div className="w-12 h-12 bg-[#001081] rounded-full flex items-center justify-center">
                        <div className="w-6 h-6 bg-white rounded-full"></div>
                      </div>
                    ) : (
                      <div className="w-12 h-12 bg-[#e2e8f0] rounded-full flex items-center justify-center">
                        <Circle className="w-6 h-6 text-[#59595C]" />
                      </div>
                    )}
                  </div>

                  {/* Step content */}
                  <div className="flex-1 md:text-center text-center w-full">
                    <h3
                      className={`text-lg font-semibold mb-1 ${
                        step.active || step.completed
                          ? "text-[#001081]"
                          : "text-[#59595C]"
                      }`}
                    >
                      {step.title}
                    </h3>
                    <p
                      className={`text-sm ${
                        step.active || step.completed
                          ? "text-[#001081]"
                          : "text-[#59595C]"
                      }`}
                    >
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Arrow for mobile */}
                {index < steps.length - 1 && (
                  <div className="md:hidden flex justify-center mt-4 w-full">
                    <ArrowRight className="w-5 h-5 text-[#59595C]" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function DesktopStepCard({
  children,
  title,
  description,
}: {
  children: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-[#ffffff] rounded-lg border border-[#e2e8f0] shadow-sm w-full mx-auto">
      <div className="p-6 border-b border-[#e2e8f0]">
        <h2 className="text-xl font-semibold text-[#001081] mb-2 text-center">
          {title}
        </h2>
        <p className="text-[#59595C] text-center">{description}</p>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}
