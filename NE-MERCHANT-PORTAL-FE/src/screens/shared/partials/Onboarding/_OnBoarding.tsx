import EmptyPage from "@ejada/common/assets/EmptyPage.svg";
import { Button } from "eds-react";
import { t } from "i18next";
import React from "react";

interface OnboardingProps {
  onClick: () => void;
  title: string;
  message: string;
  buttonLabel?: string;
  buttonIcon?: React.ReactNode; // Icon for the primary button
  secondaryButtonLabel?: string; // Label for the secondary button
  onSecondaryClick?: () => void; // Click handler for the secondary button
  secondaryButtonIcon?: React.ReactNode; // Icon for the secondary button
}

export const Onboarding: React.FC<OnboardingProps> = ({
  onClick,
  title,
  message,
  buttonLabel,
  buttonIcon,
  secondaryButtonLabel,
  onSecondaryClick,
  secondaryButtonIcon,
}) => {
  return (
    <div className="w-[100%]  flex flex-row items-center justify-between drop-shadow bg-white rounded-[24px] py-[40px] px-[30px] gap-[16px]">
      <div className="flex flex-col justify-start">
        <h1 className="text-3xl text-700   font-readexProBold700 text-primary-blue">
          {title}
        </h1>

        <p className="text-secondary-dark  text-base readexProMedium500  mt-2">
          {message}
        </p>
        <div className="flex">
          {buttonLabel && (
            <div className="mt-4 text-sm">
              <Button
                label={buttonLabel as string}
                type="withIcon"
                size="large"
                state="default"
                icon={buttonIcon}
                onClick={onClick}
              />
            </div>
          )}

          {secondaryButtonLabel && onSecondaryClick && (
            <div className="mt-4 ml-10 text-sm">
              <Button
                label={secondaryButtonLabel}
                type="withIcon"
                size="large"
                state="default"
                icon={secondaryButtonIcon}
                onClick={onSecondaryClick}
              />
            </div>
          )}
        </div>
      </div>

      <img
        src={EmptyPage}
        alt={t("empty_page") as string}
        className="w-auto h-auto mb-[-40px]"
      />
    </div>
  );
};
